"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Quiet section divider: a small orbital system.
 *   - Two concentric ellipses at different tilts (outer –18°, inner +22°).
 *   - Each has a dot orbiting at its own scroll-linked speed and direction.
 *   - Each dot carries a soft radial glow and a faint radius line back to center.
 *   - Dots also gently pulse via CSS keyframes, offset so they don't beat in sync.
 *
 * Everything stays within foreground-tinted opacities. No bright accents.
 */
export function OrbitalDivider() {
  const ref = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0) // 0 → 1 as divider crosses the viewport

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let raf = 0

    const compute = () => {
      raf = 0
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const total = vh + rect.height
      const traveled = vh - rect.top
      const p = Math.max(0, Math.min(1, traveled / total))
      setProgress(p)
    }

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(compute)
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          compute()
          window.addEventListener("scroll", onScroll, { passive: true })
          window.addEventListener("resize", onScroll, { passive: true })
        } else {
          window.removeEventListener("scroll", onScroll)
          window.removeEventListener("resize", onScroll)
        }
      },
      { rootMargin: "200px 0px" },
    )
    obs.observe(el)

    return () => {
      obs.disconnect()
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // Ring geometry in local (pre-rotation) space — both centered at (0, 0).
  // Outer ring: 88 × 80, tilted −18°, 1.5 revs, clockwise.
  // Inner ring: 56 × 48, tilted +22°, 2.75 revs, counter-clockwise.
  const outer = { rx: 44, ry: 40, tilt: -18, revs: 1.5, dir: 1, offsetDeg: -90 }
  const inner = { rx: 28, ry: 24, tilt: 22, revs: 2.75, dir: -1, offsetDeg: 90 }

  // Local-frame dot position on each ellipse.
  const outerAngle = (outer.offsetDeg + outer.dir * progress * 360 * outer.revs) * (Math.PI / 180)
  const outerDot = { x: outer.rx * Math.cos(outerAngle), y: outer.ry * Math.sin(outerAngle) }

  const innerAngle = (inner.offsetDeg + inner.dir * progress * 360 * inner.revs) * (Math.PI / 180)
  const innerDot = { x: inner.rx * Math.cos(innerAngle), y: inner.ry * Math.sin(innerAngle) }

  const viewBox = 120
  const c = viewBox / 2

  return (
    <div
      ref={ref}
      aria-hidden
      className="relative flex w-full items-center justify-center py-20 md:py-24"
    >
      <svg
        width={viewBox}
        height={viewBox}
        viewBox={`0 0 ${viewBox} ${viewBox}`}
        className="overflow-visible text-foreground"
      >
        <defs>
          <filter id="orbital-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="2.6" />
          </filter>
        </defs>

        <OrbitGroup
          cx={c}
          cy={c}
          tilt={outer.tilt}
          rx={outer.rx}
          ry={outer.ry}
          dot={outerDot}
          ringOpacity={0.32}
          dotOpacity={0.75}
          radiusOpacity={0.14}
          pulseClass="orbital-pulse-a"
          strokeWidth={1.25}
          dotRadius={2.9}
        />
        <OrbitGroup
          cx={c}
          cy={c}
          tilt={inner.tilt}
          rx={inner.rx}
          ry={inner.ry}
          dot={innerDot}
          ringOpacity={0.22}
          dotOpacity={0.7}
          radiusOpacity={0.12}
          pulseClass="orbital-pulse-b"
          strokeWidth={1}
          dotRadius={2.3}
        />
      </svg>
    </div>
  )
}

function OrbitGroup({
  cx,
  cy,
  tilt,
  rx,
  ry,
  dot,
  ringOpacity,
  dotOpacity,
  radiusOpacity,
  pulseClass,
  strokeWidth,
  dotRadius,
}: {
  cx: number
  cy: number
  tilt: number
  rx: number
  ry: number
  dot: { x: number; y: number }
  ringOpacity: number
  dotOpacity: number
  radiusOpacity: number
  pulseClass: string
  strokeWidth: number
  dotRadius: number
}) {
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${tilt})`}>
      {/* Ring */}
      <ellipse
        cx={0}
        cy={0}
        rx={rx}
        ry={ry}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        opacity={ringOpacity}
      />

      {/* Faint radius line: center → dot */}
      <line
        x1={0}
        y1={0}
        x2={dot.x}
        y2={dot.y}
        stroke="currentColor"
        strokeWidth={0.75}
        opacity={radiusOpacity}
      />

      {/* Soft glow behind the dot */}
      <circle
        cx={dot.x}
        cy={dot.y}
        r={dotRadius * 2.2}
        fill="currentColor"
        opacity={dotOpacity * 0.35}
        filter="url(#orbital-glow)"
      />

      {/* Crisp dot — the element that pulses */}
      <circle
        cx={dot.x}
        cy={dot.y}
        r={dotRadius}
        fill="currentColor"
        opacity={dotOpacity}
        className={pulseClass}
      />
    </g>
  )
}
