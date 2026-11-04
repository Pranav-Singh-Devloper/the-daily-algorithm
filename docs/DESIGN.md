# DESIGN.md — The Daily Algorithm design system

A classic broadsheet re-set for the web: ink on aged paper, editorial serif display,
condensed kickers, and one calm accent. Two editions — Day and Evening — driven by CSS
custom properties.

## 1. Palette

| Token         | Day               | Evening (`.night`) | Use                                  |
| ------------- | ----------------- | ------------------ | ------------------------------------ |
| `--paper`     | `#f9f7f1`         | `#101419`          | page background, plane body          |
| `--paper-2`   | `#f3efe6`         | `#171d25`          | hover tint rows                      |
| `--card`      | `hsl 0 0% 100%`   | `hsl 216 24% 11%`  | cards, honours box, forms (shadcn)   |
| `--ink`       | `#121212`         | `#e8e4d8`          | text, rules, plane strokes           |
| `--ink-soft`  | `#5a5a5a`         | `#a3adb8`          | secondary text, folio lines          |
| `--rule-light`| `#d2cec4`         | `#3a434e`          | hairline dividers                    |
| `--azure`     | `#1a5d8f`         | `#4d84c0`          | THE accent: kickers, stats, stamp    |
| `gold`        | `#c9a227`         | (unused)           | reserved ornament                    |

History: pure monochrome → editorial red `#B3231F` (rejected: "intimidating") → pine
teal `#136A58` (rejected: "weird") → **azure blue**. Accent always ≤ ~10% of surface.

## 2. Typography (Google Fonts)

| Face              | Role                          | Notes                              |
| ----------------- | ----------------------------- | ---------------------------------- |
| **Fraunces**      | masthead + all display heads  | `font-masthead` / `font-heading`; opsz axis, 900 black for heroes |
| **Newsreader**    | body / editorial copy         | justified + hyphens in columns     |
| **Barlow Condensed** | kickers, labels, CTAs      | bold, uppercase, tracked 0.18–0.3em |
| **JetBrains Mono**| folio lines, dates, meta      | 9–11px, uppercase, wide tracking   |
| Archivo           | No BS edition body/UI         | clean grotesque for the plain view |
| Cinzel Decorative | (legacy fallback)             | original masthead face             |

Scale: hero name `text-5xl/6xl/7xl`, masthead `text-8xl`, section heads `2xl–5xl`,
body `15–18px` (Newsreader), meta `9–11px` mono.

## 3. Newspaper devices

- Dateline row: `VOL. I · NO. 1 | date | PRICE: ONE OFFER` + control cluster
  (JAZZ · NIGHT · NO BS with tooltip).
- Double rules (`border-double`), hairlines (`--rule-light`), column rules via
  `[column-rule]`, drop caps (`.dropcap`, Fraunces 3.5em).
- Halftone photography: `grayscale + contrast`, `mix-blend multiply` over white card,
  radial-dot overlay `.halftone::after`; night = `screen` blend, no invert (photo shot
  on black melts into card).
- Aged paper: fixed `z-0` texture (SVG crease lines + stains at 0.02–0.05 alpha + noise),
  night variant blends `screen` at 0.35; cursor-reactive sheen (radial gradient at
  `--mx/--my`, `soft-light` day / `screen` night) + 10px texture parallax drift.

## 4. Motion catalog

| Piece              | Spec |
| ------------------ | ---- |
| Lenis              | `lerp 0.09`, smoothWheel; anchor nav via `window.__lenis.scrollTo` |
| MaskedLines        | child `y: 112% → 0`, 0.95s, ease `[0.22,1,0.36,1]`, 0.13s stagger; observer on clip container |
| Reveal             | `y 26 → 0` + fade, 0.8s, once, amount 0.15 |
| Paper plane        | 20-pt organic wander path (irregular phase 1.15±0.65, amplitude 0.29w±0.085w), Catmull-Rom→Bézier; spring(70, 20, 0.7); `offset-path` + `offsetRotate: auto`; bank = curvature×4200 clamped ±60° (rotateX), yaw = heading×-26° (rotateY), perspective 700; depth cycle `0.5+0.5·sin(p·π·3.2+0.8)` → scale 0.7–1.25, opacity 0.45–1, blur 0–2.2px, drop-shadow, z 4↔50 |
| Plane trail        | dashed base (`2 9`, day 0.22 / night 0.15) + solid trail `pathLength` 0→1 (day 0.5 / night 0.3) |
| Barrel roll (tap)  | roll 0→360°, 0.95s `[0.45,0,0.55,1]`, red→azure speed lines burst |
| The Press Run      | dim 0.3→0; 6 panels rotateY ±178→0 spring(64,15) staggered inner-out; brightness 0.55→1; fold shadows fade; title lockup in/out; plane x -30vw→108vw with speed lines; vignette; overlay fade 2.7→3.3s |
| Sounds (WebAudio)  | whoosh: noise→bandpass 220→2600→160Hz; crinkles: 6×35ms highpass ticks; thumps: sine 95–120→48–55Hz |
| Stamp              | scale 2.6→1, rotate -26→-12°, spring(330,17), thump sine 95→48Hz |
| CountUp            | 0→value 1.5s `[0.22,1,0.36,1]`, `once` inView, memoised |
| Hover language     | card lift `-translate-y-1` + hard offset shadow `8–10px 0 azure`; ticker pauses on hover; skills slide 5px; links invert to azure; image scale 1.05 |
| Cursor             | fountain-pen nib at pointer, spring(560,42), press scale 0.85 + ink ripple, hot lift 1.15, rotate -35→-30 |

## 5. Layout rules

- One padding rhythm: `py-12 sm:py-20` per section, `px-4 sm:px-8` page gutters,
  `max-w-6xl` (4xl pull-quote/honours, 3xl no-BS) centred containers.
- Grids: experiences 2-col, projects lead 2-col + secondary 2-col, skills 3-col,
  stats 4-col (2-col mobile) — all with hairline dividers, equal-height cards.
- Mobile 390px is first-class: every grid collapses, headline wraps, no fixed widths.
- `data-testid` on every interactive/critical element (kebab-case).

## 6. Print

`@media print` → only `.print-snapshot` visible, absolutely positioned, day palette
forced, grain hidden.
