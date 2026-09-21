"use client"

import { GitCommitVertical } from "lucide-react"
import { formatCount } from "@/lib/github"
import type { ContributionCalendar } from "@/lib/github"

// GitHub's five-level contribution color scale.
const LEVELS = [
  { max: 0, color: "#ebebeb", label: "No contributions" },
  { max: 3, color: "#9be3a8", label: "Few" },
  { max: 8, color: "#40c457", label: "Moderate" },
  { max: 14, color: "#30a14e", label: "Many" },
  { max: Infinity, color: "#216e39", label: "Very active" },
] as const

export function ContributionGraph({ calendar }: { calendar: ContributionCalendar }) {
  const total = calendar.totalContributions
  return (
    <div className="rounded-2xl border border-border/70 bg-card/80 p-5 shadow-sm backdrop-blur">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <GitCommitVertical className="size-4 text-primary" aria-hidden="true" />
          <h2 className="text-sm font-semibold text-foreground">Contribution activity</h2>
        </div>
        <span className="rounded-full border border-border/70 bg-card/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
          {formatCount(total)} this year
        </span>
      </div>

      <div
        className="mt-4 gap-[3px] overflow-x-auto rounded-lg bg-card/40 p-3 [-webkit-scrollbar-height:4px]"
        role="img"
        aria-label={`Contribution calendar: ${formatCount(total)} contributions over the past year`}
      >
        <div className="flex w-min gap-[3px]">
          {calendar.weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[3px]" aria-hidden="true">
              {week.days.map((day) => (
                <div
                  key={day.date}
                  className="size-3 rounded-[2px]"
                  style={{ backgroundColor: LEVELS.find((level) => day.count <= level.max)!.color }}
                  title={
                    day.count === 0
                      ? `No contributions on ${day.date}`
                      : `${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`
                  }
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-end gap-1 text-[10px] text-muted-foreground">
        <span>Less</span>
        {LEVELS.map((level) => (
          <span
            key={level.label}
            className="size-2.5 rounded-[2px]"
            style={{ backgroundColor: level.color }}
            aria-hidden="true"
            title={level.label}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  )
}
