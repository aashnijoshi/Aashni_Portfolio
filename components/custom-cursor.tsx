"use client"

import { useEffect, useRef, useCallback } from "react"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const positionRef = useRef({ x: 0, y: 0 })
  const targetPositionRef = useRef({ x: 0, y: 0 })
  const isPointerRef = useRef(false)
  const isMovingRef = useRef(false)
  const animationFrameId = useRef<number>(0)

  const updateCursor = useCallback(() => {
    const dx = targetPositionRef.current.x - positionRef.current.x
    const dy = targetPositionRef.current.y - positionRef.current.y

    // Stop the loop when close enough to target
    if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
      positionRef.current.x = targetPositionRef.current.x
      positionRef.current.y = targetPositionRef.current.y
      if (cursorRef.current) {
        const scale = isPointerRef.current ? 1.2 : 1
        cursorRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%) scale(${scale})`
      }
      isMovingRef.current = false
      return
    }

    positionRef.current.x += dx * 0.5
    positionRef.current.y += dy * 0.5

    if (cursorRef.current) {
      const scale = isPointerRef.current ? 1.2 : 1
      cursorRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%) scale(${scale})`
    }

    animationFrameId.current = requestAnimationFrame(updateCursor)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPositionRef.current = { x: e.clientX, y: e.clientY }

      // Use tagName check instead of expensive getComputedStyle
      const target = e.target as HTMLElement
      const tag = target.tagName
      isPointerRef.current =
        tag === "BUTTON" || tag === "A" || target.closest("button") !== null || target.closest("a") !== null

      // Only start animation loop if not already running
      if (!isMovingRef.current) {
        isMovingRef.current = true
        animationFrameId.current = requestAnimationFrame(updateCursor)
      }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId.current)
    }
  }, [updateCursor])

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-50 hidden will-change-transform md:block"
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
    </>
  )
}
