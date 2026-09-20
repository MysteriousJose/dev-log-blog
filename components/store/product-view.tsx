"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { money, product } from "@/lib/product"
import type { View } from "./store-app"

function Star() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l2.9 6.2 6.6.9-4.8 4.6 1.2 6.6L12 17.8 6.1 20.3l1.2-6.6L2.5 9.1l6.6-.9L12 2z" />
    </svg>
  )
}

export function ProductView({ onNavigate }: { onNavigate: (v: View) => void }) {
  return (
    <div className="grid h-full grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
      <div className="relative flex h-full min-h-0 items-center justify-center">
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="size-[78%] rounded-full bg-gradient-to-br from-accent to-secondary blur-2xl" />
        </div>
        <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl shadow-primary/5">
          <Image
            src={product.image || "/placeholder.svg"}
            alt="Lumi Pods wireless earbuds"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 90vw, 35vw"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-primary" aria-hidden="true">
            <Star /><Star /><Star /><Star /><Star />
          </div>
          <span className="text-sm text-muted-foreground">
            {product.rating} · {product.reviews.toLocaleString()} reviews
          </span>
        </div>

        <div>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{product.name}</h2>
          <p className="mt-1 text-muted-foreground">{product.tagline}</p>
        </div>

        <p className="max-w-lg text-pretty leading-relaxed text-muted-foreground">{product.blurb}</p>

        <ul className="grid max-w-lg grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
          {product.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm">
              <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-foreground/80">{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-1 flex flex-wrap items-center gap-4 border-t border-border pt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight">{money(product.price)}</span>
            <span className="text-sm text-muted-foreground line-through">{money(product.compareAt)}</span>
            <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
              Save {money(product.compareAt - product.price)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Button size="lg" className="rounded-full px-7" onClick={() => onNavigate("checkout")}>
              Buy now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-border bg-card px-6"
              onClick={() => onNavigate("landing")}
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
