"use client"

import { useEffect, useRef } from "react"

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, summary"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef(0)
  const stateRef = useRef({ x: 0, y: 0, pointer: false, visible: false })

  useEffect(() => {
    // Only take the cursor over on devices that actually have one. Touch and
    // pen devices keep native behaviour.
    if (!window.matchMedia("(pointer: fine)").matches) return

    const el = cursorRef.current
    if (!el) return

    // One write per animation frame, coalescing however many pointer events
    // fired since the last paint. No easing loop: the arrow sits exactly where
    // the pointer is, so it can't trail, stutter, or stall mid-catch-up.
    const draw = () => {
      frameRef.current = 0
      const { x, y, pointer, visible } = stateRef.current
      el.style.opacity = visible ? "1" : "0"
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${
        pointer ? 1.2 : 1
      })`
    }

    const schedule = () => {
      if (frameRef.current) return
      frameRef.current = requestAnimationFrame(draw)
    }

    const handleMove = (e: MouseEvent) => {
      const state = stateRef.current
      state.x = e.clientX
      state.y = e.clientY
      state.visible = true
      const target = e.target as Element | null
      state.pointer = Boolean(target?.closest?.(INTERACTIVE))
      schedule()
    }

    // Hide when the pointer leaves the window or focus moves away, otherwise
    // the arrow is left stranded at the last known position.
    const handleOut = (e: MouseEvent) => {
      if (e.relatedTarget) return
      stateRef.current.visible = false
      schedule()
    }

    const handleHide = () => {
      stateRef.current.visible = false
      schedule()
    }

    window.addEventListener("mousemove", handleMove, { passive: true })
    window.addEventListener("mousedown", handleMove, { passive: true })
    document.addEventListener("mouseout", handleOut)
    window.addEventListener("blur", handleHide)

    return () => {
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("mousedown", handleMove)
      document.removeEventListener("mouseout", handleOut)
      window.removeEventListener("blur", handleHide)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      aria-hidden
      // z-[60] keeps this above the grain overlay (z-50). Underneath it, the
      // overlay's mix-blend-mode made every cursor move repaint the whole
      // blended screen instead of just recompositing this layer.
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden opacity-0 transition-opacity duration-200 will-change-transform md:block"
      style={{ contain: "layout style paint" }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"
          fill="#FFB6C1"
          stroke="#FFB6C1"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
