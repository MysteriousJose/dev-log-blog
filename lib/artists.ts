import { readdir, readFile } from "node:fs/promises"
import { join, sep } from "node:path"

// ---------------------------------------------------------------------------
// ART GALLERY — how it works (read this once)
// ---------------------------------------------------------------------------
// Two sources of truth, mirroring how the blog works:
//   1. ARTISTS (below)   — a curated list of people. Edit this array to add a
//                          friend. Each needs a `slug` that matches the `artist`
//                          field in their artwork files.
//   2. ./artworks/*.md    — one markdown file per artwork. Frontmatter's
//                          `artist: <slug>` groups pieces under that person.
//                          (Blog posts live in ./posts — they are separate.)
// ---------------------------------------------------------------------------

export interface Artist {
  slug: string // URL segment: /art/<slug>  — must match artwork `artist:` frontmatter
  name: string // Display name shown in the header
  username: string // @handle shown under the name
  about: string // "A little about them" text
  avatarUrl: string // image path, e.g. "/artists/alice.png"
  socialUrl: string // link for the Follow button (website / instagram / …)
}

export interface ArtPiece {
  slug: string
  artist: string // matches an Artist.slug
  title: string
  date: Date
  image?: string // cover image path (optional; falls back to a blank placeholder)
  medium?: string // e.g. "Digital", "Watercolor"
  caption?: string // one-line summary
  body: string // full markdown description
}

type ArtistWithWorks = Artist & { works: ArtPiece[] }

// The roster. Add a friend here, then drop their `.md` files in ./artworks.
export const ARTISTS: Artist[] = [
  {
    slug: "jordan",
    name: "Shoka",
    username: "inferno_animates",
    about:
      "A little about this artist — what they make, what inspires them, and one fun fact. " +
      "Edit this and it updates on the page automatically.",
    avatarUrl: "/shoka.jpg",
    socialUrl: "https://www.instagram.com/inferun0?utm_source=qr",
  },
  {
    slug: "sam",
    name: "Sam Rivera",
    username: "samdraws",
    about:
      "Another friend's gallery card. Their pieces below are pulled from ./artworks, " +
      "grouped by this slug. Change the text freely.",
    avatarUrl: "/placeholder-user.jpg",
    socialUrl: "https://example.com/sam",
  },
]

const ARTWORKS_DIR = join(process.cwd(), "artworks")

// Split "--- ... ---" frontmatter from the markdown body. (Same trick as posts.ts.)
function parseFrontmatter(source: string) {
  const match = /^---\n([\s\S]*)\n---\n?([\s\S]*)$/.exec(source)
  if (!match) return { data: {}, body: source }
  const data: Record<string, string> = {}
  for (const line of match[1].split("\n")) {
    const [key, ...rest] = line.split(":")
    data[key.trim()] = rest.join(":").trim()
  }
  return { data, body: match[2] }
}

// Only kebab_case slugs are allowed. Anything with ".", "/" or ".." is rejected
// so a path can never escape ARTWORKS_DIR.
const VALID_SLUG = /^[A-Za-z0-9][A-Za-z0-9_-]*$/

// Read every artwork once and bucket it by artist slug.
async function indexWorks(): Promise<Map<string, ArtPiece[]>> {
  const files = (await readdir(ARTWORKS_DIR, { withFileTypes: true }))
    .filter((f) => f.isFile() && f.name.endsWith(".md"))
    .map((f) => f.name)

  const all = await Promise.all(
    files.map(async (file) => {
      const { data, body } = parseFrontmatter(await readFile(join(ARTWORKS_DIR, file), "utf8"))
      return {
        slug: file.replace(/\.md$/, ""),
        artist: data.artist?.trim() ?? "",
        title: data.title?.trim() ?? file,
        date: new Date(data.date ?? "1970-01-01"),
        image: data.image?.trim() || undefined,
        medium: data.medium?.trim() || undefined,
        caption: data.excerpt?.trim() || data.caption?.trim(),
        body,
      } satisfies ArtPiece
    }),
  )

  const byArtist = new Map<string, ArtPiece[]>()
  for (const work of all) {
    if (!work.artist) continue
    const list = byArtist.get(work.artist) ?? []
    list.push(work)
    byArtist.set(work.artist, list)
  }
  // Newest first within each artist.
  for (const list of byArtist.values()) {
    list.sort((a, b) => b.date.getTime() - a.date.getTime())
  }
  return byArtist
}

// All artists that have at least one piece, newest-piece-first.
export async function listArtists(): Promise<ArtistWithWorks[]> {
  const byArtist = await indexWorks()
  const withWorks = ARTISTS.map((a) => ({ ...a, works: byArtist.get(a.slug) ?? [] }))
    .filter((a) => a.works.length > 0)
  withWorks.sort((a, b) => b.works[0].date.getTime() - a.works[0].date.getTime())
  return withWorks
}

// One artist + their pieces, or null if the slug isn't in the roster.
export async function getArtist(slug: string): Promise<ArtistWithWorks | null> {
  const base = ARTISTS.find((a) => a.slug === slug)
  if (!base) return null
  const works = (await indexWorks()).get(slug) ?? []
  return { ...base, works }
}

// One artwork, verified to belong to the given artist.
export async function getPiece(artist: string, piece: string): Promise<ArtPiece | null> {
  if (!VALID_SLUG.test(piece)) return null
  const artistData = await getArtist(artist)
  if (!artistData) return null
  return artistData.works.find((w) => w.slug === piece) ?? null
}
