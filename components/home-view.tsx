"use client"

import { ArrowRight, BookOpen, Sparkles, GitCommitVertical } from "lucide-react"
import { stats, learning, posts } from "./dev-data"
import type { View } from "./app-header"

export function HomeView({ onNavigate }: { onNavigate: (view: View) => void }) {
  return (
    <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Left: hero */}
      <section className="flex flex-col justify-center lg:col-span-7">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border/70 bg-card/70 px-3 py-1 text-xs font-medium text-secondary-foreground backdrop-blur">
          <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
          Self-taught developer · learning in public
        </span>

        <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl xl:text-6xl">
          Learning to build,{" "}
          <span className="text-primary">one commit</span> at a time.
        </h1>

        <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
          No CS degree, no shortcuts — just a public build log of the projects, mistakes, and small
          wins along the way. Follow the progress and read the notes behind every repo.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate("projects")}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5"
          >
            View projects
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
          <a
            href="#latest"
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur transition-colors hover:bg-accent"
          >
            <BookOpen className="size-4" aria-hidden="true" />
            Read the blog
          </a>
        </div>

        <dl className="mt-9 grid max-w-md grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="text-xs text-muted-foreground">{stat.label}</dt>
              <dd className="mt-0.5 text-2xl font-semibold tracking-tight text-foreground">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Right: progress + latest */}
      <section className="flex flex-col gap-4 lg:col-span-5 lg:justify-center">
        <div className="rounded-2xl border border-border/70 bg-card/80 p-5 shadow-sm backdrop-blur">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Currently learning</h2>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <GitCommitVertical className="size-3.5 text-primary" aria-hidden="true" />
              updated daily
            </span>
          </div>
          <ul className="mt-4 space-y-3.5">
            {learning.map((item) => (
              <li key={item.skill}>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground">{item.skill}</span>
                  <span className="text-muted-foreground">{item.level}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${item.level}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div id="latest" className="rounded-2xl border border-border/70 bg-card/80 p-5 shadow-sm backdrop-blur">
          <h2 className="text-sm font-semibold text-foreground">Latest writing</h2>
          <ul className="mt-3 divide-y divide-border/60">
            {posts.map((post) => (
              <li key={post.title}>
                <a
                  href="#"
                  className="group flex items-start gap-3 py-2.5 first:pt-0 last:pb-0"
                >
                  <span className="mt-0.5 rounded-md bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground">
                    {post.tag}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="line-clamp-1 text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                      {post.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {post.date} · {post.readingTime} read
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
