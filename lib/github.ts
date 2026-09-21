// Live GitHub data layer.
//
// Fetches the public profile + repositories and normalizes them for the
// dev-log UI. Runs unauthenticated; when a PAT is present via the `token`
// argument it also fetches the yearly contribution graph (GraphQL), the one
// metric that requires authentication.
//
// All `fetch` calls set `next.revalidate` so Next caches upstream responses
// and stays well under the unauthenticated rate limit.
const USERNAME = process.env.GITHUB_USERNAME ?? "MysteriousJose"
const DEFAULT_LANGUAGE_COLOR = "oklch(0.6 0.05 280)"

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "oklch(0.72 0.155 92)",
  JavaScript: "oklch(0.83 0.12 95)",
  Rust: "oklch(0.66 0.14 30)",
  Python: "oklch(0.75 0.16 102)",
  Go: "oklch(0.7 0.14 195)",
  "C++": "oklch(0.68 0.14 275)",
  C: "oklch(0.6 0.11 280)",
  "C#": "oklch(0.62 0.14 20)",
  Java: "oklch(0.6 0.13 25)",
  Ruby: "oklch(0.6 0.15 15)",
  Swift: "oklch(0.68 0.16 30)",
  Kotlin: "oklch(0.66 0.14 290)",
  Dart: "oklch(0.7 0.13 210)",
  Haskell: "oklch(0.6 0.13 255)",
  Elixir: "oklch(0.68 0.15 25)",
  Scala: "oklch(0.6 0.13 15)",
  Shell: "oklch(0.7 0.08 60)",
  HTML: "oklch(0.7 0.15 30)",
  CSS: "oklch(0.7 0.13 260)",
  Vue: "oklch(0.72 0.16 140)",
  Svelte: "oklch(0.7 0.16 30)",
}

export type RepoStatus = "Active" | "Archived"

export type Repo = {
  name: string
  description: string | null
  language: string | null
  languageColor: string
  stars: number
  forks: number
  topics: string[]
  status: RepoStatus
  url: string
  createdAt: string
  pushedAt: string
}

export type Profile = {
  login: string
  name: string
  avatarUrl: string
  bio: string | null
  location: string | null
  publicRepos: number
  followers: number
  following: number
  joinedYear: number
  url: string
}

export type ContributionDay = {
  date: string
  count: number
}

export type ContributionWeek = {
  days: ContributionDay[]
}

export type ContributionCalendar = {
  totalContributions: number
  weeks: ContributionWeek[]
}

/**
 * Yearly GitHub contribution graph. `null` when no PAT is configured, since
 * the contribution graph is the one metric that requires authentication.
 */
export type Contributions = {
  year: number
  totalContributions: number
  calendar: ContributionCalendar
}

export type GitHubData = {
  profile: Profile
  repos: Repo[]
  recentActivity: { name: string; language: string | null; pushedAt: string; status: RepoStatus; url: string }[]
  contributions: Contributions | null
  updatedAt: string
}

type RawUser = {
  login: string
  name: string | null
  avatar_url: string
  bio: string | null
  location: string | null
  public_repos: number
  followers: number
  following: number
  created_at: string
  html_url: string
}

type RawRepo = {
  name: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks: number
  fork: boolean
  topics: string[]
  archived: boolean
  html_url: string
  created_at: string
  pushed_at: string
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "dev-log-blog",
    },
    next: { revalidate: 300 },
  })
  if (!res.ok) {
    throw new Error(`GitHub API ${res.status} for ${url}`)
  }
  return (await res.json()) as T
}

const CONTRIBUTIONS_QUERY = /* GraphQL */ `
  query ($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        totalContributions
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`

type ContributionsResponse = {
  user: {
    contributionsCollection: {
      totalContributions: number
      contributionCalendar: {
        totalContributions: number
        weeks: { contributionDays: { contributionCount: number; date: string }[] }[]
      }
    }
  }
}

