"use client"

import { Button } from "@/components/ui/button"
import { money, product } from "@/lib/product"
import type { View } from "./store-app"

export function SuccessView({ onNavigate }: { onNavigate: (v: View) => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
      <div className="grid size-16 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">Order confirmed</h2>
        <p className="mt-2 max-w-sm text-pretty text-muted-foreground">
          Thanks for your order. Your {product.name} for {money(product.price)} are on the way — a receipt is headed to
          your inbox.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button size="lg" className="rounded-full px-7" onClick={() => onNavigate("landing")}>
          Back to home
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="rounded-full border-border bg-card px-6"
          onClick={() => onNavigate("product")}
        >
          View product
        </Button>
      </div>
    </div>
  )
}
