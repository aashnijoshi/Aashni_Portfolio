"use client"

import { ChevronDown } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"

type Project = {
  slug: string
  title: string
  tagline: string
  // Short description (1–2 sentences) shown when the card is collapsed.
  shortDescription: string
  // Full narrative shown when the card expands.
  description: string
  stack: string[]
  liveUrl: string
  repoUrl?: string
  // Drop a PNG at /public/images/projects/<slug>.png to override the screenshot.
  image: string
  // Gradient used for the branded placeholder fallback.
  gradient: { from: string; to: string; accent: string }
}

const projects: Project[] = [
  {
    slug: "medicare-freshness",
    title: "Medicare plan data freshness monitor",
    tagline: "What happens when the data under a plan recommender goes stale",
    shortDescription:
      "Got curious about what actually sits under the hood of Medicare plan recommenders after reading the recent CMS RFI on AI in plan selection.",
    description:
      "Got curious about what actually sits under the hood of Medicare plan recommenders after reading the recent CMS RFI on AI in plan selection. Pulled three months of CPSC files (contracts and enrollment, around 10 million rows total) and dug into them for staleness, masking, churn, and coverage gaps. 94.6% of enrollment rows turn out to be masked for privacy, thousands of rows have orphaned geography, and month-over-month contract churn is higher than you'd want for a live recommendation engine. Packaged the analysis as a notebook and a dashboard.",
    stack: ["Python", "pandas", "Jupyter", "Next.js", "Vercel"],
    liveUrl: "https://chapter-data-freshness.vercel.app/",
    image: "/images/projects/medicare-freshness.png",
    gradient: { from: "#F4E8D8", to: "#E8D2B3", accent: "#8A5A2B" },
  },
  {
    slug: "kai",
    title: "KAI, an evaluation framework for AI-assisted reading comprehension",
    tagline: "Rubric-based scoring for students with IDD",
    shortDescription:
      "Stumbled onto the Stanford HAI group working on KAI, an AI tool that helps students with intellectual and developmental disabilities work through reading comprehension.",
    description:
      "Stumbled onto the Stanford HAI group working on KAI, an AI tool that helps students with intellectual and developmental disabilities work through reading comprehension. Went deep into the Lemons group's papers on presumed competence and curriculum-based measurement, then tried to answer a question the research itself raises: how do you scale rubric-based scoring as the tool moves from one RCT to three concurrent pilots? Built a four-dimension rubric grounded in their published work, wrote an evaluator that refuses to penalize non-standard grammar (which is the whole philosophical point), and ran it against six worked examples including a critical test case on non-standard communication.",
    stack: ["Python", "Anthropic API", "Jupyter", "Next.js", "Vercel"],
    liveUrl: "https://kai-eval-dashboard.vercel.app/",
    image: "/images/projects/kai.png",
    gradient: { from: "#EADCF7", to: "#C8B4E5", accent: "#5A3E8A" },
  },
  {
    slug: "memorang-mini",
    title: "Memorang Mini, an LLM eval harness for EdTech",
    tagline: "Quality control for AI in the classroom",
    shortDescription:
      "I've always cared about EdTech, and something that keeps bugging me is that most EdTech companies shipping AI features don't have a real way to tell if the AI is right.",
    description:
      "I've always cared about EdTech, and something that keeps bugging me is that most EdTech companies shipping AI features don't have a real way to tell if the AI is right. Vibes-based evaluation is a liability when a student is on the other end. Built a lightweight eval harness with three tabs (Datasets, Graders, Experiments) where you define rubrics, run them across test cases, and get structured pass/fail results with reasoning. Claude does the grading server-side with typed outputs, so AI quality stops being intuited and starts being measurable.",
    stack: ["Next.js", "TypeScript", "Zustand", "shadcn/ui", "Vercel AI SDK", "Anthropic API", "Zod"],
    liveUrl: "https://memorang-sidequest.vercel.app/",
    image: "/images/projects/memorang-mini.png",
    gradient: { from: "#D8EAF4", to: "#A7CAE0", accent: "#254A68" },
  },
  {
    slug: "orbit",
    title: "Orbit, GTM intelligence in one API call",
    tagline: "A go-to-market engineer, condensed into a single Claude call",
    shortDescription:
      "Watched too many technical founders duct-tape five tools together just to enrich a company, score it against their ICP, find a champion, and draft outbound.",
    description:
      "Watched too many technical founders duct-tape five tools together just to enrich a company, score it against their ICP, find a champion, and draft outbound. Wanted to see how much of that loop could collapse into a single API call. Built Orbit: paste a company name, and in under 10 seconds Claude enriches the account, scores it against a target ICP, surfaces buy signals, infers a champion persona, and drafts a personalized three-touch outbound sequence. One structured call, typed JSON, zero chaining. The data layer is stubbed behind Claude inference on purpose, so swapping in real B2B data APIs later is a clean replacement.",
    stack: ["Next.js", "TypeScript", "Claude Sonnet API", "Tailwind", "Vercel"],
    liveUrl: "https://crustdata-gtm.vercel.app/",
    image: "/images/projects/orbit.png",
    gradient: { from: "#F7DCD2", to: "#E8B09A", accent: "#6E2A18" },
  },
  {
    slug: "kessler-os",
    title: "Kessler OS, a space debris cascade simulator",
    tagline: "Modeling the moment low Earth orbit becomes unusable",
    shortDescription:
      "Built this at CalHacks because Kessler syndrome is the most visceral version of a problem I actually want to work on.",
    description:
      "Built this at CalHacks because Kessler syndrome is the most visceral version of a problem I actually want to work on. The idea is simple and terrifying: one collision in LEO spawns debris, that debris causes more collisions, and the cascade runs until the orbit is unusable for generations. Wanted to see that threshold firsthand. Built an n-body orbital dynamics simulator using RK4 numerical integration and Monte Carlo methods, validated trajectories against NASA/JPL ephemeris data at around 90% accuracy. Watching the cascade run in real time changes how you think about who gets to put stuff in orbit.",
    stack: ["Python", "NumPy", "Monte Carlo simulation", "physics modeling", "Next.js frontend"],
    liveUrl: "https://kessler-vp-aj.vercel.app/",
    image: "/images/projects/kessler-os.png",
    gradient: { from: "#1B2446", to: "#0B1026", accent: "#6C8AE4" },
  },
]

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative w-full px-6 py-24 md:px-12 md:py-32 lg:px-16"
    >
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-12 md:mb-16">
          <h2 className="mb-2 font-serif text-4xl font-normal tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Projects
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">
            / Things I got curious about and built
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-10">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [hovering, setHovering] = useState(false)
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true)
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Cleanup any pending hover timer on unmount.
  useEffect(() => {
    return () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current)
    }
  }, [])

  const handleMouseEnter = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current)
    // 400ms intent-to-expand delay so casual cursor passes don't trigger expansion.
    hoverTimer.current = setTimeout(() => setHovering(true), 400)
  }

  const handleMouseLeave = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current)
      hoverTimer.current = null
    }
    // Collapse is instant — no delay on the way out.
    setHovering(false)
    setExpanded(false)
  }

  const isOpen = hovering || expanded

  return (
    <article
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5 backdrop-blur-md transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-foreground/20 hover:shadow-[0_20px_60px_-30px_rgba(0,0,0,0.55)] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
      style={{ transitionDelay: `${Math.min(index * 60, 200)}ms` }}
    >
      <ProjectPreview project={project} />

      {/* Copy */}
      <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        <div>
          <h3 className="font-serif text-lg font-normal leading-snug text-foreground md:text-xl">
            {project.title}
          </h3>
          <p className="mt-1 font-mono text-[11px] text-foreground/60 md:text-xs">
            {project.tagline}
          </p>
        </div>

        <ExpandableDescription
          short={project.shortDescription}
          full={project.description}
          isOpen={isOpen}
          expanded={expanded}
          onToggle={() => setExpanded((v) => !v)}
        />

        <p className="mt-auto font-mono text-[11px] text-foreground/55">
          {project.stack.join(" · ")}
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-foreground/95 px-3.5 py-1.5 text-xs font-medium text-background backdrop-blur transition-colors hover:bg-foreground"
          >
            Live ↗
          </a>
          <a
            href={project.repoUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-foreground/15 bg-foreground/5 px-3.5 py-1.5 text-xs font-medium text-foreground backdrop-blur transition-colors hover:border-foreground/30 hover:bg-foreground/10"
            aria-disabled={!project.repoUrl}
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </article>
  )
}

