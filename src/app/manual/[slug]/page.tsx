import { manualChapters } from '@/lib/manualData'
import { DigitalReader } from '@/components/DigitalReader'

export async function generateStaticParams() {
  return manualChapters.map((chapter) => ({
    slug: chapter.slug,
  }))
}

export default async function ManualPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <DigitalReader initialChapterSlug={slug} />
}
