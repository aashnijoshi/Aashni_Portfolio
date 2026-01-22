"use client"

import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { WorkSection } from "@/components/sections/work-section"
import { ServicesSection } from "@/components/sections/services-section"
import { AboutSection } from "@/components/sections/about-section"
import { ContactSection } from "@/components/sections/contact-section"
import { MagneticButton } from "@/components/magnetic-button"
import { useRef, useEffect, useState } from "react"

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const touchStartY = useRef(0)
  const touchStartX = useRef(0)
  const shaderContainerRef = useRef<HTMLDivElement>(null)
  const scrollThrottleRef = useRef<number>()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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
      if (checkShaderReady()) {
        clearInterval(intervalId)
      }
    }, 100)

    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 1500)

    return () => {
      clearInterval(intervalId)
      clearTimeout(fallbackTimer)
    }
  }, [])

  const scrollToSection = (index: number) => {
    if (!scrollContainerRef.current) return

    if (isMobile) {
      // Mobile: scroll vertically to section
      const sections = scrollContainerRef.current.children
      if (sections[index]) {
        const section = sections[index] as HTMLElement
        const container = scrollContainerRef.current
        const offsetTop = section.offsetTop

        container.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    } else {
      // Desktop: scroll horizontally
      const sectionWidth = scrollContainerRef.current.offsetWidth
      scrollContainerRef.current.scrollTo({
        left: sectionWidth * index,
        behavior: "smooth",
      })
    }
    setCurrentSection(index)
  }

  useEffect(() => {
    // Only enable touch navigation on desktop
    if (isMobile) return

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
      touchStartX.current = e.touches[0].clientX
    }

    const handleTouchMove = (e: TouchEvent) => {
      const deltaY = Math.abs(e.touches[0].clientY - touchStartY.current)
      const deltaX = Math.abs(e.touches[0].clientX - touchStartX.current)

      // Only prevent default if moving vertically with intent (> 30px)
      if (deltaY > 30 && deltaY > deltaX) {
        e.preventDefault()
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY
      const touchEndX = e.changedTouches[0].clientX
      const deltaY = touchStartY.current - touchEndY
      const deltaX = touchStartX.current - touchEndX

      // Reduced threshold from 50 to 40 for more responsive navigation
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 40) {
        if (deltaY > 0 && currentSection < 4) {
          scrollToSection(currentSection + 1)
        } else if (deltaY < 0 && currentSection > 0) {
          scrollToSection(currentSection - 1)
        }
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("touchstart", handleTouchStart, { passive: true })
      container.addEventListener("touchmove", handleTouchMove, { passive: false })
      container.addEventListener("touchend", handleTouchEnd, { passive: true })
    }

    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart)
        container.removeEventListener("touchmove", handleTouchMove)
        container.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [currentSection, isMobile])

  useEffect(() => {
    // Only enable wheel navigation on desktop
    if (isMobile) return

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()

        if (!scrollContainerRef.current) return

        scrollContainerRef.current.scrollBy({
          left: e.deltaY,
          behavior: "instant",
        })

        const sectionWidth = scrollContainerRef.current.offsetWidth
        const scrollLeft = scrollContainerRef.current.scrollLeft
        const newSection = Math.round(scrollLeft / sectionWidth)

        if (newSection !== currentSection) {
          setCurrentSection(newSection)
        }
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel)
      }
    }
  }, [currentSection, isMobile])

  useEffect(() => {
    // Only track horizontal scroll sections on desktop
    if (isMobile) return

    const handleScroll = () => {
      if (scrollThrottleRef.current) return

      scrollThrottleRef.current = requestAnimationFrame(() => {
        if (!scrollContainerRef.current) {
          scrollThrottleRef.current = undefined
          return
        }

        const sectionWidth = scrollContainerRef.current.offsetWidth
        const scrollLeft = scrollContainerRef.current.scrollLeft
        const newSection = Math.round(scrollLeft / sectionWidth)

        if (newSection !== currentSection && newSection >= 0 && newSection <= 4) {
          setCurrentSection(newSection)
        }

        scrollThrottleRef.current = undefined
      })
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true })
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll)
      }
      if (scrollThrottleRef.current) {
        cancelAnimationFrame(scrollThrottleRef.current)
      }
    }
  }, [currentSection, isMobile])

  return (
    <main className="relative h-screen w-full overflow-x-hidden bg-background md:overflow-hidden">
      <CustomCursor />
      <GrainOverlay />

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
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-background/80 px-4 py-4 backdrop-blur-md transition-opacity duration-700 sm:px-6 sm:py-5 md:bg-transparent md:px-12 md:py-6 md:backdrop-blur-none ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <button onClick={() => scrollToSection(0)} className="transition-transform hover:scale-105">
          <span className="font-serif text-lg font-normal tracking-tight text-foreground">Aashni Joshi</span>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {["Home", "Work", "Now", "Beyond", "Contact"].map((item, index) => (
            <button
              key={item}
              onClick={() => scrollToSection(index)}
              className={`group relative font-sans text-sm font-medium transition-colors ${
                currentSection === index ? "text-foreground" : "text-foreground/80 hover:text-foreground"
              }`}
            >
              {item}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300 ${
                  currentSection === index ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}
        </div>

        <MagneticButton variant="secondary" onClick={() => scrollToSection(4)}>
          Get in Touch
        </MagneticButton>
      </nav>

      <div
        ref={scrollContainerRef}
        data-scroll-container
        className={`relative z-10 flex h-screen flex-col overflow-y-auto transition-opacity duration-700 md:flex-row md:overflow-x-auto md:overflow-y-hidden ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Hero Section */}
        <section className="relative flex min-h-screen w-full items-end justify-between px-4 pb-8 pt-16 sm:px-6 sm:pb-12 sm:pt-20 md:shrink-0 md:px-12 md:pb-24 md:pt-24 lg:px-16">
          {/* Mobile Profile Picture - Top Right */}
          <div className="absolute right-4 top-20 h-24 w-24 shrink-0 overflow-hidden rounded-full sm:right-6 md:hidden">
            <img
              src="/myphotoforfirstpage.jpg"
              alt="Aashni Joshi"
              className="h-full w-full object-cover object-[center_35%]"
            />
          </div>

          <div className="max-w-4xl pb-6">
            <h1 className="mb-6 animate-in fade-in slide-in-from-bottom-8 font-serif text-6xl font-normal leading-[1.1] tracking-tight text-foreground duration-1000 sm:text-7xl md:text-7xl lg:text-8xl xl:text-9xl">
              <span className="text-balance">Aashni Joshi</span>
            </h1>
            <p className="mb-6 max-w-2xl animate-in fade-in slide-in-from-bottom-4 text-base leading-relaxed text-foreground/90 duration-1000 delay-200 sm:mb-8 sm:text-lg md:text-xl">
              <span className="text-pretty">
                {
                  "data science + astrophysics @ UC berkeley. i like building things i'm curious about, studying the universe, and learning from the people i meet along the way."
                }
              </span>
            </p>
            <div className="mb-6 flex animate-in fade-in slide-in-from-bottom-4 gap-4 duration-1000 delay-300">
              <a
                href="https://www.linkedin.com/in/aashnijoshi"
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition-colors hover:text-foreground text-sm text-secondary"
              >
                linkedin
              </a>
              <a
                href="https://github.com/aashnijoshi"
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition-colors hover:text-foreground text-sm text-secondary"
              >
                github
              </a>
            </div>
            <div className="flex animate-in fade-in slide-in-from-bottom-4 flex-col gap-4 duration-1000 delay-400 sm:flex-row sm:items-center">
              <MagneticButton size="lg" variant="primary" onClick={() => scrollToSection(1)}>
                my work
              </MagneticButton>
              <MagneticButton size="lg" variant="secondary" onClick={() => scrollToSection(4)}>
                say hi
              </MagneticButton>
            </div>
          </div>

          <div className="hidden lg:block lg:flex-1 lg:max-w-sm xl:max-w-md">
            <div className="relative animate-in fade-in slide-in-from-right-6 duration-1000 delay-200 transition-transform hover:-translate-y-1">
              <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "3/4.2" }}>
                <img
                  src="/myphotoforfirstpage.jpg"
                  alt="Aashni Joshi"
                  className="w-full h-[105%] object-cover object-top"
                  style={{ objectPosition: "center top" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 animate-in fade-in duration-1000 delay-500 md:block">
            <div className="flex items-center gap-2">
              <p className="font-mono text-xs text-foreground/80">Scroll to explore</p>
              <div className="flex h-6 w-12 items-center justify-center rounded-full border border-foreground/20 bg-foreground/15 backdrop-blur-md">
                <div className="h-2 w-2 animate-pulse rounded-full bg-foreground/80" />
              </div>
            </div>
          </div>
        </section>
        <WorkSection />
        <ServicesSection />
        <AboutSection scrollToSection={scrollToSection} />
        <ContactSection />
      </div>

      <style jsx global>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  )
}
