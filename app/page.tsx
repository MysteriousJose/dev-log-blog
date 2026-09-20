import { DevApp } from "@/components/dev-app"
import { loadGitHubData } from "@/lib/github"

export default async function Page() {
  const data = await loadGitHubData()
  return <DevApp initialData={data} />
}
