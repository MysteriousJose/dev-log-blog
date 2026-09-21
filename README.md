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
- `GITHUB_TOKEN` — optional GitHub personal access token. Raises the API rate limit and unlocks the yearly contribution graph. Leave it blank to fetch public data only.

To run locally, copy the template to `.env` and fill in the values:

```sh
cp .env.example .env
```

`.env` is gitignored, so real values are never committed. When deploying to Vercel, add `GITHUB_TOKEN` and `GITHUB_USERNAME` as environment variables in the project settings instead.

## Built with Local AI and Personal Development

Hosting with Vercel makes changing anything as simple as pushing to 'main'.
Beta and undertesting changes go through development where they are tested localy before being delopyed.

## Learn More 

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

