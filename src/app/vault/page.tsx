import { requireUser } from '@/lib/server/auth'
import {
  getCategories,
  getQuota,
  listFiles,
} from '@/features/vault/data'
import { VaultView } from '@/features/vault/components/VaultView'

export const dynamic = 'force-dynamic'

export default async function VaultPage() {
  const user = await requireUser()

  const [quota, categories, activeList, trashedList] = await Promise.all([
    getQuota(user.id),
    getCategories(user.id),
    listFiles(user.id, { pageSize: 200 }),
    listFiles(user.id, { pageSize: 200, trashed: true }),
  ])

  return (
    <VaultView
      quota={quota}
      categories={categories}
      files={activeList.items}
      trashedFiles={trashedList.items}
      userEmail={user.email ?? ''}
    />
  )
}
