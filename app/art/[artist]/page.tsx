import { ExternalLink } from "lucide-react"
import Link from "next/link"
import { getArtist } from "@/lib/artists"
import { notFound } from "next/navigation"
import { PieceCard } from "@/components/art-view"

export default async function ArtistPage({
  params,
}: {
  params: { artist: string }
}) {
  const { artist } = await params
  const data = await getArtist(artist)

  // Unknown slug (not in the roster, or no pieces) → clean 404 page.
  if (!data) notFound()

  return (
    <>
      <header className="mb-8">
        <div className="flex items-center gap-4">
          <img src={data.avatarUrl} alt="" className="size-20 rounded-full object-cover shadow-sm" />
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold tracking-tight">{data.name}</h1>
            <p className="text-sm text-muted-foreground">@{data.username}</p>
          </div>
          {data.socialUrl && (
            <a
              href={data.socialUrl}
              target="_blank"
              rel="noreferrer"
              className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-border/70
                bg-card/70 px-3 py-1.5 text-sm font-medium text-foreground backdrop-blur
                transition-colors hover:bg-accent"
            >
              <ExternalLink className="size-4" aria-hidden="true" />
              Follow
            </a>
          )}
        </div>

        {data.about && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {data.about}
          </p>
        )}
      </header>

      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Artworks</h2>
        <span className="text-sm text-muted-foreground">{data.works.length} pieces</span>
      </div>

      {data.works.length === 0 ? (
        <p className="text-sm text-muted-foreground">No pieces yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.works.map((work) => (
            <PieceCard key={work.slug} work={work} />
          ))}
        </div>
      )}

      <p className="mt-10">
        <Link href="/art" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to all artwork
        </Link>
      </p>
    </>
  )
}
