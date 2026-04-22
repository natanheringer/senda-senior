import { requireUser } from '@/lib/server/auth'
import { getChecklist } from '@/features/dashboard/data'
import { DashboardView } from '@/features/dashboard/components/DashboardView'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const user = await requireUser()
  const checklist = await getChecklist(user.id)

  const email = user.email ?? ''
  const firstName = email.split('@')[0] || 'Usuário'

  return (
    <DashboardView
      userEmail={email}
      firstName={firstName}
      initialChecklist={checklist}
    />
  )
}
