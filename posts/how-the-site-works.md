---
title: How This Site Works: From Markdown to a Live Page
date: 2026-09-29
excerpt: A look under the hood of this dev-log — the rendering pipeline, routing, styling, and the live GitHub layer that powers it, all built with Next.js and Bun.
---

In the last log I proved the engine renders Markdown. This one takes the engine
apart and points at each part. If you've ever wondered "how does a file in a folder
become a styled page on the internet," this is the short version.

## The shape of the site

Nothing here runs a database or a server you ssh into. The site is generated from
plain text files and a public API. At build time (and, on the dev machine, on every
change) a small set of rules turns:

```
posts/*.md  ──►  metadata + Markdown  ──►  React components  ──►  HTML in your browser
```

The pieces that make that happen:

- **Next.js (App Router)** — routing and rendering. Pages are server components, so
  the file-reading happens on the machine building the site, not in your browser.
- **Bun** — the runtime that runs the build and the dev server.
- **Tailwind CSS** — styling through utility classes, with a palette defined as
  design tokens.
- **react-markdown** — converts each Markdown body into a tree of React elements.

## The content pipeline

Every post is a `.md` file in the `posts/` folder with a small metadata block up
top, then the actual article below it.

```
title: How This Site Works
date: 2026-09-29
excerpt: A look under the hood...
```

Those `key: value` pairs sit between two lines that are just three dashes. The parser
reads that first block as metadata and passes everything after it to the renderer.

When the blog page loads, the site reads every `.md` file, splits that frontmatter
off from the body, and builds a post object:

```ts
// lib/posts.ts (simplified)
export async function getPost(slug: string) {
  const source = await readFile(`posts/${slug}.md`, "utf8")
  const { data, body } = parseFrontmatter(source) // strip "--- ... ---"
  return {
    slug,
    title: data.title,
    date: new Date(data.date),
    excerpt: data.excerpt,
    body,                       // plain Markdown
  }
}
```

The listing page (`/blog`) does the same for all posts, then sorts them newest-first.
That single sort is the whole "featured post" system: index 0 is always the newest,
no matter what you just wrote. So the biggest card on the page is automatic.

## Routing

Routing is just files on disk matching URLs:

- **`/blog`** (`app/blog/page.tsx`) — the listing. Renders the newest post big at the
  top, the rest in a grid.
- **`/blog/[slug]`** (`app/blog/[slug]/page.tsx`) — a *dynamic* route. The `[slug]`
  is filled in from the URL, so `/blog/how-the-site-works` looks for
  `posts/how-the-site-works.md`.
- Unknown slug → `notFound()`, which Next turns into a clean 404. There's no guessing
  or fallback page; a missing post is simply a missing post.

The body then flows through `react-markdown`, which turns headings into `<h2>`, lists
into `<ul>`/`<li>`, fenced code into `<pre><code>`, and inline backticks into `<code>`.
That's the entire rendering pipeline — no template language in between.

## The styling

Styles are Tailwind utility classes with a theme defined once in `globals.css` as
OKLCh color tokens. Light and dark are both expressed in those tokens, and the site
switches based on the browser's color-scheme preference — no manual toggle code.
Bleed-worthy detail: the pastel background blobs and dotted grid are just layered
`<div>`s with `blur`, gradients, and an `image-rendering` trick.

## The live part: GitHub

Most of the site is static Markdown, but the home screen, the repositories page, and
the blog header show *live* data. That comes from a small loader, `lib/github.ts`,
which:

1. Fetches the public profile and repositories for the configured account (unauthenticated).
2. Optionally fetches the yearly contribution calendar (the one metric that needs an
   authenticated token).
3. Normalizes both into types the UI renders.

Two design choices keep it cheap and rate-limit-safe:

- **Caching** — every upstream `fetch` sets `next.revalidate`, so Next caches the
  response and only re-fetches on a timer, not on every visit.
- **Server-only secrets** — the authenticated token, if configured, lives only on the
  server during the build. It is never bundled into the browser, never exposed in
  page source, and only used for the one metric that requires it.

## Keeping it simple (and safe)

A personal dev-log doesn't need much hardening, but a couple of habits pay off:

- **Input is bounded.** The dynamic slug comes from the URL, so it's a value, not
  trusted code. File reads are confined to the `posts/` directory, and anything that
  doesn't resolve cleanly is rejected before it's ever opened — unknown paths become
  a 404, not a crash or an escape.
- **No secrets in the browser.** Data that must stay server-side (auth tokens,
  personal metrics) never leaves the build. The client only ever receives rendered
  HTML and public data.
- **Fail loud, fail closed.** A missing post, an empty cache, or an upstream error
  yields a 404 or a cached response — never a stack trace leaked to the visitor.

That's the whole machine. Write Markdown, it gets parsed, sorted, routed, and styled
into a page. The only thing reaching out to the internet is public GitHub data.
