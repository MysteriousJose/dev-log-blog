export const profile = {
  handle: "@rin.builds",
  name: "Rin Nakamura",
  role: "Self-taught developer",
  location: "Learning in public",
  githubUrl: "https://github.com",
}

export const stats = [
  { label: "Repositories", value: "24" },
  { label: "Commits this year", value: "1,340" },
  { label: "Day streak", value: "168" },
]

export const learning = [
  { skill: "TypeScript", level: 82 },
  { skill: "System design", level: 54 },
  { skill: "Rust", level: 33 },
]

export type Post = {
  title: string
  date: string
  readingTime: string
  tag: string
}

export const posts: Post[] = [
  {
    title: "What 100 days of shipping taught me about scope",
    date: "Sep 12",
    readingTime: "6 min",
    tag: "Reflections",
  },
  {
    title: "Reading source code as a self-taught dev",
    date: "Aug 28",
    readingTime: "4 min",
    tag: "Learning",
  },
  {
    title: "Migrating a side project to the App Router",
    date: "Aug 09",
    readingTime: "8 min",
    tag: "Next.js",
  },
]

export type Repo = {
  name: string
  description: string
  language: string
  languageColor: string
  stars: number
  forks: number
  topics: string[]
  status: "Active" | "Maintained" | "Archived"
}

export const repos: Repo[] = [
  {
    name: "commit-streak",
    description: "A tiny dashboard that turns my GitHub activity into a self-taught learning timeline.",
    language: "TypeScript",
    languageColor: "oklch(0.62 0.16 5)",
    stars: 214,
    forks: 18,
    topics: ["next.js", "charts", "github-api"],
    status: "Active",
  },
  {
    name: "notes-to-ship",
    description: "Markdown-first note app where every note can graduate into a public build log.",
    language: "TypeScript",
    languageColor: "oklch(0.7 0.14 20)",
    stars: 132,
    forks: 9,
    topics: ["react", "markdown", "local-first"],
    status: "Active",
  },
  {
    name: "rustlings-solved",
    description: "My annotated solutions and notes while working through Rust fundamentals.",
    language: "Rust",
    languageColor: "oklch(0.65 0.13 45)",
    stars: 87,
    forks: 24,
    topics: ["rust", "learning", "notes"],
    status: "Maintained",
  },
  {
    name: "algo-cards",
    description: "Spaced-repetition flashcards for data structures, built to teach myself the basics.",
    language: "JavaScript",
    languageColor: "oklch(0.82 0.12 95)",
    stars: 156,
    forks: 31,
    topics: ["algorithms", "spaced-repetition"],
    status: "Maintained",
  },
  {
    name: "focus-timer",
    description: "A minimal pomodoro timer with session history — my first ever published project.",
    language: "TypeScript",
    languageColor: "oklch(0.62 0.16 5)",
    stars: 68,
    forks: 6,
    topics: ["pwa", "productivity"],
    status: "Archived",
  },
  {
    name: "devlog-engine",
    description: "The static engine powering this very blog. Zero dependencies, fully typed.",
    language: "TypeScript",
    languageColor: "oklch(0.7 0.14 20)",
    stars: 301,
    forks: 42,
    topics: ["blog", "ssg", "open-source"],
    status: "Active",
  },
]
