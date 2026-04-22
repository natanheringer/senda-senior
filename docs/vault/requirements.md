# vault/requirements

cofre de documentos do usuário. análise de requisitos e regras de negócio.

## visão

permitir que o usuário deposite qualquer documento que hoje vive em pastas, gavetas ou caixas de email, e recupere em segundos com organização automática por domínio (jurídico, saúde, financeiro, viagem, trabalho, pessoal, imóveis, outros).

## personas

| persona      | uso principal                                    |
|--------------|--------------------------------------------------|
| idoso titular| subir rg/exames/procurações, reencontrar rápido  |
| familiar     | consultar em nome do titular (v2, via share)     |
| assessor     | triagem técnica (v2, workspace multi-user)       |

## requisitos funcionais

| id    | descrição                                                   | prioridade |
|-------|-------------------------------------------------------------|------------|
| fr-01 | upload único ou múltiplo (drag-drop + file picker)          | p0         |
| fr-02 | listagem paginada com filtros (categoria, tag, data, tipo) | p0         |
| fr-03 | preview inline para pdf, imagem, texto                      | p0         |
| fr-04 | download de arquivo original                                | p0         |
| fr-05 | edição de metadados (nome exibido, descrição, tags)         | p0         |
| fr-06 | soft delete + lixeira + restauração                         | p0         |
| fr-07 | auto-categorização no upload                                | p0         |
| fr-08 | override manual de categoria                                | p0         |
| fr-09 | busca por nome, tag, categoria                              | p0         |
| fr-10 | versionamento (substituir arquivo mantendo histórico)       | p1         |
| fr-11 | busca full-text no conteúdo (ocr)                           | p1         |
| fr-12 | cotas de armazenamento visíveis ao usuário                  | p1         |
| fr-13 | exportação em zip (seleção ou vault inteiro)                | p1         |
| fr-14 | tags customizadas                                           | p1         |
| fr-15 | favoritos                                                   | p2         |
| fr-16 | compartilhamento com contatos (leitura)                     | p2         |
| fr-17 | regras de classificação customizadas                        | p2         |
| fr-18 | pastas privadas com cliente-side encryption                 | p2         |

## requisitos não-funcionais

| id     | descrição                                                  |
|--------|------------------------------------------------------------|
| nfr-01 | tls em trânsito; aes-256 em repouso (padrão supabase)      |
| nfr-02 | upload até 50 mb por arquivo (mvp). 500 mb quota por user  |
| nfr-03 | listagem paginada retorna em < 300 ms para 1000 arquivos   |
| nfr-04 | deduplicação por sha-256                                   |
| nfr-05 | auditoria: toda leitura/escrita registrada 90 dias         |
| nfr-06 | upload resumível para arquivos > 10 mb (pós-mvp)           |
| nfr-07 | lgpd: acesso, correção, exclusão, portabilidade            |

## regras de negócio

| id    | regra                                                              |
|-------|--------------------------------------------------------------------|
| rn-01 | um arquivo pertence a exatamente um `user_id` (dono).              |
| rn-02 | storage path = `{user_id}/{file_id}.{ext}`; nome exibido é editável.|
| rn-03 | sha-256 calculado no upload. duplicata exata do mesmo user = conflito 409. |
| rn-04 | auto-categoria atribui `confidence ∈ [0, 1]`. abaixo de 0.6 → `outros`. |
| rn-05 | `manual_override=true` impede re-classificação automática.         |
| rn-06 | soft delete: `deleted_at` definido. hard delete após 30 dias (cron). |
| rn-07 | quota excedida bloqueia upload com erro 413.                       |
| rn-08 | extensões bloqueadas: `exe, bat, cmd, sh, ps1, scr, msi, dll, com, vbs, js (standalone)`. |
| rn-09 | versões: até 10 por arquivo. versão mais antiga removida do storage, mas metadata persiste. |
| rn-10 | categoria sistema não pode ser apagada pelo user; apenas renomeada exibicionalmente. |
| rn-11 | acesso a arquivo de outro user = 403 (rls + policy do storage).    |
| rn-12 | download sempre via signed url; ttl = 5 min.                       |
| rn-13 | upload via signed upload url pré-assinado pelo server.             |

## categorias sistema

fixas, criadas via migration, não apagáveis:

| slug         | label        | descrição                                       |
|--------------|--------------|-------------------------------------------------|
| juridico     | jurídico     | contratos, procurações, testamentos, certidões  |
| saude        | saúde        | exames, receitas, prontuários                   |
| financeiro   | financeiro   | faturas, boletos, impostos, extratos            |
| trabalho     | trabalho     | holerites, contratos clt, ptas                  |
| viagem       | viagem       | passagens, reservas, vistos, passaportes        |
| imoveis      | imóveis      | escrituras, iptu, condomínio, financiamentos    |
| pessoal      | pessoal      | documentos pessoais sem outro encaixe           |
| outros       | outros       | fallback quando classificação não tem confiança |

usuário pode criar categorias adicionais (tipo `user`). slug é único por user.

## fluxos principais

### fluxo de upload

1. cliente seleciona arquivo
2. cliente calcula sha-256 local
3. cliente chama server action `prepareUpload({name, size, mime, sha256})`
4. server valida: quota, extensão, duplicata
5. server insere row em `vault_files` com status `pending`
6. server retorna signed upload url do storage
7. cliente faz put no storage
8. cliente chama `confirmUpload(fileId)`
9. server verifica objeto existe em storage, marca status `ready`
10. server enfileira classificação assíncrona (ou roda inline para mvp)
11. cliente recebe resultado e atualiza ui

### fluxo de leitura

1. rsc chama `listFiles(userId, filters, page)`
2. server retorna rows com `signed_url` opcional gerado on-demand
3. cliente exibe lista; ao abrir preview, server gera signed url ttl 5 min

### fluxo de exclusão

1. cliente chama `softDelete(fileId)` → marca `deleted_at`, move para lixeira visual
2. cron diário remove objetos do storage e rows com `deleted_at < now() - 30d`

## métricas

| métrica                       | target     |
|-------------------------------|------------|
| precisão da auto-categoria    | > 85% (amostra curada) |
| tempo médio de upload (5 mb)  | < 3 s      |
| taxa de override manual       | < 15%      |
| uso médio por user (90d)      | > 20 arquivos |

## fora de escopo (mvp)

- ocr (fr-11)
- compartilhamento (fr-16)
- upload resumível (nfr-06)
- antivírus (phase 2)
- client-side encryption para pastas privadas (fr-18)
- regras de classificação customizadas (fr-17)
