import { HomePage } from "@/components/home-page"
import { getPersonalImages, getWorkImagesBySlug } from "@/lib/get-images"

// Slugs must match the timeline entries in components/sections/work-section.tsx
// and the folder names under public/images/work/<slug>/.
const WORK_SLUGS = ["apple", "hyperspell", "nasa-ames", "stanford-xlab", "people-ai", "vast-space"] as const

export default function Page() {
  const workImagesBySlug = getWorkImagesBySlug(WORK_SLUGS)
  const personalImages = getPersonalImages()

  return <HomePage workImagesBySlug={workImagesBySlug} personalImages={personalImages} />
}
