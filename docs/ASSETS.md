# ASSETS.md — asset inventory

## Typography (Google Fonts, CDN)

| Family             | Weights/Styles                      | Used for                    |
| ------------------ | ----------------------------------- | --------------------------- |
| Fraunces           | opsz 9..144; 500/600/700/900 + ital | masthead, display headings, stamp numerals |
| Playfair Display   | 400–900 + italics                   | fallback serif              |
| Newsreader         | opsz 6..72; 400/500/600 + italics   | body copy                   |
| Barlow Condensed   | 500–800                             | kickers, labels, buttons    |
| JetBrains Mono     | 400/500/700                         | folio/meta                  |
| Archivo            | 400–800                             | No BS edition               |
| Cinzel Decorative  | 700/900                             | legacy fallback only        |

Link lives in `frontend/public/index.html` (preconnect + one stylesheet URL).

## Images

| Asset                | Source / File | Treatment |
| -------------------- | ------------- | --------- |
| Portrait of Pranav   | user-uploaded `IMG_5528 - Edited.png` — `https://customer-assets-wrfwihn1.emergentagent.net/job_daily-ai-dispatch--6jak4ttr/artifacts/e8f48a022346f43f_IMG_5528%20-%20Edited.png` (URL also in `content.js → PERSON.portrait`) | day: grayscale+multiply halftone plate; night: screen blend, black bg melts into card |
| Project lead image (Engram) | Unsplash `photo-1664854953181-b12e6dda8b7c` | halftone plate, "★ Lead Story" tab |
| Project image (Nexus)       | Unsplash `photo-1573528839587-71883908b252` | halftone plate |
| Project image (Sentiment)   | Unsplash `photo-1647003439039-d90d730f2773` | halftone plate |

To swap: edit `frontend/src/data/content.js`. Keep `object-top` framing on the
portrait for the parallax crop.

## Favicon / logo

- `frontend/public/favicon.svg` — original paper-plane mark (ink line-art on paper),
  drawn for this project. Referenced via `%PUBLIC_URL%/favicon.svg`.

## Audio

- `frontend/public/audio/jazz-loop.mp3` — **user-supplied track** ("Relaxing Jazz in
  Corner Coffee Shop…") trimmed to **110 s** starting at 0:25, 112 kbps, with 3 s
  fade-in and 4 s fade-out so the `loop=true` playback breathes. Generated via ffmpeg
  from the uploaded MP3 (originally 190 MB).
- UI: JAZZ toggle w/ animated EQ bars (`components/AmbientAudio.jsx` +
  `.eq-bars` CSS), singleton player in `src/utils/ambient.js`.
- SFX (no files): whoosh/crinkles/thump synthesized with WebAudio in
  `IntroUnfold.jsx` + `Achievements.jsx`.

## Icons

- `lucide-react` only: `Moon`, `Sun` (ThemeToggle), `Music`, `VolumeX` (AmbientAudio).
- Ornament glyphs (✦, ★, →, ↑, ☎/✉ in snapshot) are typographic, not emoji.

## Textures (inline SVG data-URIs in `index.css`)

- Paper noise: feTurbulence fractalNoise 140×140 tile.
- Creases & stains: 900×900 SVG — 4 fold lines + 2 diagonals (alpha 0.02–0.05),
  3 stain ellipses; day = ink strokes, night = cream strokes w/ `screen` blend.

## Fonts of the trade — palette quick copy

```
Day:   paper #f9f7f1 · card #ffffff · ink #121212 · soft #5a5a5a · rules #d2cec4 · azure #1a5d8f
Night: paper #101419 · card #161c24 · ink #e8e4d8 · soft #a3adb8 · rules #3a434e · azure #4d84c0
```
