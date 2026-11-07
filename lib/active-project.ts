// Source of truth for the "now building" banner shown on every page.
//
//   • name — text shown on the banner (e.g. "Now building: …")
//   • slug — URL path + filename under project-posts/, served at /project/<slug>
//
// Set to `null` to hide the banner entirely.
export const activeProject = {
  name: "Now building: Linux Release of ScorePlus",
  slug: "current-build",
} as const

export type ActiveProject = typeof activeProject
