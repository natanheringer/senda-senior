import { redirect } from 'next/navigation'
import { manualChapters } from '@/lib/manualData'

export default function ManualIndex() {
  redirect(`/manual/${manualChapters[0].slug}`)
}
