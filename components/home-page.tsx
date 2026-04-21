"use client"

import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { WorkSection } from "@/components/sections/work-section"
import { AboutSection } from "@/components/sections/about-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { ContactSection } from "@/components/sections/contact-section"
import { OrbitalDivider } from "@/components/orbital-divider"
import { MagneticButton } from "@/components/magnetic-button"
import { useRef, useEffect, useState } from "react"

const NAV_ITEMS = [
  { label: "Home", id: "home" },
  { label: "Work", id: "work" },
  { label: "Projects", id: "projects" },
  { label: "Beyond", id: "beyond" },
  { label: "Contact", id: "contact" },
] as const

type HomePageProps = {
  workImagesBySlug: Record<string, string[]>
  personalImages: string[]
}

export function HomePage({ workImagesBySlug, personalImages }: HomePageProps) {
  const [currentSection, setCurrentSection] = useState<string>("home")
  const [isLoaded, setIsLoaded] = useState(false)
  const shaderContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas")
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true)
          return true
        }
      }
      return false
    }

    if (checkShaderReady()) return

    const intervalId = setInterval(() => {
      if (checkShaderReady()) clearInterval(intervalId)
    }, 100)

    const fallbackTimer = setTimeout(() => setIsLoaded(true), 1500)

    return () => {
      clearInterval(intervalId)
      clearTimeout(fallbackTimer)
    }
  }, [])

  const scrollToId = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  // Track which section is currently in view for nav highlighting.
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setCurrentSection(id)
        },
        { threshold: 0.35, rootMargin: "-15% 0px -45% 0px" },
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <main className="relative w-full bg-background">
      <CustomCursor />
      <GrainOverlay />

      {/* Fixed shader background */}
      <div
        ref={shaderContainerRef}
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ contain: "strict" }}
      >
        <Shader className="h-full w-full">
          <Swirl
            colorA="#5C1A1A"
            colorB="#7D2E2E"
            speed={1.2}
            detail={1.0}
            blend={60}
            coarseX={50}
            coarseY={50}
            mediumX={50}
            mediumY={50}
            fineX={50}
            fineY={50}
          />
          <ChromaFlow
            baseColor="#6B1F2A"
            upColor="#8B2E3E"
            downColor="#7D2E2E"
            leftColor="#5C1A1A"
            rightColor="#A0424D"
            intensity={1.2}
            radius={2.0}
            momentum={35}
            maskType="alpha"
            opacity={0.97}
          />
        </Shader>
        <div className="absolute inset-0 bg-background/5" />
      </div>

      <nav
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-6 transition-opacity duration-700 md:px-12 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <button onClick={() => scrollToId("home")} className="transition-transform hover:scale-105">
          <span className="font-serif text-lg font-normal tracking-tight text-foreground">Aashni Joshi</span>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollToId(id)}
              className={`group relative font-sans text-sm font-medium transition-colors ${
                currentSection === id ? "text-foreground" : "text-foreground/80 hover:text-foreground"
              }`}
            >
              {label}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300 ${
                  currentSection === id ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}
        </div>

        <MagneticButton variant="secondary" onClick={() => scrollToId("contact")}>
          Get in touch
        </MagneticButton>
      </nav>

      <div className={`relative z-10 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        {/* Hero */}
        <section
          id="home"
          className="relative flex min-h-screen w-full items-start px-6 pb-14 pt-40 md:px-12 md:pb-24 md:pt-52 lg:px-16 lg:pt-60 xl:pt-64"
        >
          <div className="mx-auto grid w-full max-w-6xl items-start gap-10 md:gap-12 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1fr)] lg:gap-16">
            <div className="order-2 pb-6 lg:order-1">
              <h1 className="mb-6 animate-in fade-in slide-in-from-bottom-8 font-serif font-normal leading-[0.95] tracking-[-0.03em] text-foreground duration-1000 text-[72px] sm:text-[80px] md:text-[96px] lg:text-[128px] xl:text-[144px]">
                <span className="text-balance">Aashni Joshi</span>
              </h1>
              <p className="mb-4 max-w-xl animate-in fade-in slide-in-from-bottom-4 text-sm leading-relaxed text-foreground/85 duration-1000 delay-200 md:text-[17px]">
                <span className="text-pretty">
                  {
                    "Data Science + Astrophysics @ UC Berkeley. I like building things I'm curious about, studying the universe, and learning from the people I meet along the way."
                  }
                </span>
              </p>
              <p className="mb-8 max-w-xl animate-in fade-in slide-in-from-bottom-4 font-mono text-[11px] text-foreground/65 duration-1000 delay-250 md:text-xs">
                Currently: Founding Data Engineer at Hyperspell (YC F25).
              </p>
              <div className="mb-6 flex animate-in fade-in slide-in-from-bottom-4 gap-4 duration-1000 delay-300">
                <a
                  href="https://www.linkedin.com/in/aashnijoshi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline transition-colors hover:text-foreground text-sm text-secondary"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/aashnijoshi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline transition-colors hover:text-foreground text-sm text-secondary"
                >
                  GitHub
                </a>
              </div>
              <div className="flex animate-in fade-in slide-in-from-bottom-4 flex-col gap-4 duration-1000 delay-400 sm:flex-row sm:items-center">
                <MagneticButton size="lg" variant="primary" onClick={() => scrollToId("work")}>
                  My work
                </MagneticButton>
                <MagneticButton size="lg" variant="secondary" onClick={() => scrollToId("contact")}>
                  Say hi
                </MagneticButton>
              </div>
            </div>

            <div className="order-1 mx-auto w-full max-w-[14rem] sm:max-w-[16rem] lg:order-2 lg:mx-0 lg:max-w-none">
              <div className="relative animate-in fade-in slide-in-from-right-6 duration-1000 delay-200 transition-transform hover:-translate-y-1">
                <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "3/4" }}>
                  {/* Drop file here: /images/hero/main.jpg (keeping legacy path as fallback) */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/myphotoforfirstpage.jpg"
                    alt="Aashni Joshi"
                    className="h-full w-full object-cover"
                    style={{ objectPosition: "center 20%" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-in fade-in duration-1000 delay-500">
            <div className="flex items-center gap-2">
              <p className="font-mono text-xs text-foreground/80">Scroll to explore</p>
              <div className="flex h-6 w-12 items-center justify-center rounded-full border border-foreground/20 bg-foreground/15 backdrop-blur-md">
                <div className="h-2 w-2 animate-pulse rounded-full bg-foreground/80" />
              </div>
            </div>
          </div>
        </section>

        <WorkSection imagesBySlug={workImagesBySlug} />
        <OrbitalDivider />
        <ProjectsSection />
        <AboutSection personalImages={personalImages} scrollToSection={() => scrollToId("contact")} />
        <ContactSection />
      </div>
    </main>
  )
}
