"use client"

import { useState } from "react"
import { AppHeader, type View } from "./app-header"
import { HomeView } from "./home-view"
import { ProjectsView } from "./projects-view"

export function DevApp() {
  const [view, setView] = useState<View>("home")

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-background text-foreground">
      {/* Ambient pastel background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -left-24 -top-24 size-96 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-32 -right-16 size-96 rounded-full bg-accent/40 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "radial-gradient(oklch(0.62 0.16 5 / 0.08) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
      </div>

      <AppHeader active={view} onChange={setView} />

      <main className="flex min-h-0 flex-1 flex-col px-6 pb-8 pt-2 sm:px-10">
        <div className="min-h-0 flex-1">
          {view === "home" ? <HomeView onNavigate={setView} /> : <ProjectsView />}
        </div>
      </main>
    </div>
  )
}
