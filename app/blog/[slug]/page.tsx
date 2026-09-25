import ReactMarkdown from "react-markdown"
import { getPost } from "@/lib/posts"
import { notFound } from "next/navigation"

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()   // unknown slug → clean 404

  return (
    <article className="mx-auto w-full max-w-prose px-6 pb-24 pt-10">
      <time className="text-sm text-muted-foreground">
        {post.date.toLocaleDateString()}
      </time>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">{post.title}</h1>
      <div className="mt-6 space-y-4 text-base leading-relaxed">
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </div>
    </article>
  )
}
