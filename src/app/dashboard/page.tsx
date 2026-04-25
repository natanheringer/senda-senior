import { requireUser } from '@/lib/server'
import { getChecklist, DashboardView } from '@/features/dashboard'

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
