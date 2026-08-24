# Project previews

Drop a PNG named `<slug>.png` here to override the auto-generated screenshot.

Slugs in use:
- spark-ray-eks.png
- medicare-freshness.png
- kai.png
- orbit.png
- kessler-os.png

Fallback chain (handled in `components/sections/projects-section.tsx`):
1. This local file, if it renders as a valid image.
2. A live screenshot from `api.microlink.io` of the project's `liveUrl`.
3. A branded gradient placeholder with the project title.

Projects without a `liveUrl` (e.g. `spark-ray-eks`) skip step 2 — drop a PNG
here or the card stays on the gradient placeholder.
