"use client"

import { GitBranch } from "lucide-react"
import type { Profile } from "@/lib/github"

export type View = "home" | "projects"

const views: { id: View; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
]

export function AppHeader({
  active,
  onChange,
  profile,
}: {
  active: View
  onChange: (view: View) => void
  profile: Profile
}) {
  const displayName = profile.name === profile.login ? "" : profile.name
  return (
    <header className="flex items-center justify-between gap-4 px-6 py-4 sm:px-10">
      <div className="flex items-center gap-2.5">
        <img
          src={profile.avatarUrl}
          alt=""
          className="size-8 rounded-lg object-cover shadow-sm"
        />
        <div className="leading-tight">
          <p className="text-sm font-semibold tracking-tight text-foreground">
            {displayName || profile.login}
          </p>
          <p className="text-[11px] text-muted-foreground">@{profile.login}</p>
        </div>
      </div>

      <nav
        aria-label="Primary"
        className="flex items-center gap-1 rounded-full border border-border/70 bg-card/70 p-1 backdrop-blur"
      >
        {views.map((view) => {
          const isActive = view.id === active
          return (
            <button
              key={view.id}
              type="button"
              onClick={() => onChange(view.id)}
              aria-current={isActive ? "page" : undefined}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {view.label}
            </button>
          )
        })}
      </nav>

      <a
        href={profile.url}
        target="_blank"
        rel="noreferrer"
        className="hidden items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 py-1.5 text-sm font-medium text-foreground backdrop-blur transition-colors hover:bg-accent sm:inline-flex"
      >
        <GitBranch className="size-4" aria-hidden="true" />
        Follow
      </a>
    </header>
  )
}
