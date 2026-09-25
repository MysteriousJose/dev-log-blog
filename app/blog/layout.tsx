import { loadGitHubData } from "@/lib/github"
import { AppHeader } from "@/components/app-header"

export default async function BlogLayout({ children }: { children: React.ReactNode }) {
  const data = await loadGitHubData()

  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      {/* Ambient pastel background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 -top-24 size-96 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-32 -right-16 size-96 rounded-full bg-accent/40 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.4]" style={{
          backgroundImage: "radial-gradient(oklch(0.62 0.16 5 / 0.08) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }} />
      </div>

      <AppHeader active="blog" profile={data.profile} />

      <main className="mx-auto w-full max-w-prose px-6 pb-24 pt-10">
        {children}
      </main>
    </div>
  )
}