import ReactMarkdown from "react-markdown"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getPiece } from "@/lib/artists"
import { notFound } from "next/navigation"

export default async function PiecePage({
  params,
}: {
  params: { artist: string; piece: string }
}) {
  const { artist, piece } = await params
  const work = await getPiece(artist, piece)

  if (!work) notFound()

  return (
    <article className="mx-auto w-full max-w-prose">
      <Link
        href={`/art/${artist}`}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to {artist}
      </Link>

      <time className="mt-6 block text-sm text-muted-foreground">
        {work.date.toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">{work.title}</h1>
      {work.medium && (
        <span className="mt-3 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium
          bg-secondary text-secondary-foreground">
          {work.medium}
        </span>
      )}

      {work.image && (
        <img src={work.image} alt={work.title} className="mt-6 w-full rounded-2xl object-cover" />
      )}

      <div className="mt-6 space-y-4 text-base leading-relaxed">
        {work.caption && <p className="text-lg text-muted-foreground">{work.caption}</p>}
        <ReactMarkdown>{work.body}</ReactMarkdown>
      </div>
    </article>
  )
}
