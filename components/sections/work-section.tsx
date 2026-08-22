"use client"

import { useEffect, useRef, useState } from "react"
import { ImageCarousel } from "@/components/ui/image-carousel"

type TimelineEntry = {
  slug: string // matches public/images/work/<slug>/
  company: string
  role: string
  period: string
  tagline?: string
  description: string
  link?: string
}

const entries: TimelineEntry[] = [
  {
    slug: "apple",
    company: "Apple",
    role: "Machine Learning Engineer Intern",
    period: "May 2026 to Aug 2026",
    tagline: "Applied ML team",
    description:
      "Spent the summer building agentic tooling for Apple's internal data and ML platform, mostly around making some time-consuming Spark, Ray, and Airflow workflows easier for engineers, PMs, and SREs. That ended up taking me through internal APIs, MCPs, eval harnesses, Docker/Kubernetes, model deployment, and observability. I also built Spark and Ray from scratch on Kubernetes and benchmarked distributed ML workloads across 858M rows, which was probably my favorite rabbit hole of the summer.",
    link: "https://www.apple.com/",
  },
  {
    slug: "hyperspell",
    company: "Hyperspell (YC F25)",
    role: "Founding Data Engineer",
    period: "Aug 2024 to Dec 2025",
    tagline: "Employee #1",
    description:
      "Joined as the founding engineer and worked across product, engineering, and developer experience. I built technical demos and example apps, spent a lot of time with users debugging edge cases and figuring out what should get built next, and helped shape how Hyperspell showed up to developers through the website, documentation, and technical content around MCP and agentic systems.",
    link: "https://www.hyperspell.com/",
  },
  {
    slug: "nasa-ames",
    company: "NASA Ames Research Center",
    role: "Technical Project Manager",
    period: "Aug 2024 to May 2025",
    description:
      "Worked with NASA Ames on in-space servicing, assembly, and manufacturing, trying to understand where the biggest technical gaps and commercial opportunities were. I spent a lot of time digging through mission data and research, built a Python/React visualization for 200+ space technologies, and used statistical and Monte Carlo modeling to turn that into something useful for roadmap decisions.",
    link: "https://www.nasa.gov/ames",
  },
  {
    slug: "stanford-xlab",
    company: "Stanford University, Extreme Environment Microsystems Lab",
    role: "CS Researcher",
    period: "Jan 2024 to May 2024",
    description:
      "Worked on an LLM system for semiconductor research, experimenting with retrieval, embeddings, vector databases, and evaluation to make a specialized body of technical knowledge easier to query. It was one of my first times going deep on RAG and taught me pretty quickly that getting an LLM to sound convincing is much easier than getting it to be consistently right.",
    link: "https://xlab.stanford.edu/",
  },
  {
    slug: "people-ai",
    company: "People+AI",
    role: "AI Engineer Intern",
    period: "May 2024 to Aug 2024",
    description:
      "Built document-processing systems for government workflows using Python, Flask, React, OCR, and LLM APIs to turn different document formats into structured data. A lot of the work ended up being about making the system around the model reliable: batching, async processing, validation, and getting workflows that took hours of manual work down to a couple of minutes.",
    link: "https://peopleplus.ai/",
  },
  {
    slug: "vast-space",
    company: "Vast Space",
    role: "Data Science Intern",
    period: "Aug 2022 to May 2023",
    description:
      "Analyzed the LEO economy to surface academic payload opportunities for Haven-1. Built the revenue and ROI models that went into the business development deck.",
    link: "https://www.vastspace.com/",
  },
]

type WorkSectionProps = {
  imagesBySlug?: Record<string, string[]>
}

export function WorkSection({ imagesBySlug }: WorkSectionProps = {}) {
  const sectionRef = useRef<HTMLElement>(null)
  const [ruleProgress, setRuleProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const viewportMid = window.innerHeight * 0.55
      // Progress: 0 when section top hits viewport mid, 1 when section bottom hits viewport mid.
      const p = (viewportMid - rect.top) / rect.height
      setRuleProgress(Math.max(0, Math.min(1, p)))
    }
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full px-6 py-24 md:px-12 md:py-32 lg:px-16"
    >
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-16 md:mb-24">
          <h2 className="mb-2 font-serif text-4xl font-normal tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Work
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Where I've been</p>
        </header>

        <div className="relative">
          {/* Background rule */}
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-[11px] md:left-[15px] w-px bg-foreground/15"
          />
          {/* Foreground scroll-drawn rule */}
          <div
            aria-hidden
            className="absolute top-0 left-[11px] md:left-[15px] w-px bg-foreground/60 transition-[height] duration-150 ease-out"
            style={{ height: `${ruleProgress * 100}%` }}
          />

          <ol className="space-y-16 md:space-y-24">
            {entries.map((entry, i) => (
              <TimelineItem
                key={entry.slug}
                entry={entry}
                index={i}
                images={imagesBySlug?.[entry.slug] ?? []}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function TimelineItem({
  entry,
  index,
  images,
}: {
  entry: TimelineEntry
  index: number
  images: string[]
}) {
  const ref = useRef<HTMLLIElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true)
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <li
      ref={ref}
      className={`relative pl-10 md:pl-14 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
      style={{ transitionDelay: `${Math.min(index * 80, 320)}ms` }}
    >
      {/* Node on the rule */}
      <span
        aria-hidden
        className={`absolute left-[5px] md:left-[9px] top-2 h-3.5 w-3.5 rounded-full bg-foreground transition-all duration-500 ease-out ${
          visible
            ? "scale-110 shadow-[0_0_14px_3px_rgba(255,182,193,0.45)]"
            : "scale-90 shadow-none"
        }`}
      />

      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-serif text-2xl font-normal leading-tight text-foreground md:text-3xl">
            <span>{entry.role}</span>
            <span className="text-foreground/60">
              , {entry.link ? (
                <a
                  href={entry.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-foreground/25 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground/60"
                >
                  {entry.company}
                </a>
              ) : (
                entry.company
              )}
            </span>
          </h3>
        </div>
        <p className="mt-1 font-mono text-xs text-foreground/55 md:text-sm">
          {entry.period}
          {entry.tagline ? <span className="text-foreground/40"> · {entry.tagline}</span> : null}
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/80 md:text-base">
          {entry.description}
        </p>

        {images.length > 0 && (
          <div className="mt-6 max-w-2xl md:mt-7">
            <ImageCarousel
              images={images}
              alt={`${entry.company} — ${entry.role}`}
              size="compact"
            />
          </div>
        )}
      </div>
    </li>
  )
}
