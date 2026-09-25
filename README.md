# dev-log-blog

This is a [Next.js](https://nextjs.org) website hosted by Vercel(https://vercel.com), developed by me and local AI. 
I will be using it to driplay my projects and activiy aswell as semifrequent blogs.

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
- Each **artwork** is a markdown file in `./artworks/`. Its frontmatter links it to an artist by `slug`.

### Add an artwork

1. Drop a new `.md` file in `./artworks/`.
2. Fill in the frontmatter:

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

## Built with Local AI and Personal Development

Hosting with Vercel makes changing anything as simple as pushing to 'main'.
Beta and undertesting changes go through development where they are tested localy before being delopyed.

## Learn More 

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

