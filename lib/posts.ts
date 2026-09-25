import { readdir, readFile } from "node:fs/promises"
import { join, resolve, sep } from "node:path"
const POSTS_DIR = join(process.cwd(), "posts")

type Post = { slug: string; title: string; date: Date; excerpt: string; body: string }

// Split "--- ... ---" frontmatter from the markdown body.
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

export async function getPostList(): Promise<Omit<Post, "body">[]> {
  const files = (await readdir(POSTS_DIR, { withFileTypes: true }))
    .filter((f) => f.isFile() && f.name.endsWith(".md"))
    .map((f) => f.name)

  const posts = await Promise.all(
    files.map(async (file) => {
      const { data, body } = parseFrontmatter(await readFile(join(POSTS_DIR, file), "utf8"))
      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title ?? file,
        date: new Date(data.date ?? "1970-01-01"),
        excerpt: data.excerpt ?? "No excerpt.",
        body,
      }
    })
  )

  // Newest first. This single sort is the whole "auto re-feature" system:
  // index 0 is *always* the newest post, no matter what you just committed.
  posts.sort((a, b) => b.date.getTime() - a.date.getTime())
  return posts
}

// Only kebab_case slugs are allowed. Anything containing ".", "/", "\\" or
// ".." is rejected here so the resolved path can never escape POSTS_DIR.
const VALID_SLUG = /^[A-Za-z0-9][A-Za-z0-9_-]*$/

export async function getPost(slug: string): Promise<Post | null> {
  if (!VALID_SLUG.test(slug) || slug.length > 200) return null
  try {
    const resolved = resolve(POSTS_DIR, `${slug}.md`)
    if (resolved !== POSTS_DIR && !resolved.startsWith(POSTS_DIR + sep)) return null
    const { data, body } = parseFrontmatter(await readFile(resolved, "utf8"))
    return {
      slug,
      title: data.title ?? slug,
      date: new Date(data.date ?? "1970-01-01"),
      excerpt: data.excerpt ?? "",
      body,
    }
  } catch {
    return null
  }
}