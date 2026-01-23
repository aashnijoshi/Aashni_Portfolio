"use client"

import { useReveal } from "@/hooks/use-reveal"
import { useEffect, useState } from "react"

type Project = {
  title: string
  role: string
  period: string
  description: string
  link: string
  images?: string[]
}

export function WorkSection() {
  const { ref, isVisible } = useReveal(0.3)
  const tabs = ["past", "present", "future", "side-quests"] as const
  type Tab = (typeof tabs)[number]
  const [activeTab, setActiveTab] = useState<Tab>("present")
  const [selectedProject, setSelectedProject] = useState<{ tab: Tab; index: number } | null>(null)

  const experiences: Record<Tab, Project[]> = {
    present: [
      {
        title: "Hyperspell (Y Combinator F25)",
        role: "data science intern and growth lead",
        period: "Aug 2024 – Present",
        description:
          "owned growth and product for a yc-backed developer tools startup. built demo apps (memoirly for semantic search, flexed for fitness tracking, calendar integrations) to show developers what they could build with the platform. wrote all the documentation, blogs, and onboarding content - recorded tutorial videos showing people how to start querying their data in under five minutes. ran experiments on the onboarding flow to figure out where people were getting stuck. instrumented analytics to track what integrations developers actually used and which ones drove retention. worked directly with the team on product decisions - what to build next, how to position features, which partnerships made sense. also did a lot of the early growth work: managing content calendar, coordinating product hunt strategy, writing thought leadership posts, setting up customer spotlights. learned how to wear multiple hats at an early-stage startup - you build the thing, write about it, figure out how to grow it, and iterate based on what's actually working.",
        link: "https://www.hyperspell.com/",
        images: ["/hyperspell1.jpeg", "/hyperspell2.jpeg"],
      },
    ],
    past: [
      {
        title: "Astreas",
        role: "data science intern",
        period: "Jan 2025 – May 2025",
        description:
          "worked on building the foundation for a pre-launch product. focused on user feedback and growing early interest.",
        link: "https://astreas.co/",
        images: ["/astreas.jpeg"],
      },
      {
        title: "People+ai",
        role: "data science intern",
        period: "May 2024 – Aug 2024",
        description:
          "worked on two projects trying to use ai to solve real problems in indian education. first was digiform - an ocr tool to automate college application forms. indian students spend hours manually filling out repetitive forms for different colleges, so we built a prototype using openai's api to extract info and auto-fill applications. built the whole stack - react frontend, flask backend, python for the ocr pipeline. it generated a pdf with all the student's info already filled in. worked on the product strategy and helped figure out go-to-market - who would actually pay for this, how to get it in front of students, what the business model looked like. also co-led the ed-tech track focused on teacher tools. most edtech in india is student-focused, but teachers are overworked and drowning in administrative work. we were exploring ai tools for lesson planning, attendance, quiz creation and grading - all multilingual since teachers work with students across different dialects. spent a lot of time on market research, talking to actual teachers to understand their pain points. learned how to build for users in a completely different context than silicon valley - different infrastructure, different needs, different willingness to pay. also got better at early-stage product work - going from problem to prototype to figuring out if anyone would actually use it.",
        link: "https://peopleplus.ai/",
      },
      {
        title: "NASA Ames Research Center – NewSpace@Berkeley",
        role: "technical project manager (data & modeling)",
        period: "Aug 2024 – May 2025",
        description:
          "led economic analysis for nasa's in-space manufacturing opportunities. read through tons of technical and market reports, built financial models to evaluate different payload scenarios. used monte carlo simulations and sensitivity analysis to help nasa understand which directions made sense for their long-term roadmap. learned how to work on projects with really long timelines and high stakes. also got better at presenting technical findings to people who need the insights but don't need to see the math - translating analysis into decisions.",
        link: "https://www.nasa.gov/ames",
      },
      {
        title: "Stanford University",
        role: "data science intern",
        period: "Jan 2024 – May 2024",
        description:
          "built a semantic search system for semiconductor researchers. indexed thousands of research papers using embeddings so domain experts could find relevant work faster. benchmarked the retrieval quality, worked with actual users to validate results and iterate on what mattered. turned findings into research briefs that informed what the lab prioritized next. learned the gap between building something that works technically versus building something researchers actually use in their workflow.",
        link: "https://xlab.stanford.edu/",
      },
      {
        title: "Vast Space",
        role: "data science intern",
        period: "Aug 2023 – May 2024",
        description:
          "built financial models for commercial space station economics. developed python simulation tools to model different revenue scenarios and cost structures. learned how to think about uncertainty when you're dealing with ventures that are inherently speculative - how to communicate projections in a way that's honest about what we know and don't know.",
        link: "https://www.vastspace.com/",
        images: ["/vast%20Medium.jpeg"],
      },
    ],
    future: [
      {
        title: "looking ahead",
        role: "open to opportunities",
        period: "Summer 2026",
        description:
          "exploring what's next—whether that's internships, research, or projects that let me learn something new. interested in anything at the intersection of ai infrastructure, tools for builders, or thoughtful product work.",
        link: "",
      },
    ],
    "side-quests": [
      {
        title: "Axion",
        role: "personal project",
        period: "2025",
        description:
          "a project exploring how devrel teams can spend less time on busywork and more time connecting with developers.",
        link: "https://www.loom.com/share/dc8f66372bb546c1b204e2a21c2ed44c",
      },
      {
        title: "flexed",
        role: "personal project",
        period: "2025",
        description:
          "a small project exploring how to make workouts feel less rigid and more adaptable to real life. built as a way to learn and experiment.",
        link: "https://github.com/aashnijoshi/flexed-app?tab=readme-ov-file",
      },
      {
        title: "orbital dynamics simulation",
        role: "personal project",
        period: "2022",
        description:
          "built a simulation to model orbital mechanics and spacecraft trajectories. got to combine physics and code in a fun way.",
        link: "https://github.com/aashnijoshi/Planets-Simulation",
      },
      {
        title: "The Universe, But This Time You Understand It",
        role: "author",
        period: "2022",
        description:
          "authored a science novel on making cosmology feel approachable, clear, and fun for anyone curious about the universe.",
        link: "https://www.amazon.com/Universe-But-This-Time-Understand/dp/B0BHZR3STD?nsdOptOutParam=true&sr=8-1",
      },
    ],
  }

  useEffect(() => {
    setSelectedProject(null)
  }, [activeTab])

  return (
    <section
      ref={ref}
      className="flex min-h-screen w-full snap-start items-center px-4 pb-6 pt-24 sm:px-6 sm:pb-8 sm:pt-28 md:h-screen md:shrink-0 md:px-12 md:pb-10 md:pt-28 lg:px-16"
    >
      <div className="mx-auto h-full w-full max-w-7xl flex flex-col">
        <div
          className={`mb-6 md:mb-8 transition-all duration-700 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-serif text-5xl font-normal tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            things i've worked on
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ projects & experiences</p>
        </div>

        <div className="mb-6 flex gap-4 border-b border-foreground/10 md:gap-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative pb-3 font-serif text-base transition-colors md:text-lg ${
                activeTab === tab ? "text-foreground" : "text-foreground/40 hover:text-foreground/70"
              }`}
            >
              {tab === "side-quests" ? "side quests" : tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground transition-all duration-300" />
              )}
            </button>
          ))}
        </div>

        <div
          className="flex-1 pr-2 md:overflow-y-auto md:scrollbar-thin md:scrollbar-thumb-foreground/20 md:scrollbar-track-transparent md:max-h-[calc(100vh-280px)]"
        >
        {selectedProject && selectedProject.tab === activeTab ? (
          <ProjectDetail
            project={experiences[activeTab][selectedProject.index]}
            onBack={() => setSelectedProject(null)}
            isVisible={isVisible}
          />
        ) : (
          <div
            className={
              activeTab === "past" ? "grid md:grid-cols-2 gap-6 pb-6 work-scroll" : "space-y-4 md:space-y-5 pb-6 work-scroll"
            }
          >
            {experiences[activeTab].map((project, i) => {
              const hasImages = Boolean(project.images && project.images.length > 0)
              const hidePreview = activeTab === "side-quests"
              return (
                <ProjectCard
                  key={i}
                  project={project}
                  index={i}
                  isVisible={isVisible}
                  onSelect={() => hasImages && setSelectedProject({ tab: activeTab, index: i })}
                  hasImages={hasImages}
                  hidePreview={hidePreview}
                />
              )
            })}
          </div>
        )}
        </div>
      </div>
      <style jsx global>{`
        .work-scroll::-webkit-scrollbar {
          width: 10px;
        }
        .work-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .work-scroll::-webkit-scrollbar-thumb {
          background: rgba(120, 120, 130, 0.35);
          border-radius: 9999px;
          border: 2px solid transparent;
          background-clip: content-box;
        }
        .work-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(120, 120, 130, 0.55);
          border: 2px solid transparent;
          background-clip: content-box;
        }
        .work-scroll {
          scrollbar-color: rgba(120, 120, 130, 0.35) transparent;
          scrollbar-width: thin;
        }
      `}</style>
    </section>
  )
}

