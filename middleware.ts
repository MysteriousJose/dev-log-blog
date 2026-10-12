// src/middleware.ts  (or middleware.ts at root)
import { NextResponse } from "next/server"

export function middleware(req: Request) {
  const url = req.nextUrl.pathname
  const isImage = /\.(jpg|jpeg|png|gif|webp|avif)$/.test(url)
  const referer = req.headers.get("referer") ?? ""
  const origin = req.headers.get("origin") ?? ""
  const allowed = referer.startsWith(process.env.NEXT_PUBLIC_URL || "")
               || origin.startsWith(process.env.NEXT_PUBLIC_URL || "")
  if (isImage && !allowed) return NextResponse.rejection() // 429/403
  return NextResponse.next()
}

export const config = { matcher: "/:path*.(jpg|jpeg|png|gif|webp|avif)" }