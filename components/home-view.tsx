"use client"

import { ArrowRight, GitCommitVertical, ExternalLink } from "lucide-react"
import type { GitHubData } from "@/lib/github"
import { formatCount, relativeTime } from "@/lib/github"
import type { View } from "./app-header"
import { ContributionGraph } from "./contribution-graph"

export function HomeView({
  data,
  onNavigate,
}: {
  data: GitHubData
  onNavigate: (view: View) => void
}) {
  const { profile } = data

  return (
    <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Left: hero */}
      <section className="flex flex-col justify-center lg:col-span-7">
        {profile.location ? (
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border/70 bg-card/70 px-3 py-1 text-xs font-medium text-secondary-foreground backdrop-blur">
            {profile.location}
          </span>
        ) : (
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border/70 bg-card/70 px-3 py-1 text-xs font-medium text-secondary-foreground backdrop-blur">
            @{profile.login}
          </span>
        )}

        <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl xl:text-6xl">
          Building in public,{" "}
          <span className="text-primary">one commit</span> at a time.
        </h1>

        <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
          {profile.bio || "Sharing what I'm building and learning, in public."}
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate("projects")}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5"
          >
            View Repositories
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
          <a
            href={profile.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur transition-colors hover:bg-accent"
          >
            <ExternalLink className="size-4" aria-hidden="true" />
            Follow on GitHub
          </a>
        </div>

        <dl className="mt-9 grid max-w-md grid-cols-3 gap-4">
          <div>
            <dt className="text-xs text-muted-foreground">Repositories</dt>
            <dd className="mt-0.5 text-2xl font-semibold tracking-tight text-foreground">
              {formatCount(profile.publicRepos)}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Followers</dt>
            <dd className="mt-0.5 text-2xl font-semibold tracking-tight text-foreground">
              {formatCount(profile.followers)}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Active since</dt>
            <dd className="mt-0.5 text-2xl font-semibold tracking-tight text-foreground">
              {profile.joinedYear}
            </dd>
          </div>
        </dl>
      </section>

      {/* Right: recent activity */}
      <section className="flex flex-col gap-4 lg:col-span-5 lg:justify-center">
        {data.contributions && (
          <ContributionGraph calendar={data.contributions.calendar} />
        )}
        <div className="rounded-2xl border border-border/70 bg-card/80 p-5 shadow-sm backdrop-blur">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Recent activity</h2>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <GitCommitVertical className="size-3.5 text-primary" aria-hidden="true" />
              from GitHub
            </span>
          </div>
          <ul className="mt-4 space-y-3">
            {data.recentActivity.map((item) => (
              <li key={item.name}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-secondary"
                >
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1.5">
                      <span className="line-clamp-1 font-mono text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                        {item.name}
                      </span>
                      {item.status === "Archived" && (
                        <span className="rounded bg-muted px-1.5 text-[9px] font-medium text-muted-foreground">
                          Archived
                        </span>
                      )}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.language || "Unknown"} · {relativeTime(item.pushedAt)}
                    </span>
                  </span>
                  <ExternalLink className="size-3.5 text-muted-foreground transition-colors group-hover:text-primary" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