function ProjectCard({
  project,
  index,
  isVisible,
  onSelect,
  hasImages,
  hidePreview,
}: {
  project: Project
  index: number
  isVisible: boolean
  onSelect: () => void
  hasImages: boolean
  hidePreview: boolean
}) {
  const [showFull, setShowFull] = useState(false)

  const handleClick = () => {
    if (hasImages) {
      onSelect()
    } else {
      setShowFull((s) => !s)
    }
  }

  return (
    <div
      className={`group border-l-2 border-foreground/20 pl-5 transition-all duration-700 hover:border-foreground/40 md:pl-6 ${
        isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
      }`}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline gap-3">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-foreground/30 underline-offset-4 font-serif text-xl font-normal text-foreground transition-all duration-300 hover:text-foreground/70 hover:decoration-foreground/50 md:text-2xl lg:text-3xl"
            >
              {project.title}
            </a>
          ) : (
            <h3 className="font-serif text-xl font-normal text-foreground md:text-2xl lg:text-3xl">{project.title}</h3>
          )}
        </div>
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-foreground/50 md:text-sm">{project.role}</span>
          <span className="font-mono text-xs text-foreground/40">{project.period}</span>
        </div>

        {!hidePreview && (
          <p
            className={`max-w-2xl text-sm leading-relaxed text-foreground/75 transition-all ${
              showFull ? "line-clamp-none" : "line-clamp-1"
            }`}
          >
            {project.description}
          </p>
        )}
        {hidePreview && showFull && (
          <p className="max-w-2xl text-sm leading-relaxed text-foreground/75">{project.description}</p>
        )}

        <button
          onClick={handleClick}
          className="inline-flex items-center gap-2 text-left font-mono text-xs text-foreground/50 transition-all duration-200 hover:text-foreground/80"
        >
          {hasImages ? "read more ↓" : showFull ? "show less ↑" : "read more ↓"}
        </button>
      </div>
    </div>
  )
}

