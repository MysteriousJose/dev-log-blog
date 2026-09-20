"use client"

import { useState } from "react"
import { SiteHeader } from "./site-header"
import { LandingView } from "./landing-view"
import { ProductView } from "./product-view"
import { CheckoutView } from "./checkout-view"
import { SuccessView } from "./success-view"

export type View = "landing" | "product" | "checkout" | "success"

export function StoreApp() {
  const [view, setView] = useState<View>("landing")

  return (
    <main className="flex h-dvh flex-col overflow-hidden bg-background text-foreground">
      <SiteHeader view={view} onNavigate={setView} />
      <div className="min-h-0 flex-1 px-6 pb-6 md:px-10 md:pb-10">
        <div key={view} className="mx-auto h-full w-full max-w-6xl animate-in fade-in slide-in-from-bottom-2 duration-500">
          {view === "landing" && <LandingView onNavigate={setView} />}
          {view === "product" && <ProductView onNavigate={setView} />}
          {view === "checkout" && <CheckoutView onNavigate={setView} />}
          {view === "success" && <SuccessView onNavigate={setView} />}
        </div>
      </div>
    </main>
  )
}
