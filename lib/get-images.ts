import "server-only"

import fs from "node:fs"
import path from "node:path"

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"])

function readImagesFromPublic(relPath: string): string[] {
  const abs = path.join(process.cwd(), "public", relPath)
  if (!fs.existsSync(abs)) return []
  const entries = fs.readdirSync(abs, { withFileTypes: true })
  return entries
    .filter((e) => e.isFile() && IMAGE_EXT.has(path.extname(e.name).toLowerCase()))
    .map((e) => e.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((name) => `/${relPath}/${name}`.replace(/\\/g, "/"))
}

export function getWorkImagesBySlug(slugs: readonly string[]): Record<string, string[]> {
  const out: Record<string, string[]> = {}
  for (const slug of slugs) {
    out[slug] = readImagesFromPublic(`images/work/${slug}`)
  }
  return out
}

export function getPersonalImages(): string[] {
  return readImagesFromPublic("images/personal")
}
