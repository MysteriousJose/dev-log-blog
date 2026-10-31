import { readFile } from "node:fs/promises"
import { join, resolve, sep } from "node:path"

const PROJECT_POSTS_DIR = join(process.cwd(), "project-posts")

type ProjectPost = { slug: string; title: string; date: Date; body: string }

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

// Only kebab_case slugs are allowed. Anything containing ".", "/", "\\" or
// ".." is rejected here so the resolved path can never escape PROJECT_POSTS_DIR.
const VALID_SLUG = /^[A-Za-z0-9][A-Za-z0-9_-]*$/

export async function getProjectPost(slug: string): Promise<ProjectPost | null> {
  if (!VALID_SLUG.test(slug) || slug.length > 200) return null
  try {
    const resolved = resolve(PROJECT_POSTS_DIR, `${slug}.md`)
    if (resolved !== PROJECT_POSTS_DIR && !resolved.startsWith(PROJECT_POSTS_DIR + sep)) return null
    const { data, body } = parseFrontmatter(await readFile(resolved, "utf8"))
    return {
      slug,
      title: data.title ?? slug,
      date: new Date(`${data.date ?? "1970-01-01"}T00:00:00`),
      body,
    }
  } catch {
    return null
  }
}
