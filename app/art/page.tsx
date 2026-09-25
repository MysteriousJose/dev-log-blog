import { listArtists } from "@/lib/artists"
import { ArtistCard } from "@/components/art-view"

export default async function ArtistsPage() {
  const artists = await listArtists()

  return (
    <>
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Artwork</h1>
        <p className="text-sm text-muted-foreground">
          Pieces from me and friends — pick an artist to see their gallery.
        </p>
      </header>

      {artists.length === 0 ? (
        <p className="text-sm text-muted-foreground">Sorry, no creations yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {artists.map((artist) => (
            <ArtistCard key={artist.slug} artist={artist} />
          ))}
        </div>
      )}
    </>
  )
}
