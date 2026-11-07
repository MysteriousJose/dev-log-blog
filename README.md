# dev-log-blog

This is a [Next.js](https://nextjs.org) website hosted by Vercel(https://vercel.com), developed by me with assistance from my local AI. 
I will be using it to display my projects and activity as well as semi-frequent blogs.

## Getting Started

Clone the repository and install dependencies (the project uses pnpm):

```sh
pnpm install
```

Start the development server:

```sh
pnpm dev
```

Then open http://localhost:3000. To build for production and serve it locally, run `pnpm build` followed by `pnpm start`.

### Environment variables

The site reads its configuration from environment variables listed in `.env.example`:

- `GITHUB_USERNAME` — GitHub account to display (optional; falls back to `MysteriousJose` in the source).
- `GITHUB_TOKEN` — optional GitHub personal access token. Raises the API rate limit and unlocks the yearly contribution graph. Leave it blank to fetch public data only. The contribution graph renders as one of three states: the graph itself (token works), a prompt to set `GITHUB_TOKEN` (no token configured), or an error message (token present but the graph couldn't be fetched).

To run locally, copy the template to `.env` and fill in the values:

```sh
cp .env.example .env
```

`.env` is gitignored, so real values are never committed. When deploying to Vercel, add `GITHUB_TOKEN` and `GITHUB_USERNAME` as environment variables in the project settings instead.

## Art Gallery

The `/art` section shows galleries of artwork by different people. It is **separate from the blog**: blog posts live in `./posts`, artwork lives in `./artworks`.

### How it works

```sh
art/                    # markdown files, one per artwork
  bay-sunset.md          #  artist: jordan  title: ...  date: ...
  night-market.md        #  artist: jordan
artworks/...
```

- Each **artist** is a row in the `ARTISTS` list in [`lib/artists.ts`](lib/artists.ts). Edit `slug`, `name`, `username`, `about`, `avatarUrl`, `socialUrl` there.
- Each **artwork** is a markdown file in `./artworks/`. Its front matter links it to an artist by `slug`.

### Add an artwork

1. Drop a new `.md` file in `./artworks/`.
2. Fill in the front matter:

```md
---
artist: jordan        # must match a slug in lib/artists.ts
title: Sunset over the bay
date: 2026-08-01
image: /placeholder.svg       # optional; omit for a blank placeholder
medium: Digital               # optional
excerpt: A soft study of light on water.  # optional one-line summary
---

Write a few sentences about this piece here. Markdown is supported.
```

3. Restart `pnpm dev`; the piece appears on the artist's gallery automatically.

## Project Blog (Top Banner)

A banner across the top of every page points to a **hidden** blog about your
current project. It shows on every page and is the only way to reach it — it is
not linked from the nav and does not appear in the `/blog` listing.

### How it works

```sh
lib/active-project.ts        # the one file you edit: banner name + URL slug
project-posts/<slug>.md      # the hidden write-up (Markdown, like a blog post)
app/project/[slug]/page.tsx  # renders it at /project/<slug>
```

- Set the banner text and target in [`lib/active-project.ts`](lib/active-project.ts). Edit `name` (what shows on the banner) and `slug` (the URL, and the filename under `project-posts/`). Set the export to `null` to hide the banner entirely.
- Each project write-up is a Markdown file in `./project-posts/`. It renders the same way as a blog post (headings, lists, code blocks) but stays out of the main `/blog` listing.

### Change the active project

1. Edit `name` and `slug` in [`lib/active-project.ts`](lib/active-project.ts).
2. Replace `./project-posts/<slug>.md` with your own write-up (a starter is included). A template lives at [`templates/project-template.md`](templates/project-template.md).
3. Restart `pnpm dev`.

```md
---
title: My Project
date: 2026-10-31
---

Write the story of this project here. Markdown is supported.
```

## Built with Local AI and Personal Development

Hosting with Vercel makes changing anything as simple as pushing to 'main'.
Beta and under-testing changes go through development where they are tested locally before being deployed.

## Learn More 

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

