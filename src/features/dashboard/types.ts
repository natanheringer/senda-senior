/**
 * Itens do checklist exibido no dashboard.
 *
 * O catálogo (textos, ordem) vive em código (`./checklistCatalog.ts`)
 * para que a equipe editorial não precise tocar no banco para mexer
 * no copy. O banco guarda apenas o estado por usuário (key + done).
 */
export interface ChecklistItem {
  key: string
  text: string
  done: boolean
}
