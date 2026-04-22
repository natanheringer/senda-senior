import { notFound } from 'next/navigation'
import { getChapterBySlug, getChapterSlugs } from '@/features/manual/data'
import { DigitalReader } from '@/features/manual/components/DigitalReader'

export async function generateStaticParams() {
  return getChapterSlugs().map((slug) => ({ slug }))
}

export default async function ManualChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  if (!getChapterBySlug(slug)) {
    notFound()
  }

  return <DigitalReader initialChapterSlug={slug} />
}
