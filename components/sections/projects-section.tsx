"use client"

import { ChevronDown } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"

type Project = {
  slug: string
  title: string
  tagline: string
  // Short description (1–2 sentences) shown when the card is collapsed.
  shortDescription: string
  // Full narrative shown when the card expands. Omit (or match shortDescription)
  // for projects with nothing extra to reveal — those cards stay a fixed height.
  description?: string
  stack: string[]
  // Both links are optional: internal / unpublished work has neither.
  liveUrl?: string
  repoUrl?: string
  // Drop a PNG at /public/images/projects/<slug>.png to override the screenshot.
  image: string
  // Gradient used for the branded placeholder fallback.
  gradient: { from: string; to: string; accent: string }
}

const projects: Project[] = [
  {
    slug: "spark-ray-eks",
    title: "Spark + Ray on EKS",
    tagline: "Two engines, the same 858M rows, built from scratch",
    shortDescription:
      "Wanted to see what the engines underneath actually look like without any of the platform automation I'd been working on top of, so I stood both of them up myself from vanilla open-source packages.",
    description:
      "Wanted to see what the engines underneath actually look like without any of the platform automation I'd been working on top of, so I stood both of them up myself from vanilla open-source packages and went down the question of when you'd reach for one over the other. Built Spark and Ray on a self-managed Kubernetes cluster from scratch, including the S3, networking, auth, container, and observability setup around them. From there I wrote equivalent ML pipelines in Spark MLlib and Ray + XGBoost and benchmarked them across 858M rows, comparing runtime, memory, and model performance. Most of the project turned into understanding what each framework quietly does for you: Spark was much more forgiving once a workload outgrew memory, while scaling Ray meant going deeper into distributed XGBoost, streaming data, and managing memory myself.",
    stack: ["Kubernetes", "Spark", "Ray", "XGBoost", "AWS", "Docker", "Prometheus", "Grafana"],
    image: "/images/projects/spark-ray-eks.png",
    gradient: { from: "#DCEEE6", to: "#A6CBBB", accent: "#1F4F3D" },
  },
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

        {/* items-start keeps each card at its intrinsic height. Without it the
            grid stretches every card in a row to match the tallest one, so
            expanding a single card visibly grew its neighbours. */}
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-10">
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
  // Expansion is click-only: nothing about hovering or focus opens a card.
  const [expanded, setExpanded] = useState(false)

  // A card only expands if it actually has more to say.
  const hasMore = Boolean(project.description && project.description !== project.shortDescription)

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

  const isOpen = hasMore && expanded

  return (
    <article
      ref={ref}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5 backdrop-blur-md transition-[opacity,transform,border-color,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-[0_10px_30px_-22px_rgba(0,0,0,0.5)] focus-within:border-foreground/20 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
      }`}
      style={{ transitionDelay: `${Math.min(index * 60, 200)}ms` }}
    >
      <ProjectPreview project={project} />

      {/* Copy */}
      <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        <div>
          {/* Two-line floor keeps collapsed cards in a row roughly level now
              that the grid no longer stretches them to a common height. */}
          <h3 className="font-serif text-lg font-normal leading-snug text-foreground md:min-h-[3.45rem] md:text-xl">
            {project.title}
          </h3>
          <p className="mt-1 font-mono text-[11px] text-foreground/60 md:text-xs">
            {project.tagline}
          </p>
        </div>

        <ExpandableDescription
          short={project.shortDescription}
          full={project.description}
          hasMore={hasMore}
          isOpen={isOpen}
          onToggle={() => setExpanded((v) => !v)}
        />

        <p className="mt-auto font-mono text-[11px] text-foreground/55">
          {project.stack.join(" · ")}
        </p>

        {(project.liveUrl || project.repoUrl) && (
          <div className="flex flex-wrap gap-2 pt-1">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-foreground/95 px-3.5 py-1.5 text-xs font-medium text-background backdrop-blur transition-colors hover:bg-foreground"
              >
                Live ↗
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-foreground/15 bg-foreground/5 px-3.5 py-1.5 text-xs font-medium text-foreground backdrop-blur transition-colors hover:border-foreground/30 hover:bg-foreground/10"
              >
                GitHub ↗
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

/**
 * Preview chain:
 *   1. Local file at project.image (user can drop a PNG to override).
 *   2. Live screenshot from api.microlink.io of project.liveUrl.
 *   3. Branded gradient placeholder with the project title.
 *
 * Projects without a liveUrl (internal / unpublished work) skip step 2 and
 * fall straight from the local file to the placeholder.
 */
function ProjectPreview({ project }: { project: Project }) {
  // "checking" = preflight local file; "local" = local file is valid; "microlink" = fall through to screenshot API; "placeholder" = branded fallback
  const [stage, setStage] = useState<"checking" | "local" | "microlink" | "placeholder">("checking")

  const microlinkUrl = useMemo(
    () =>
      project.liveUrl
        ? `https://api.microlink.io/?url=${encodeURIComponent(
            project.liveUrl,
          )}&screenshot=true&embed=screenshot.url&meta=false&waitUntil=networkidle0&viewport.width=1280&viewport.height=800`
        : null,
    [project.liveUrl],
  )

  // Preflight the local file. Empty/invalid files load with naturalWidth === 0,
  // 404s fire onerror. Either way we advance past the local file.
  useEffect(() => {
    let cancelled = false
    const fallback = microlinkUrl ? "microlink" : "placeholder"
    const probe = new window.Image()
    probe.onload = () => {
      if (cancelled) return
      setStage(probe.naturalWidth > 0 ? "local" : fallback)
    }
    probe.onerror = () => {
      if (cancelled) return
      setStage(fallback)
    }
    probe.src = project.image
    return () => {
      cancelled = true
    }
  }, [project.image, microlinkUrl])

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-foreground/10">
      <PreviewSkeleton gradient={project.gradient} animate={stage === "checking"} />
      {stage === "local" && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.015] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      )}
      {stage === "microlink" && microlinkUrl && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={microlinkUrl}
          alt={`${project.title} live preview`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.015] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
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
  animate,
}: {
  gradient: Project["gradient"]
  animate: boolean
}) {
  return (
    <div
      aria-hidden
      className={`absolute inset-0 ${animate ? "animate-pulse motion-reduce:animate-none" : ""}`}
      style={{
        background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
      }}
    />
  )
}

/**
 * Terminal state of the preview chain — used both while waiting on an image
 * and permanently for projects that will never have a public screenshot.
 * Deliberately shows the title only, so it never claims a preview is loading.
 */
function BrandedPlaceholder({ project }: { project: Project }) {
  const { from, to, accent } = project.gradient
  return (
    <div
      className="absolute inset-0 flex flex-col items-start justify-end p-5 md:p-6"
      style={{
        background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
      }}
    >
      <p
        className="relative z-10 font-serif text-xl font-normal leading-tight md:text-2xl"
        style={{ color: accent }}
      >
        {project.title.split(",")[0]}
      </p>
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
  hasMore,
  isOpen,
  onToggle,
}: {
  short: string
  full?: string
  hasMore: boolean
  isOpen: boolean
  onToggle: () => void
}) {
  // Cards with nothing extra to reveal render as plain, fixed-height copy —
  // no toggle, no height change on hover.
  if (!hasMore) {
    return <p className="text-sm leading-relaxed text-foreground/80">{short}</p>
  }

  // Both blocks animate their own intrinsic height via a nested 0fr→1fr grid
  // row, so the card grows to exactly the content height with no magic
  // max-height numbers and no clipped text on long copy. Timing lives in
  // utility classes (not inline styles) so motion-reduce can override it.
  const rowTransition =
    "transition-[grid-template-rows,opacity,transform] duration-[420ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] motion-reduce:transition-none"

  return (
    <div className="relative">
      {/* Collapsed preview */}
      <div
        className={`grid ${rowTransition} ${isOpen ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"}`}
        aria-hidden={isOpen}
      >
        <div className="min-h-0 overflow-hidden">
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
      </div>

      {/* Expanded narrative */}
      <div
        className={`grid ${rowTransition} ${
          isOpen ? "grid-rows-[1fr] translate-y-0 opacity-100" : "grid-rows-[0fr] translate-y-0.5 opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="text-sm leading-relaxed text-foreground/80">{full}</p>
        </div>
      </div>

      {/* Mobile / click-to-pin toggle */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="mt-2 inline-flex items-center gap-1 font-mono text-[11px] text-foreground/60 transition-colors hover:text-foreground md:text-xs"
      >
        <span>{isOpen ? "Read less" : "Read more"}</span>
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-300 ease-out motion-reduce:transition-none ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>
    </div>
  )
}
