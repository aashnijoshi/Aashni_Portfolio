"use client"

import { useReveal } from "@/hooks/use-reveal"

export function AboutSection({ scrollToSection }: { scrollToSection?: (index: number) => void }) {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-4 pt-48 md:px-12 md:pt-40 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-center">
        <div>
          <div
            className={`mb-8 transition-all duration-700 md:mb-12 ${
              isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
            }`}
          >
            <h2 className="mb-3 font-serif text-3xl font-normal leading-[1.1] tracking-tight text-foreground md:mb-4 md:text-5xl lg:text-6xl">
              beyond
              <br />
              <span className="text-foreground/40">work</span>
            </h2>
          </div>

          <div
            className={`mb-8 space-y-3 transition-all duration-700 md:mb-12 md:space-y-4 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <p className="max-w-md text-sm leading-relaxed text-foreground/90 text-left font-mono md:text-sm py-0 my-0">
              currently reading: The Art of Spending Money by Morgan Housel
            </p>
          </div>

          <div
            className={`transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "350ms" }}
          >
            <h3 className="mb-3 font-serif text-2xl font-normal text-foreground md:text-3xl">outside of work</h3>
            <p className="mb-3 text-sm text-foreground/80 md:text-base">i enjoy:</p>
            <ul className="space-y-2 text-sm md:text-base px-1 py-3 border rounded-sm border-t-0 border-b-0 border-l-0 border-r-0 shadow-none text-popover-foreground opacity-100">
              <li className="flex items-start gap-2">
                <span className="text-foreground/40">→</span>
                <a
                  href="https://open.spotify.com/user/31pjbq5rm64sybmy2atawai6qxwy?si=634789bcf90f45db"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-foreground/30 underline-offset-4 transition-colors hover:text-foreground"
                >
                  carefully curating spotify playlists
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground/40">→</span>stand up comedy
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground/40">→</span>indian pop culture
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground/40">→</span>reading substack articles
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground/40">→</span>playing my guitar
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground/40">→</span>long walks that end at a cafe
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground/40">→</span>quality time with the people i love
              </li>
            </ul>
          </div>
        </div>

        <div className="hidden lg:block lg:justify-self-start w-full max-w-xs">
          <div className="relative animate-in fade-in slide-in-from-right-6 duration-900 delay-150">
            <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "3/5" }}>
              <img
                src="/beyondwork%20Large.jpeg"
                alt="Beyond work"
                className="w-full h-full object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/25 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
