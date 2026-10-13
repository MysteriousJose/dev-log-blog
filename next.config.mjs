/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const securityHeaders = [
  // Lock down everything the app does not explicitly allow below.
  {
    key: "Content-Security-Policy",
    value: [
      // App runtime: self-bundled JS, Vercel analytics, and Next's inline
      // hydration scripts + inline styles. No user-controlled HTML is ever
      // rendered on the client, so no nonce is required.
      "default-src 'self'",
      // Dev needs 'unsafe-eval' for React's dev runtime (source maps, Fast
      // Refresh); production React never calls eval, so it stays unlisted.
      isProd
        ? "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com"
        : "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
      // Pervasive `style={{...}}` objects + Next's inlined global CSS.
      "style-src 'self' 'unsafe-inline'",
      // Local assets, GitHub avatar CDN, and github.com fallbacks.
      "img-src 'self' data: https://avatars.githubusercontent.com https://github.com",
      // Server-side fetches to the GitHub API (also guards browser fetches).
      "connect-src 'self' https://api.github.com",
      "font-src 'self'",
      // No framing (also reinforced by X-Frame-Options below).
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
  // Serve only over HTTPS once cached (Vercel terminates TLS).
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  // Never let the browser MIME-sniff a response into a script/document.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Clickjacking: this is a leaf page, never embedded in a frame.
  { key: "X-Frame-Options", value: "DENY" },
  // Only send the full URL to same-origin navigations.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Camera/mic/geolocation are unnecessary for this site.
  {
    key: "Permissions-Policy",
    value: "geolocation=(), microphone=(), camera=()",
  },
  // Isolate this top-level document from any cross-origin embedders.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
]

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Allowlist quality values so quality={65}/quality={80} actually take effect
    // instead of silently falling back to the default q=75 (Next's
    // images.qualities defaults to [75] and warns otherwise).
    qualities: [65, 75, 80],
  },
  // Applied by the dev and production servers alike (see the dev-only 'unsafe-eval'
  // above); declared as a config-field function (the form Next 16 expects) so they
  // are picked up reliably regardless of module interop quirks.
  headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
