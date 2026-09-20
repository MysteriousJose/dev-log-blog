"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { money, product } from "@/lib/product"
import type { View } from "./store-app"

const shipping = 0
const tax = Math.round(product.price * 0.08)

function Field({
  label,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input
        {...props}
        className="h-10 rounded-xl border border-input bg-card px-3 text-sm outline-none transition-shadow placeholder:text-muted-foreground/60 focus:border-ring focus:ring-2 focus:ring-ring/30"
      />
    </label>
  )
}

export function CheckoutView({ onNavigate }: { onNavigate: (v: View) => void }) {
  const [card, setCard] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvc, setCvc] = useState("")

  const total = product.price + shipping + tax

  const onCard = (v: string) =>
    setCard(
      v
        .replace(/\D/g, "")
        .slice(0, 16)
        .replace(/(.{4})/g, "$1 ")
        .trim(),
    )

  const onExpiry = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 4)
    setExpiry(digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits)
  }

  return (
    <div className="grid h-full grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
      {/* Order summary */}
      <aside className="flex flex-col gap-4 rounded-[1.75rem] border border-border bg-card p-6 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Order summary</h2>
        <div className="flex items-center gap-4">
          <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl border border-border bg-secondary">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" sizes="64px" />
          </div>
          <div className="min-w-0">
            <p className="font-semibold">{product.name}</p>
            <p className="truncate text-sm text-muted-foreground">{product.tagline} · Qty 1</p>
          </div>
          <span className="ml-auto font-semibold">{money(product.price)}</span>
        </div>

        <dl className="flex flex-col gap-2 border-t border-border pt-4 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <dt>Subtotal</dt>
            <dd>{money(product.price)}</dd>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <dt>Shipping</dt>
            <dd className="text-primary">Free</dd>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <dt>Tax</dt>
            <dd>{money(tax)}</dd>
          </div>
          <div className="mt-1 flex justify-between border-t border-border pt-3 text-base font-semibold text-foreground">
            <dt>Total</dt>
            <dd>{money(total)}</dd>
          </div>
        </dl>

        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.6" />
            <path d="M8 11V8a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          Encrypted and secure. You won&apos;t be charged in this demo.
        </p>
      </aside>

      {/* Payment form */}
      <form
        className="flex flex-col gap-3"
        onSubmit={(e) => {
          e.preventDefault()
          onNavigate("success")
        }}
      >
        <h2 className="text-2xl font-semibold tracking-tight">Checkout</h2>

        <Field label="Email" type="email" required placeholder="you@example.com" autoComplete="email" />
        <Field label="Name on card" required placeholder="Alex Rivera" autoComplete="cc-name" />
        <Field
          label="Card number"
          required
          inputMode="numeric"
          placeholder="4242 4242 4242 4242"
          value={card}
          onChange={(e) => onCard(e.target.value)}
        />
        <div className="grid grid-cols-2 gap-3">
          <Field
            label="Expiry"
            required
            inputMode="numeric"
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => onExpiry(e.target.value)}
          />
          <Field
            label="CVC"
            required
            inputMode="numeric"
            placeholder="123"
            value={cvc}
            onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
          />
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-3">
          <Button type="submit" size="lg" className="rounded-full px-7">
            Pay {money(total)}
          </Button>
          <Button
            type="button"
            size="lg"
            variant="outline"
            className="rounded-full border-border bg-card px-6"
            onClick={() => onNavigate("product")}
          >
            Back
          </Button>
        </div>
      </form>
    </div>
  )
}
