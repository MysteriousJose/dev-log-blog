---
title: Hello, Tech World: The First Log
date: 2026-09-29
excerpt: An introduction to this dev-log, what to expect, and the tech stack powering this site.
---

This is the first log. Every project needs a "Hello World" — usually a throwaway
scratch file you delete before anyone sees it. This is not that. It's the first
entry of a dev-log, and it doubles as proof that the engine that renders it actually works.

## Why I'm building this

Writing in public is annoyingly easy to skip when nothing is finished. A log removes
that excuse: an unfinished build is still worth logging, because the *process* is the
product. Here I'll track what I'm building, the bugs that slow me down, and the small
decisions that I later wonder why I made.

No filler, no hype. Build notes, teardowns of things that broke, and the occasional
deep-dive into a piece of tooling that earned its place on my machine.

## Tech Stack

The site you're reading is itself a demo. The content below is plain Markdown; this
section deliberately uses lists, code blocks, and inline code so you can see the
Markdown → HTML pipeline in action.

- **Next.js (App Router)** — routing, server components, and rendering.
- **Bun** — the runtime and package manager running the whole thing.
- **Tailwind CSS** — the styling layer, utility-first, no build-time class generation to argue about.
- **react-markdown** — parses the Markdown posts into real React components at build time.

The pipeline, end to end:

```ts
// lib/posts.ts (simplified)
export async function getPost(slug: string) {
  const source = await readFile(`posts/${slug}.md`, "utf8")
  const { data, body } = parseFrontmatter(source) // --- ... --- split
  return { slug, title: data.title, date: new Date(data.date), body }
}
```

```tsx
// app/blog/[slug]/page.tsx
<ReactMarkdown>{post.body}</ReactMarkdown>
```

Two things happen between committing a `.md` file and it showing up: the frontmatter
is split off into metadata (title, date, excerpt), and the remaining body is turned
into a tree of React components. A list renders as nested `ul`/`li`; a fenced code
block renders as `<pre><code class="language-ts">`; inline code renders as `<code>`.

## What's next

This post exists to prove the plumbing. Once it's live, the log gets real:

- A **projects** section (already wired up, content pending).
- Longer teardown posts — starting with whatever tooling bit me this week.
- A proper way to render syntax-highlighted code blocks without fighting the renderer.

That's it for the first log. Next time, the writing gets denser.