async function fetchGraphql<T>(
  query: string,
  variables: Record<string, string>,
  token: string,
): Promise<T | null> {
  let parsed: T | null = null
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "User-Agent": "dev-log-blog",
      },
      next: { revalidate: 300 },
      body: JSON.stringify({ query, variables }),
    })
    if (res.ok) {
      const json = (await res.json()) as { data?: T; errors?: { message: string }[] }
      if (!json.errors && json.data) parsed = json.data
    }
  } catch {
    parsed = null
  }
  return parsed
}

async function loadContributions(
  token: string,
  login: string,
  from: string,
  to: string,
): Promise<Contributions | null> {
  const data = await fetchGraphql<ContributionsResponse>(CONTRIBUTIONS_QUERY, { login, from, to }, token)
  const collection = data?.user?.contributionsCollection
  if (!collection) return null
  return {
    year: new Date(to).getFullYear(),
    totalContributions: collection.totalContributions,
    calendar: {
      totalContributions: collection.contributionCalendar.totalContributions,
      weeks: collection.contributionCalendar.weeks.map((week) => ({
        days: week.contributionDays.map((day) => ({ date: day.date, count: day.contributionCount })),
      })),
    },
  }
}

function normalizeProfile(raw: RawUser): Profile {
  return {
    login: raw.login,
    name: raw.name ?? raw.login,
    avatarUrl: raw.avatar_url,
    bio: raw.bio,
    location: raw.location,
    publicRepos: raw.public_repos,
    followers: raw.followers,
    following: raw.following,
    joinedYear: new Date(raw.created_at).getFullYear(),
    url: raw.html_url,
  }
}

function normalizeRepo(raw: RawRepo): Repo {
  return {
    name: raw.name,
    description: raw.description,
    language: raw.language,
    languageColor: LANGUAGE_COLORS[raw.language ?? ""] ?? DEFAULT_LANGUAGE_COLOR,
    stars: raw.stargazers_count,
    forks: raw.forks,
    topics: raw.topics ?? [],
    status: raw.archived ? "Archived" : "Active",
    url: raw.html_url,
    createdAt: raw.created_at,
    pushedAt: raw.pushed_at,
  }
}

/**
 * Load public profile + repositories for the configured account.
 * @param token Optional PAT for richer (GraphQL) activity metrics.
 */
export async function loadGitHubData(token = process.env.GITHUB_TOKEN): Promise<GitHubData> {
  const [profileRaw, reposRaw] = await Promise.all([
    fetchJson<RawUser>(`https://api.github.com/users/${USERNAME}`),
    fetchJson<RawRepo[]>(
      `https://api.github.com/users/${USERNAME}/repos?sort=pushed&per_page=100&v=1710000000`,
    ),
  ])

  const profile = normalizeProfile(profileRaw)

  // Show only the user's own projects (exclude forks), newest activity first.
  const repos = reposRaw
    .filter((raw) => !raw.fork)
    .map(normalizeRepo)
    .sort((a, b) => new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime())

  const recentActivity = repos.slice(0, 3).map((r) => ({
    name: r.name,
    language: r.language,
    pushedAt: r.pushedAt,
    status: r.status,
    url: r.url,
  }))
  const today = new Date()
  const from = new Date(today)
  from.setFullYear(today.getFullYear() - 1)
  const contributions = token
    ? await loadContributions(token, USERNAME, from.toISOString(), today.toISOString())
    : null

  return {
    profile,
    repos,
    recentActivity,
    contributions,
    updatedAt: today.toISOString(),
  }
}

/** Whole numbers with thousands separators (e.g. 1340 -> "1,340"). */
export function formatCount(n: number): string {
  return new Intl.NumberFormat("en-US").format(n)
}

/** Human-friendly relative time ("3d ago", "2mo ago") from an ISO date. */
export function relativeTime(iso: string, now = Date.now()): string {
  const diff = now - new Date(iso).getTime()
  const mins = Math.round(diff / 60000)
  if (mins < 1) return "just now"
  const hours = Math.round(mins / 60)
  if (hours < 1) return `${mins}m ago`
  const days = Math.round(hours / 24)
  if (days < 1) return `${hours}h ago`
  const months = Math.round(days / 30)
  if (months < 12) return `${months}mo ago`
  const years = Math.round(months / 12)
  return `${years}y ago`
}
