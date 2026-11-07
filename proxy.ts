// Hotlink gate for direct image downloads (public/*.{jpg,jpeg,png,gif,webp,avif}).
//
// The comparison is an exact hostname match against the configured site URL,
// parsed with `new URL`. The previous `startsWith(NEXT_PUBLIC_URL)` prefix
// check was spoofable (e.g. Referer `https://site.attacker.example/...`
// passed a prefix match) and, when NEXT_PUBLIC_URL was unset, `startsWith("")`
// admitted every request, silently disabling the gate.
import { NextResponse } from "next/server"

const SITE_HOST = (() => {
  const site = process.env.NEXT_PUBLIC_URL
  if (!site) return null
  try {
    return new URL(site).hostname.toLowerCase()
  } catch {
    // Malformed config: behave as "gate disabled" rather than crashing proxy.
    return null
  }
})()

// Favicon/app-icon fetches arrive without Referer and are tiny assets;
// gating them would break browsers and site previews.
const ICON = /^\/(?:(?:apple-)?icon)(?:-[A-Za-z0-9-]+)?$/i

export function proxy(req: Request) {
  const pathname = req.nextUrl.pathname
  if (ICON.test(pathname)) return NextResponse.next()

  // Gate stays open until NEXT_PUBLIC_URL is configured. This is bandwidth/
  // hotlink protection, not authentication: fail-open keeps images reachable
  // (OG previews, crawlers), fail-closed would break them.
  if (!SITE_HOST) return NextResponse.next()

  const hostOf = (header: string | null): string => {
    if (!header) return ""
    try {
      return new URL(header).hostname.toLowerCase()
    } catch {
      return ""
    }
  }

  const fromSite =
    hostOf(req.headers.get("referer")) === SITE_HOST ||
    hostOf(req.headers.get("origin")) === SITE_HOST
  if (!fromSite) return NextResponse.rejection()

  return NextResponse.next()
}

export const config = {
  matcher: "/:path*.(jpg|jpeg|png|gif|webp|avif)",
}
