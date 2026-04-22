import { redirect } from 'next/navigation'
import { manualChapters } from '@/features/manual/data'

export default function ManualIndex() {
  redirect(`/manual/${manualChapters[0].slug}`)
}
