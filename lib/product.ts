export const product = {
  name: "Lumi Pods",
  tagline: "Sound, refined.",
  price: 149,
  compareAt: 199,
  currency: "USD",
  rating: 4.9,
  reviews: 2841,
  image: "/product-earbuds.png",
  blurb:
    "Adaptive noise cancellation, 32-hour battery, and a fit so light you'll forget you're wearing them. Built for deep work and long walks alike.",
  highlights: [
    { label: "Battery", value: "32 hrs" },
    { label: "Latency", value: "38 ms" },
    { label: "Weight", value: "4.1 g" },
    { label: "Rating", value: "IPX5" },
  ],
  features: [
    "Adaptive active noise cancellation",
    "Spatial audio with head tracking",
    "USB-C fast charge — 10 min = 3 hrs",
    "Two-year worry-free warranty",
  ],
} as const

export const money = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n)