function ProjectDetail({
  project,
  onBack,
  isVisible,
}: {
  project: Project
  onBack: () => void
  isVisible: boolean
}) {
  const hasMultiple = project.images && project.images.length > 1

  return (
    <div
      className={`grid gap-8 md:grid-cols-[1.05fr_0.95fr] items-start pb-6 transition-all duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col gap-4">
        <button
          onClick={onBack}
          className="w-fit rounded-full border border-foreground/15 px-3 py-1 text-xs font-mono text-foreground/60 transition-colors hover:border-foreground/30 hover:text-foreground/90"
        >
          ← back to list
        </button>

        <div className="space-y-2">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-foreground/30 underline-offset-4 font-serif text-3xl font-normal text-foreground transition-all duration-300 hover:text-foreground/70 hover:decoration-foreground/50 md:text-4xl lg:text-5xl"
            >
              {project.title}
            </a>
          ) : (
            <h3 className="font-serif text-3xl font-normal text-foreground md:text-4xl lg:text-5xl">{project.title}</h3>
          )}
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-xs text-foreground/60 md:text-sm">{project.role}</span>
            <span className="font-mono text-xs text-foreground/40">{project.period}</span>
          </div>
        </div>

        <p className="max-w-3xl text-base leading-relaxed text-foreground/85 md:text-lg">{project.description}</p>
      </div>

      {project.images && project.images.length > 0 && (
        <div className="relative">
          {project.title === "Hyperspell (YC F25)" ? (
            <div className="grid grid-cols-2 gap-3 rounded-2xl overflow-hidden shadow-[0_12px_60px_-28px_rgba(0,0,0,0.45)] max-h-[250px]">
              {project.images.slice(0, 4).map((img) => (
                <div key={img} className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={img}
                    alt={project.title}
                    className="h-full w-full object-cover object-center animate-in fade-in duration-500"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/25 via-transparent to-transparent" />
                </div>
              ))}
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-2xl shadow-[0_12px_60px_-28px_rgba(0,0,0,0.45)] max-w-[200px]">
              <img
                src={project.images[0]}
                alt={project.title}
                className="h-full w-full object-cover object-center animate-in fade-in slide-in-from-right-6 duration-500"
                style={{ aspectRatio: "3/4" }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/25 via-transparent to-transparent" />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
