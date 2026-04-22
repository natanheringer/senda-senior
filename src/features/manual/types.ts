/**
 * Contrato dos capítulos do Manual.
 *
 * Hoje os capítulos são estáticos (`./data.ts`). Quando migrarmos
 * para Supabase, esta interface vira o shape esperado da query
 * (e o gerador de tipos da DB substitui isto por um tipo derivado).
 */
export interface ManualChapter {
  slug: string
  title: string
  subtitle: string
  content: string[]
}
