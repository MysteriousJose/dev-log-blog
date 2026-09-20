"use client"

import { GitFork, Star, ArrowUpRight } from "lucide-react"
import { repos, type Repo } from "./dev-data"

const statusStyles: Record<Repo["status"], string> = {
  Active: "bg-primary/12 text-primary",
  Maintained: "bg-secondary text-secondary-foreground",
  Archived: "bg-muted text-muted-foreground",
}

function RepoCard({ repo }: { repo: Repo }) {
  return (
    <a
      href={`https://github.com/devlog/${repo.name}`}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col rounded-2xl border border-border/70 bg-card/80 p-4 shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="flex items-center gap-1.5 font-mono text-sm font-semibold text-foreground">
          {repo.name}
          <ArrowUpRight className="size-3.5 text-muted-foreground transition-colors group-hover:text-primary" aria-hidden="true" />
        </h3>
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${statusStyles[repo.status]}`}>
          {repo.status}
        </span>
      </div>

      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
        {repo.description}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {repo.topics.map((topic) => (
          <span
            key={topic}
            className="rounded-md bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-secondary-foreground"
          >
            {topic}
          </span>
        ))}
      </div>

      <div className="mt-3.5 flex items-center gap-4 border-t border-border/60 pt-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span
            className="size-2.5 rounded-full"
            style={{ backgroundColor: repo.languageColor }}
            aria-hidden="true"
          />
          {repo.language}
        </span>
        <span className="flex items-center gap-1">
          <Star className="size-3.5" aria-hidden="true" />
          {repo.stars}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="size-3.5" aria-hidden="true" />
          {repo.forks}
        </span>
      </div>
    </a>
  )
}

export function ProjectsView() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Projects</h2>
          <p className="text-sm text-muted-foreground">
            Every repo is a chapter of the self-taught journey — pulled straight from GitHub.
          </p>
        </div>
        <span className="rounded-full border border-border/70 bg-card/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          {repos.length} public repositories
        </span>
      </div>

      <div className="mt-5 flex flex-1 items-center">
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo) => (
            <RepoCard key={repo.name} repo={repo} />
          ))}
        </div>
      </div>
    </div>
  )
}