/**
 * Preview chain:
 *   1. Local file at project.image (user can drop a PNG to override).
 *   2. Live screenshot from api.microlink.io of project.liveUrl.
 *   3. Branded gradient placeholder with the project title.
 */
function ProjectPreview({ project }: { project: Project }) {
  // "checking" = preflight local file; "local" = local file is valid; "microlink" = fall through to screenshot API; "placeholder" = branded fallback
  const [stage, setStage] = useState<"checking" | "local" | "microlink" | "placeholder">("checking")

  const microlinkUrl = useMemo(
    () =>
      `https://api.microlink.io/?url=${encodeURIComponent(
        project.liveUrl,
      )}&screenshot=true&embed=screenshot.url&meta=false&waitUntil=networkidle0&viewport.width=1280&viewport.height=800`,
    [project.liveUrl],
  )

  // Preflight the local file. Empty/invalid files load with naturalWidth === 0,
  // 404s fire onerror. Either way we advance to the microlink screenshot.
  useEffect(() => {
    let cancelled = false
    const probe = new window.Image()
    probe.onload = () => {
      if (cancelled) return
      setStage(probe.naturalWidth > 0 ? "local" : "microlink")
    }
    probe.onerror = () => {
      if (cancelled) return
      setStage("microlink")
    }
    probe.src = project.image
    return () => {
      cancelled = true
    }
  }, [project.image])

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-foreground/10">
      <PreviewSkeleton gradient={project.gradient} />
      {stage === "local" && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
        />
      )}
      {stage === "microlink" && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={microlinkUrl}
          alt={`${project.title} live preview`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
          onError={() => setStage("placeholder")}
        />
      )}
      {stage === "placeholder" && <BrandedPlaceholder project={project} />}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20" />
    </div>
  )
}

