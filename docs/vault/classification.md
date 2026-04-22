# vault/classification

algoritmo de auto-categorização. multi-signal scoring com regras declarativas.

## objetivo

dado um arquivo recém enviado, atribuir uma categoria entre as do catálogo sistema, com score de confiança no intervalo [0, 1]. se abaixo do threshold, cai em `outros`.

## propriedades desejadas

1. **determinístico** — mesma entrada = mesma saída.
2. **rápido** — < 50 ms por arquivo no mvp (sem ocr).
3. **auditável** — guardar signals que justificaram a escolha.
4. **extensível** — adicionar categoria = editar um dicionário.
5. **sem dependência externa** — roda 100% no processo node.

## signals

cada signal produz um voto ponderado por categoria:

```
signal = { category_slug: string, weight: number, source: string }
```

fontes (mvp):

| fonte           | peso | observação                                   |
|-----------------|------|----------------------------------------------|
| filename_regex  | 3    | match no nome original (case/accent-insensitive) |
| filename_dict   | 2    | termo do dicionário aparece no nome          |
| extension_hint  | 1    | extensão sugere categoria (`.dcm` → saude)   |
| mime_hint       | 1    | mime sugere (`image/dicom` → saude)          |
| size_hint       | 0.5  | tamanho típico (pdf > 200kb → documento)     |

fontes (fase 2, com ocr):

| fonte           | peso | observação                                   |
|-----------------|------|----------------------------------------------|
| content_regex   | 4    | regex em texto extraído                      |
| content_dict    | 3    | termo do dicionário no conteúdo              |
| entity_ner      | 2    | named-entity (cnpj, cpf, placa carro)        |

## agregação

```
para cada categoria c:
  scores[c] = soma(signal.weight para signal em signals se signal.category = c)

total = soma(todos os pesos emitidos)
vencedor = argmax(scores)
confidence = scores[vencedor] / total
```

se `total == 0` → nenhuma categoria detectou → `outros` com `confidence = 0`.
se `confidence < THRESHOLD` (0.6) → `outros` com confidence real retornado para audit.

## dicionários base

normalização antes do match:
- lowercase
- remover acentos (nfd + regex)
- substituir `_` e `-` por espaço
- colapsar whitespace

```ts
const dict = {
  juridico: {
    regex: [
      /\b(contrato|procuracao|procuração|testamento|diretiva|escritura|certidao|certidão)\b/i,
      /\b(rg|cpf|cnh|passaporte)\b/i,
      /\bdoc(umento)?\s*pessoal\b/i,
    ],
    terms: ['advogado', 'cartorio', 'tabelionato', 'oab', 'notarial'],
  },
  saude: {
    regex: [
      /\b(exame|laudo|receita|prescricao|prescrição|atestado|prontuario|prontuário)\b/i,
      /\b(medicamento|remedio|remédio|consulta|medico|médico)\b/i,
    ],
    terms: ['hemograma', 'ressonancia', 'tomografia', 'ultrassom', 'raio[\\s-]?x', 'ecg', 'eletrocardiograma'],
  },
  financeiro: {
    regex: [
      /\b(fatura|boleto|extrato|imposto|irpf|darf|ir\d{2,4}|nota\s*fiscal|nf-?e?)\b/i,
      /\b(recibo|comprovante|pagamento|transferencia|transferência|pix)\b/i,
    ],
    terms: ['banco', 'banco do brasil', 'caixa', 'itau', 'itaú', 'bradesco', 'santander', 'nubank'],
  },
  trabalho: {
    regex: [
      /\b(holerite|contracheque|folha\s*de\s*pagamento|admissao|admissão|demissao|demissão)\b/i,
      /\b(ctps|pis|fgts|inss|rescisao|rescisão)\b/i,
      /\bcontrato\s*de\s*trabalho\b/i,
    ],
    terms: ['rh', 'recursos humanos', 'empregador'],
  },
  viagem: {
    regex: [
      /\b(passagem|reserva|voucher|itinerario|itinerário|hotel|hospedagem|voo)\b/i,
      /\b(passaporte|visto|embarque|checkin|check-in)\b/i,
    ],
    terms: ['latam', 'gol', 'azul', 'booking', 'airbnb', 'decolar'],
  },
  imoveis: {
    regex: [
      /\b(iptu|condominio|condomínio|escritura|financiamento|imovel|imóvel)\b/i,
      /\b(aluguel|locacao|locação|inventario|inventário|usufruto)\b/i,
    ],
    terms: ['cartorio de imoveis', 'matricula', 'cri'],
  },
  pessoal: {
    regex: [],
    terms: [],
  },
}
```

## signals de extensão/mime

```ts
const extHints: Record<string, string[]> = {
  saude:      ['dcm', 'dicom'],
  financeiro: ['ofx', 'qif'],
  // imagens genéricas: sem hint por extensão — fica pra conteúdo
}

const mimeHints: Record<string, string[]> = {
  saude:      ['application/dicom', 'image/dicom'],
  financeiro: ['application/vnd.ms-excel', 'application/x-ofx'],
}
```

## thresholds

```ts
export const CLASSIFIER_CONFIG = {
  confidenceThreshold: 0.6,
  weights: {
    filename_regex: 3,
    filename_dict: 2,
    extension_hint: 1,
    mime_hint: 1,
    size_hint: 0.5,
    content_regex: 4,
    content_dict: 3,
    user_rule: 10,
  },
}
```

## override do usuário

quando o usuário muda a categoria manualmente:

1. `vault_files.manual_override = true`
2. `vault_files.category_id = <escolhido>`
3. `vault_files.confidence = null`
4. registrar em `vault_classification_results` com `accepted = false`
5. não reclassificar mais (mesmo em re-upload de versão)

se o user zerar o override (via ui "usar sugestão automática"), reclassifica.

## loop de melhoria

o campo `vault_classification_results.accepted` permite ver onde o classificador erra:

```
# precisão por categoria
select
  suggested_category_id, category_label,
  count(*) filter (where accepted) as hits,
  count(*) as total,
  count(*) filter (where accepted)::numeric / count(*) as precision
from vault_classification_results
join vault_categories on id = suggested_category_id
group by 1, 2;
```

quando a precisão de uma categoria cai < 80%, revisar o dicionário.

## implementação

arquivo: `src/features/vault/classifier.ts`. pura (sem io, sem db). testável.

```ts
export interface ClassifierInput {
  name: string
  mime: string
  size: number
  content?: string // ocr no futuro
}

export interface ClassifierOutput {
  categorySlug: string
  confidence: number
  signals: Array<{ source: string; category: string; weight: number }>
}

export function classify(input: ClassifierInput): ClassifierOutput
```

chamada a partir da server action de `confirmUpload`, resultado persistido em `vault_files` + `vault_classification_results`.
