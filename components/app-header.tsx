"use client"

import { GitBranch } from "lucide-react"
import type { Profile } from "@/lib/github"

import Link from "next/link"

export type View = "home" | "projects" | "blog" | "art"

const views: { id: View; label: string; href: string }[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "projects", label: "Repositories", href: "/projects" },
  { id: "blog", label: "Blog", href: "/blog" },
  { id: "art", label: "Art", href: "/art" },
]

export function AppHeader({
  active,
  onChange,
  profile,
}: {
  active: View
  onChange?: (view: View) => void
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
        className="flex items-center gap-1 flex-1 min-w-0 overflow-x-auto flex-shrink-0 sm:flex-none sm:overflow-visible [-webkit-scrollbar:hidden] [scrollbar-width:none] rounded-full border border-border/70 bg-card/70 p-1 backdrop-blur"
      >
          {views.map((view) => {
            const isActive = view.id === active
            const base =
              "flex-shrink-0 whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors " +
              (isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-accent")

            // Standalone use (no onChange): every item is a real navigation link.
            if (!onChange) {
              return (
                <Link
                  key={view.id}
                  href={view.href}
                  aria-current={isActive ? "page" : undefined}
                  className={base}
                >
                  {view.label}
                </Link>
              )
            }

            // App shell: Blog & Art are standalone pages (real routes); Home /
            // Repositories are local tabs inside this single-page shell.
            return (view.id === "blog" || view.id === "art") ? (
              <Link
                key={view.id}
                href={view.href}
                aria-current={isActive ? "page" : undefined}
                className={base}
              >
                {view.label}
              </Link>
            ) : (
              <button
                key={view.id}
                type="button"
                onClick={() => onChange(view.id)}
                aria-current={isActive ? "page" : undefined}
                className={base}
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
