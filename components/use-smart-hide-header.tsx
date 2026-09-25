"use client"

import { useEffect, useState } from "react"

const THRESHOLD = 90 // pixels from the top before the header hides

export function useSmartHideHeader() {
  const [hidden, setHidden] = useState(false)
  let lastY = 0

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (y > THRESHOLD && y > lastY) {
        setHidden(true)   // scrolled down past the threshold → hide
      } else {
        setHidden(false)  // near top, or scrolling up → show
      }
      lastY = y
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return { hidden }
}