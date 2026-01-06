"use client"

import { Mail, Linkedin, Github } from "lucide-react"
import { useReveal } from "@/hooks/use-reveal"

export function ContactSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-4 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:gap-16 lg:gap-24">
          <div className="flex flex-col justify-center">
            <div
              className={`mb-6 transition-all duration-700 md:mb-12 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
              }`}
            >
              <h2 className="mb-2 font-serif text-4xl font-normal leading-[1.05] tracking-tight text-foreground md:mb-3 md:text-7xl lg:text-8xl">
                let's
                <br />
                chat
              </h2>
              <p className="font-mono text-xs text-foreground/60 md:text-base">/ get in touch</p>
            </div>

            <div className="space-y-4 md:space-y-8">
              <a
                href="mailto:aashnijoshi@berkeley.edu"
                className={`group block transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <div className="mb-1 flex items-center gap-2">
                  <Mail className="h-3 w-3 text-foreground/60" />
                  <span className="font-mono text-xs text-foreground/60">Email</span>
                </div>
                <p className="text-foreground transition-colors group-hover:text-foreground/70 font-mono text-xl">
                  aashnijoshi@berkeley.edu
                </p>
              </a>

              <div
                className={`transition-all duration-700 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: "350ms" }}
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="font-mono text-xs text-foreground/60">Connect</span>
                </div>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://www.linkedin.com/in/aashnijoshi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-base text-foreground transition-colors hover:text-foreground/70 md:text-xl"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/aashnijoshi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-base text-foreground transition-colors hover:text-foreground/70 md:text-xl"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                  <a
                    href="https://x.com/aashnijoshi_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-base text-foreground transition-colors hover:text-foreground/70 md:text-xl"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    X (Twitter)
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Simple message */}
          <div className="flex flex-col justify-center">
            <div
              className={`transition-all duration-700 ${
                isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <p className="mb-4 text-lg leading-relaxed text-foreground/90 md:text-xl font-sans">
                always down for a coffee!
                <span className="ml-2 align-middle text-[12px]" style={{ color: "#FFB6C1" }}>
                  ❤
                </span>
              </p>
              <p className="text-base leading-relaxed text-foreground/70 md:text-base">
                whether you're looking for a collaborator, have an interesting problem to solve, or just want to say hi, feel free to reach out :)
              </p>
            </div>

            <div
              className={`mt-8 transition-all duration-700 md:mt-12 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: "550ms" }}
            >
              
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
