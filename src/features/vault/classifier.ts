/**
 * ─── classifier ────────────────────────────────────────────────────
 *
 * Algoritmo de auto-categorização. Multi-signal scoring:
 *
 *   1. cada fonte (nome, mime, extensão, conteúdo, regra de user)
 *      emite votos ponderados para uma ou mais categorias.
 *   2. agrega votos por categoria (soma de pesos).
 *   3. normaliza pelo total emitido → confidence ∈ [0, 1].
 *   4. abaixo do threshold → 'outros'.
 *
 * Função pura. Sem io, sem db. Determinística. Testável.
 *
 * Spec: docs/vault/classification.md
 * ───────────────────────────────────────────────────────────────────
 */

import type { SystemCategorySlug } from './categories'
import { FALLBACK_CATEGORY } from './categories'

// ─── config ─────────────────────────────────────────────────────────

export const CLASSIFIER_WEIGHTS = {
  filename_regex:  3,
  filename_dict:   2,
  extension_hint:  1,
  mime_hint:       1,
  size_hint:       0.5,
  content_regex:   4,
  content_dict:    3,
  user_rule:       10,
} as const

export const CLASSIFIER_CONFIDENCE_THRESHOLD = 0.6

// ─── tipos ──────────────────────────────────────────────────────────

export interface ClassifierInput {
  name: string
  mime: string
  size: number
  content?: string  // texto extraído (ocr) — opcional, futuro
}

export interface ClassifierSignal {
  source: keyof typeof CLASSIFIER_WEIGHTS
  category: SystemCategorySlug
  weight: number
  match?: string  // o termo/regex que casou (para audit)
}

export interface ClassifierOutput {
  categorySlug: SystemCategorySlug
  confidence: number
  signals: ClassifierSignal[]
}

// ─── normalização ───────────────────────────────────────────────────

