import { redirect } from 'next/navigation'
import { manualChapters } from '@/features/manual'

export default function ManualIndex() {
  redirect(`/manual/${manualChapters[0].slug}`)
}
