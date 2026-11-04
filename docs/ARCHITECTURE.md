# ARCHITECTURE.md

## Runtime shape

```
Browser (CRA dev :3000 / static build)
 ├── React SPA (react-router: "/" Home, "/projects/:slug" CaseStudy)
 │    ├── Lenis rAF loop (window.__lenis singleton)
 │    ├── framer-motion (reveals, plane dynamics, intro, stamp, count-up)
 │    └── WebAudio (synth SFX + ambient <Audio> singleton)
 └── fetch/axios → FastAPI :8001  (k8s ingress: /api → backend)
        ├── POST /api/contact → Emergent email proxy (managed Resend)
        └── GET  /api, /api/status (Mongo-backed, health-ish; Mongo unused by UI)
```

## Frontend engines

### PaperPlaneLayer (the signature)
1. **Geometry** — `buildPath(w,h)`: 20 sample points top→bottom, phase advances
   `1.15 + 0.65·sin(i·2.31+0.8)` (irregular wander), amplitude `0.29w ± 0.085w`,
   eased launch from centre; Catmull-Rom converted to cubic Béziers.
2. **Positioning** — CSS `offset-path: path(d)`; `offsetDistance` = spring-smoothed
   `scrollYProgress`; `offsetRotate: auto` gives 2D tangent heading.
3. **3D dynamics** — on every progress change, sample the path element at p±0.002 via
   `getPointAtLength`: curvature → bank (rotateX, ×4200 clamped ±60°), heading dx/sp →
   yaw (rotateY ×-26°). Depth cycle `sin(p·π·3.2+0.8)` drives scale 0.7–1.25, opacity,
   blur 0–2.2px, drop-shadow, and z-index 4 (behind content) ↔ 50 (in front).
   All via motion values — **zero React re-renders while scrolling**.
4. **Trail** — base dashed path (`2 9`) + solid path with `pathLength` bound to the
   same smoothed progress. Trail sits at `z-[5]` (behind sections at `z-10`); the
   plane's z lives on its outer wrapper because `transform: scale()` creates a
   stacking context.
5. **Tap-to-fly** — click → `animate(roll, 360°, 0.95s)` on rotateX + speed-line burst.

### The Press Run (IntroUnfold)
Overlay `z-[100]`: dim layer (0.3→0) → 6-panel accordion, panels `rotateY ±178° → 0`
(spring 64/15, inner folds first at 0.99s, outer 1.3s) with per-panel brightness
0.55→1 and fold-shadow gradients fading → title lockup ("The Daily Algorithm —
Tonight's paper is unfolding") in 0.1–2.6s → plane crosses (-30vw→108vw) with speed
lines → vignette → overlay fade 2.7–3.3s. `onAnimationComplete` + timeout dismiss;
click = instant skip; `prefers-reduced-motion` skips entirely.

### Sound design (all synthesized, zero assets)
- `playPressSound()`: whoosh (noise buffer → bandpass 220→2600→160Hz over 1.2s),
  6 paper crinkles (35ms highpass ticks), settle thump (sine 120→55Hz).
- `thump()` in Achievements for the stamp.
- Ambient jazz: `utils/ambient.js` singleton `<Audio src="/audio/jazz-loop.mp3" loop>`,
  volume fades (0→0.14 over 1.5s), starts on first pointer/key/wheel/touch (autoplay
  policy), preference persisted (`localStorage.ambient`).

### Theming
CSS vars in `:root` / `.night` (html class toggled by ThemeToggle, persisted
`localStorage.edition`). Tailwind maps: `ink, paper, card, paper2, ink-soft,
rule-light, azure` → vars. `--card` must remain an HSL triplet (shadcn maps
`card: hsl(var(--card))`). Print CSS forces day values and shows only
`.print-snapshot`.

### View switch
`Home` reads `localStorage.view`; `"nobs"` renders the plain `NoBS` portfolio
(same content data), anything else renders the newspaper. The ambient audio singleton
lives in `utils/ambient.js` so the soundtrack survives the switch.

## Backend (`backend/server.py`, single file)

- FastAPI + CORS; router prefix `/api`.
- **POST /api/contact**: pydantic validation → email-format regex → in-memory
  rate limit (5/min/IP) → fixed subject, server-side HTML template with `escape()`d
  fields → `send_email()` → Emergent proxy `POST {EMAIL_BASE_URL}/api/v1/email/send`
  with `X-Email-Key`. Recipient is always env `OWNER_EMAIL`; `EMAIL_REPLY_TO` set as
  contact email. Guardrails (`_assert_safe_email`): no forms/inputs in HTML, no
  credential-bait phrases, https-only links, no shorteners/raw-IP hosts, anchor-text
  spoof check.
- **GET /api** hello, **GET/POST /api/status** Mongo demo (indexes built in a
  background task on startup).
- Env: `MONGO_URL`, `DB_NAME`, `CORS_ORIGINS`, `EMERGENT_EMAIL_KEY`,
  `EMAIL_FROM_NAME`, `EMAIL_REPLY_TO`, `OWNER_EMAIL`.

## Data flow for content edits

`content.js` → every section component → case-study slugs derived from titles.
No CMS, no DB writes for content.

## Verification checklist (pre-deploy)

1. `curl` against `REACT_APP_BACKEND_URL`: `/` 200, `/api/` 200, `/api/status` 200,
   `/api/contact` 200 valid / 422 invalid, `/audio/jazz-loop.mp3` 200,
   `/projects/engram` 200 (SPA fallback), `/favicon.svg` 200.
2. Screenshots 1440×900 + 390×844, scroll-through (reveals), check: intro plays &
   dismisses, plane + trail z-order, stamp, quote, night mode, No BS switch, no
   overflow-x, no console errors.
