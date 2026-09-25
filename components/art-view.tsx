import { ArrowUpRight, CalendarClock } from "lucide-react"
import Link from "next/link"
import type { Artist, ArtPiece } from "@/lib/artists"

// Card chrome shared with the repositories page — same rounded border, card
// background, and the subtle lift-on-hover. This is what makes art cards look
// like repo cards.
const CARD =
  "group flex flex-col rounded-2xl border border-border/70 bg-card/80 shadow-sm backdrop-blur " +
  "transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"

const MEDIUM =
  "rounded-full px-2 py-0.5 text-[10px] font-medium bg-secondary text-secondary-foreground"

// One artist, shown as a card on the /art index. Clicking it opens /art/<slug>.
export function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <Link href={`/art/${artist.slug}`} className={`${CARD} overflow-hidden p-5`}>
      <div className="flex items-center gap-3">
        <img src={artist.avatarUrl} alt="" className="size-12 rounded-full object-cover shadow-sm" />
        <div className="min-w-0">
          <h3 className="flex items-center gap-1.5 text-base font-semibold text-foreground">
            {artist.name}
            <ArrowUpRight
              className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
              aria-hidden="true"
            />
          </h3>
          <p className="truncate text-sm text-muted-foreground">@{artist.username}</p>
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
        {artist.about}
      </p>
    </Link>
  )
}

// One artwork, shown as a card on an artist's gallery. Clicking it opens the
// artwork page at /art/<artist>/<slug>.
export function PieceCard({ work }: { work: ArtPiece }) {
  return (
    <Link href={`/art/${work.artist}/${work.slug}`} className={`${CARD} overflow-hidden`}>
      {work.image ? (
        <img src={work.image} alt={work.title} className="aspect-[4/3] w-full object-cover" />
      ) : (
        <div className="aspect-[4/3] w-full bg-secondary/40" />
      )}

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
            {work.title}
            <ArrowUpRight
              className="size-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
              aria-hidden="true"
            />
          </h3>
          {work.medium && <span className={MEDIUM}>{work.medium}</span>}
        </div>

        {work.caption && (
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {work.caption}
          </p>
        )}

        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarClock className="size-3.5" aria-hidden="true" />
          {work.date.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      </div>
    </Link>
  )
}
