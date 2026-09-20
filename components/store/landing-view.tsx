"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { money, product } from "@/lib/product"
import type { View } from "./store-app"

export function LandingView({ onNavigate }: { onNavigate: (v: View) => void }) {
  return (
    <div className="grid h-full grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-10">
      <div className="flex flex-col items-start gap-5">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-secondary-foreground">
          <span className="size-1.5 rounded-full bg-primary" />
          New — Lumi Pods, Gen 3
        </span>

        <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl xl:text-6xl">
          Sound that gets{" "}
          <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">out of your way</span>
        </h1>

        <p className="max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
          {product.blurb}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Button size="lg" className="rounded-full px-6" onClick={() => onNavigate("product")}>
            Explore Lumi Pods
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-border bg-card px-6"
            onClick={() => onNavigate("checkout")}
          >
            Buy now — {money(product.price)}
          </Button>
        </div>

        <dl className="mt-2 grid grid-cols-3 gap-6 border-t border-border pt-5">
          {product.highlights.slice(0, 3).map((h) => (
            <div key={h.label}>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">{h.label}</dt>
              <dd className="text-xl font-semibold tracking-tight">{h.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="relative flex h-full min-h-0 items-center justify-center">
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="size-[80%] rounded-full bg-gradient-to-br from-accent to-secondary blur-2xl" />
        </div>
        <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl shadow-primary/5">
          <Image
            src={product.image || "/placeholder.svg"}
            alt="Lumi Pods wireless earbuds in their charging case"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 90vw, 40vw"
          />
          <div className="absolute bottom-4 left-4 rounded-2xl border border-border bg-card/80 px-4 py-2 backdrop-blur">
            <p className="text-xs text-muted-foreground">Rated {product.rating} / 5</p>
            <p className="text-sm font-semibold">{product.reviews.toLocaleString()} reviews</p>
          </div>
        </div>
      </div>
    </div>
  )
}
