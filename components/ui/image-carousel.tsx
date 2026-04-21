"use client"

import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCallback, useEffect, useState } from "react"

type Size = "compact" | "feature"

type ImageCarouselProps = {
  images: string[]
  alt: string
  size?: Size
  className?: string
}

const SIZE_TOKENS: Record<Size, { aspect: string; radius: string; slideBasis: string; chevron: string }> = {
  // Inline within work timeline entries.
  compact: {
    aspect: "aspect-[4/3]",
    radius: "rounded-[16px]",
    slideBasis: "basis-full",
    chevron: "h-8 w-8",
  },
  // Featured single carousel under Beyond work.
  feature: {
    aspect: "aspect-[4/5] sm:aspect-[3/4] md:aspect-[16/10]",
    radius: "rounded-[20px]",
    // ~65% width with the next card peeking from the right.
    slideBasis: "basis-[88%] sm:basis-[78%] md:basis-[65%]",
    chevron: "h-9 w-9 md:h-10 md:w-10",
  },
}

export function ImageCarousel({ images, alt, size = "compact", className = "" }: ImageCarouselProps) {
  if (!images || images.length === 0) return null

  const tokens = SIZE_TOKENS[size]
  const isSingle = images.length === 1

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: false,
    containScroll: "trimSnaps",
    skipSnaps: false,
    duration: 22,
    watchDrag: !isSingle,
  })

  const [selected, setSelected] = useState(0)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelected(emblaApi.selectedScrollSnap())
    setCanPrev(emblaApi.canScrollPrev())
    setCanNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <div className={`relative w-full ${className}`}>
      <div ref={emblaRef} className="overflow-hidden">
        <div className={`flex ${isSingle ? "" : "gap-4 md:gap-5"}`}>
          {images.map((src, i) => (
            <div
              key={src + i}
              className={`relative shrink-0 grow-0 ${isSingle ? "basis-full" : tokens.slideBasis}`}
            >
              <div
                className={`relative ${tokens.aspect} ${tokens.radius} overflow-hidden bg-foreground/5 shadow-[0_12px_40px_-22px_rgba(0,0,0,0.55)] ring-1 ring-foreground/10`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`${alt} — ${i + 1}`}
                  loading="lazy"
                  draggable={false}
                  className="absolute inset-0 h-full w-full select-none object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {!isSingle && (
        <>
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canPrev}
            aria-label="Previous image"
            className={`absolute left-2 top-1/2 -translate-y-1/2 ${tokens.chevron} grid place-items-center rounded-full border border-foreground/15 bg-background/70 text-foreground backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-foreground/30 hover:bg-background/85 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100`}
          >
            <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canNext}
            aria-label="Next image"
            className={`absolute right-2 top-1/2 -translate-y-1/2 ${tokens.chevron} grid place-items-center rounded-full border border-foreground/15 bg-background/70 text-foreground backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-foreground/30 hover:bg-background/85 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100`}
          >
            <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
          </button>

          <div
            className="mt-3 flex items-center justify-center gap-1.5"
            role="tablist"
            aria-label="Carousel position"
          >
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === selected}
                aria-label={`Go to image ${i + 1} of ${images.length}`}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === selected ? "w-5 bg-foreground/80" : "w-1.5 bg-foreground/30 hover:bg-foreground/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
