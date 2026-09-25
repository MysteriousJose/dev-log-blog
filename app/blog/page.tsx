import { getPostList } from "@/lib/posts"
import { CalendarClock } from "lucide-react"

export default async function BlogPage() {
  const posts = await getPostList()
  // featured = newest (index 0, big + full width). rest = the normal grid.
  const [featured, ...rest] = posts

  return (
    <>
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Blog Articles</h1>
        <p className="text-sm text-muted-foreground">
          Thoughts, build logs, and lessons, maybe some public embarrassment.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-sm text-muted-foreground">Sorry still writing.</p>
      ) : (
        <div className="grid gap-4">
          {featured && (
            <a
              href={`/blog/${featured.slug}`}
              className="group block rounded-2xl border border-border/70 bg-card/80 p-6 shadow-sm backdrop-blur
transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md sm:p-8"
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CalendarClock className="size-3.5" aria-hidden="true" />
                {featured.date.toLocaleDateString(undefined, {
                  year: "numeric", month: "long", day: "numeric",
                })}
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                {featured.excerpt}
              </p>
            </a>
          )}

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-border/70 bg-card/80 p-4 shadow-sm
backdrop-blur transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <div className="text-xs text-muted-foreground">
                  {post.date.toLocaleDateString()}
                </div>
                <h3 className="mt-2 text-lg font-semibold">{post.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  )
}