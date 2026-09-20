"use client"

import { cn } from "@/lib/utils"
import type { View } from "./store-app"

const steps: { key: View; label: string }[] = [
  { key: "landing", label: "Home" },
  { key: "product", label: "Product" },
  { key: "checkout", label: "Checkout" },
]

export function SiteHeader({
  view,
  onNavigate,
}: {
  view: View
  onNavigate: (v: View) => void
}) {
  const activeIndex = steps.findIndex((s) => s.key === view || (view === "success" && s.key === "checkout"))

  return (
    <header className="flex items-center justify-between px-6 py-4 md:px-10">
      <button
        onClick={() => onNavigate("landing")}
        className="flex items-center gap-2 text-left"
        aria-label="Lumi home"
      >
        <span className="grid size-8 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="5" fill="currentColor" />
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
          </svg>
        </span>
        <span className="text-lg font-semibold tracking-tight">Lumi</span>
      </button>

      <nav aria-label="Steps" className="hidden items-center gap-1 rounded-full border border-border bg-card/60 p-1 backdrop-blur sm:flex">
        {steps.map((step, i) => {
          const active = i === activeIndex
          return (
            <button
              key={step.key}
              onClick={() => onNavigate(step.key)}
              aria-current={active ? "step" : undefined}
              className={cn(
                "flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                active ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span
                className={cn(
                  "grid size-4 place-items-center rounded-full text-[10px] font-semibold",
                  active ? "bg-primary-foreground/20" : "bg-accent text-accent-foreground",
                )}
              >
                {i + 1}
              </span>
              {step.label}
            </button>
          )
        })}
      </nav>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3 10h18" stroke="currentColor" strokeWidth="1.6" />
        </svg>
        <span className="hidden md:inline">Secure checkout</span>
      </div>
    </header>
  )
}