function PreviewSkeleton({
  gradient,
}: {
  gradient: Project["gradient"]
}) {
  return (
    <div
      aria-hidden
      className="absolute inset-0 animate-pulse"
      style={{
        background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
      }}
    />
  )
}

function BrandedPlaceholder({ project }: { project: Project }) {
  const { from, to, accent } = project.gradient
  return (
    <div
      className="absolute inset-0 flex flex-col items-start justify-end p-5 md:p-6"
      style={{
        background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
      }}
    >
      <div className="relative z-10">
        <p
          className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-70"
          style={{ color: accent }}
        >
          Preview loading
        </p>
        <p
          className="font-serif text-xl font-normal leading-tight md:text-2xl"
          style={{ color: accent }}
        >
          {project.title.split(",")[0]}
        </p>
      </div>
      <div
        aria-hidden
        className="absolute -right-6 -top-6 h-32 w-32 rounded-full opacity-30 blur-2xl"
        style={{ background: accent }}
      />
    </div>
  )
}

function ExpandableDescription({
  short,
  full,
  isOpen,
  expanded,
  onToggle,
}: {
  short: string
  full: string
  isOpen: boolean
  expanded: boolean
  onToggle: () => void
}) {
  // isOpen is the unified open state: true when either the hover-intent
  // delay has elapsed OR the user has explicitly tapped "Read more".
  return (
    <div className="relative">
      {/* Collapsed preview (always rendered so it stays anchored) */}
      <div
        className={`relative overflow-hidden transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "max-h-0 opacity-0" : "max-h-[4.75rem] opacity-100"
        }`}
      >
        <p
          className="text-sm leading-relaxed text-foreground/80"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, black 55%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
          }}
        >
          {short}
        </p>
      </div>

      {/* Expanded narrative */}
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "max-h-[40rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-sm leading-relaxed text-foreground/80">{full}</p>
      </div>

      {/* Mobile / click-to-pin toggle */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-label={expanded ? "Collapse description" : "Expand description"}
        className="mt-2 inline-flex items-center gap-1 font-mono text-[11px] text-foreground/60 transition-colors hover:text-foreground md:text-xs"
      >
        <span>{expanded ? "Read less" : "Read more"}</span>
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-300 ${expanded ? "rotate-180" : "rotate-0"}`}
        />
      </button>
    </div>
  )
}