/** lowercase + remove acentos + colapsa whitespace + troca _/-. */
function normalize(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[_\-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

// ─── dicionários por categoria ──────────────────────────────────────

interface CategoryDict {
  regex: RegExp[]
  terms: string[]
}

const FILENAME_DICT: Record<SystemCategorySlug, CategoryDict> = {
  juridico: {
    regex: [
      /\b(contrato|procuracao|testamento|diretiva|escritura|certidao)\b/,
      /\b(rg|cpf|cnh|passaporte|titulo\s*eleitor)\b/,
      /\bdoc(umento)?\s*pessoal\b/,
    ],
    terms: ['advogado', 'cartorio', 'tabelionato', 'oab', 'notarial', 'inventario'],
  },
  saude: {
    regex: [
      /\b(exame|laudo|receita|prescricao|atestado|prontuario)\b/,
      /\b(medicamento|remedio|consulta|medico)\b/,
    ],
    terms: [
      'hemograma', 'ressonancia', 'tomografia', 'ultrassom', 'raio x', 'rx',
      'ecg', 'eletrocardiograma', 'cardiologista', 'endocrino', 'oftalmo',
    ],
  },
  financeiro: {
    regex: [
      /\b(fatura|boleto|extrato|imposto|irpf|darf|nota\s*fiscal|nfe|nfse|nfs-?e)\b/,
      /\b(recibo|comprovante|pagamento|transferencia|pix|ted|doc)\b/,
      /\bir\s*\d{2,4}\b/,
    ],
    terms: [
      'banco', 'banco do brasil', 'caixa', 'itau', 'bradesco',
      'santander', 'nubank', 'inter', 'c6', 'btg', 'sicredi',
    ],
  },
  trabalho: {
    regex: [
      /\b(holerite|contracheque|folha\s*de\s*pagamento|admissao|demissao)\b/,
      /\b(ctps|pis|fgts|inss|rescisao|asu|acordo\s*coletivo)\b/,
      /\bcontrato\s*de\s*trabalho\b/,
    ],
    terms: ['rh', 'recursos humanos', 'empregador'],
  },
  viagem: {
    regex: [
      /\b(passagem|reserva|voucher|itinerario|hotel|hospedagem|voo)\b/,
      /\b(passaporte|visto|embarque|checkin|check in)\b/,
    ],
    terms: ['latam', 'gol', 'azul', 'booking', 'airbnb', 'decolar'],
  },
  imoveis: {
    regex: [
      /\b(iptu|condominio|escritura|financiamento|imovel)\b/,
      /\b(aluguel|locacao|usufruto|matricula)\b/,
    ],
    terms: ['cartorio de imoveis', 'cri', 'sindico'],
  },
  pessoal: { regex: [], terms: [] },
  outros: { regex: [], terms: [] },
}

const EXT_HINTS: Partial<Record<SystemCategorySlug, string[]>> = {
  saude:      ['dcm', 'dicom'],
  financeiro: ['ofx', 'qif'],
}

const MIME_HINTS: Partial<Record<SystemCategorySlug, string[]>> = {
  saude:      ['application/dicom', 'image/dicom'],
  financeiro: ['application/vnd.ms-excel', 'application/x-ofx'],
}

// ─── funções de signal ──────────────────────────────────────────────

function scanText(
  text: string,
  source: 'filename_regex' | 'filename_dict' | 'content_regex' | 'content_dict',
): ClassifierSignal[] {
  const out: ClassifierSignal[] = []
  const norm = normalize(text)

  for (const [slug, dict] of Object.entries(FILENAME_DICT) as Array<
    [SystemCategorySlug, CategoryDict]
  >) {
    if (slug === 'pessoal' || slug === 'outros') continue

    if (source === 'filename_regex' || source === 'content_regex') {
      for (const rx of dict.regex) {
        const match = norm.match(rx)
        if (match) {
          out.push({
            source,
            category: slug,
            weight: CLASSIFIER_WEIGHTS[source],
            match: match[0],
          })
        }
      }
    } else {
      for (const term of dict.terms) {
        if (norm.includes(term)) {
          out.push({
            source,
            category: slug,
            weight: CLASSIFIER_WEIGHTS[source],
            match: term,
          })
        }
      }
    }
  }

  return out
}

function scanExtension(ext: string): ClassifierSignal[] {
  const out: ClassifierSignal[] = []
  const e = ext.toLowerCase().replace(/^\./, '')
  for (const [slug, exts] of Object.entries(EXT_HINTS) as Array<
    [SystemCategorySlug, string[]]
  >) {
    if (exts.includes(e)) {
      out.push({
        source: 'extension_hint',
        category: slug,
        weight: CLASSIFIER_WEIGHTS.extension_hint,
        match: e,
      })
    }
  }
  return out
}

function scanMime(mime: string): ClassifierSignal[] {
  const out: ClassifierSignal[] = []
  const m = mime.toLowerCase().trim()
  for (const [slug, mimes] of Object.entries(MIME_HINTS) as Array<
    [SystemCategorySlug, string[]]
  >) {
    if (mimes.includes(m)) {
      out.push({
        source: 'mime_hint',
        category: slug,
        weight: CLASSIFIER_WEIGHTS.mime_hint,
        match: m,
      })
    }
  }
  return out
}

// ─── api pública ────────────────────────────────────────────────────

/**
 * Classifica um arquivo. Retorna sempre um resultado — em pior caso,
 * `categorySlug = 'outros'` com `confidence = 0`.
 */
export function classify(input: ClassifierInput): ClassifierOutput {
  const signals: ClassifierSignal[] = []

  // separa nome de extensão se vier junto
  const lastDot = input.name.lastIndexOf('.')
  const baseName = lastDot > 0 ? input.name.slice(0, lastDot) : input.name
  const ext = lastDot > 0 ? input.name.slice(lastDot + 1) : ''

  signals.push(...scanText(baseName, 'filename_regex'))
  signals.push(...scanText(baseName, 'filename_dict'))
  signals.push(...scanExtension(ext))
  signals.push(...scanMime(input.mime))

  if (input.content && input.content.length > 0) {
    signals.push(...scanText(input.content, 'content_regex'))
    signals.push(...scanText(input.content, 'content_dict'))
  }

  return aggregate(signals)
}

function aggregate(signals: ClassifierSignal[]): ClassifierOutput {
  if (signals.length === 0) {
    return { categorySlug: FALLBACK_CATEGORY, confidence: 0, signals: [] }
  }

  const scores = new Map<SystemCategorySlug, number>()
  let total = 0

  for (const s of signals) {
    scores.set(s.category, (scores.get(s.category) ?? 0) + s.weight)
    total += s.weight
  }

  let winner: SystemCategorySlug = FALLBACK_CATEGORY
  let winnerScore = 0
  for (const [cat, score] of scores) {
    if (score > winnerScore) {
      winnerScore = score
      winner = cat
    }
  }

  const confidence = total > 0 ? winnerScore / total : 0

  if (confidence < CLASSIFIER_CONFIDENCE_THRESHOLD) {
    return { categorySlug: FALLBACK_CATEGORY, confidence, signals }
  }

  return { categorySlug: winner, confidence, signals }
}
