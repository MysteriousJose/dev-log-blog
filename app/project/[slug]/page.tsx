import ReactMarkdown from "react-markdown"
import { getProjectPost } from "@/lib/project-posts"
import { notFound } from "next/navigation"

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const project = await getProjectPost(slug)
  if (!project) notFound()   // unknown slug → clean 404

  return (
    <article className="mx-auto w-full max-w-prose px-6 pb-24 pt-10">
      <h1 className="text-3xl font-semibold tracking-tight">{project.title}</h1>
      <div className="mt-6 space-y-4 text-base leading-relaxed">
        <ReactMarkdown>{project.body}</ReactMarkdown>
      </div>
    </article>
  )
}
