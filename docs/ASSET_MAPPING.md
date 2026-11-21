# Asset Mapping — Pratyush Basu Portfolio

Source folder: `person-video-img/` (Google Flow / Veo frame export).  
**Rule:** Original files are never renamed or deleted. Public copies are used by the app.

## Inventory

| Asset set | Type | Count | Dimensions | Aspect | Approx. size |
|---|---|---|---|---|---|
| `person-video-img/ezgif-frame-001.png` … `ezgif-frame-238.png` | PNG sequence | 238 | 1280×720 | 16:9 (1.778) | ~155.5 MB total |
| Videos (mp4/webm/mov) | — | 0 found | — | — | — |
| WebP / JPG originals | — | 0 found | — | — | — |
| `public/person-video-img/ezgif-frame-001.webp` … `238.webp` | WebP copies (originals untouched) | 238 | 1280×720 | 16:9 | ~8.0 MB total |

## Sequence analysis

- Cinematic portrait of Pratyush Basu (glasses, blazer, purple shirt).
- Lighting: magenta / violet / red rim light on dark atmospheric background.
- Motion: subtle head/hand movement (adjusting glasses) across frames — suitable as an animated hero visual.
- Watermark: small “Veo” mark in some frames (bottom-right).

## Public copies (do not replace originals)

| Public path | Source | Role |
|---|---|---|
| `/images/portrait/hero-still-01.png` | `ezgif-frame-001.png` | Fallback / early pose |
| `/images/portrait/hero-still-80.png` | `ezgif-frame-080.png` | **Primary hero portrait** (strong pose + lighting) |
| `/images/portrait/hero-still-120.png` | `ezgif-frame-120.png` | Alternate hero / depth layer |
| `/images/portrait/about-portrait.png` | `ezgif-frame-150.png` | About section portrait |

Optional (if encoded later):

| Public path | Source | Role |
|---|---|---|
| `/videos/hero-portrait.mp4` | Encoded from full PNG sequence | Animated hero background / portrait loop |
| `/videos/hero-portrait.webm` | Encoded from full PNG sequence | Lightweight animated hero |

## Section mapping

| Section | Asset(s) | Usage |
|---|---|---|
| **Hero / persistent background** | `sequence-webp/ezgif-frame-001.webp` … `238.webp` | Scroll-driven Canvas sequence (PNG originals preserved in `person-video-img/`) |
| **Hero atmosphere** | Sequence lighting cues + procedural R3F particles/rings | Orbital rings, particles, floating tech cards (code-generated) |
| **About** | `about-portrait.png` | Side portrait |
| **Projects** | Placeholder gradient thumbnails until real screenshots are supplied | Project cards |
| **Chatbot orb** | Procedural CSS/R3F orb | Floating Pratyush AI |
| **Resume** | Place PDF in `public/resume/Pratyush_Basu_Resume.pdf` when available | Download Resume buttons |

## Hero selection rationale

**Primary still:** `ezgif-frame-080.png`  
Clear facial identity, dynamic glasses pose, strongest cinematic lighting match for the purple / violet theme.

**Animation strategy:**  
Prefer a compressed video loop encoded from the 238-frame sequence. Until a video exists, the hero uses the primary still with a 2.5D floating R3F treatment and a lightweight frame-step player that samples the original sequence without copying all frames into `public/`.

## Notes

- No project screenshots, icons pack, or resume PDF were present in the repo at inspection time.
- Contact / social URLs are taken from the LinkedIn PDF profile export, not invented.
