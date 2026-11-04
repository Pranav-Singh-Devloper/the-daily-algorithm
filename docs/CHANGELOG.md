# CHANGELOG

All notable changes, newest first. Full product context: `memory/PRD.md` (not committed).

- ## v16.1 — 2026-11-04
- Cursor slimmed to just the fountain-pen nib (no barrel), same press/ripple/hover manners.

## v16 — 2026-11-04
- Fountain-pen cursor (nib at pointer, ink ripple on click, lift on interactive, fine-pointer only).
- Azure press-progress bar fixed at top, spring-smoothed.
- Pull-quote break between Experiences and Projects.
- "APPROVED — FOR HIRING" rubber stamp on honours box with thump sound.
- Placeholder case-study pages at `/projects/:slug` (engram, nexus, movie), linked from project titles.
- Fixed missing React import in Home (ErrorBoundary caught it).

## v15 — 2026-11-04
- Ambient jazz: uploaded track trimmed to a 110 s loop (fades, 112 kbps), site-wide at volume 0.14,
  starts on first interaction, JAZZ toggle with EQ-bars indicator in both editions, persisted.

## v14 — 2026-11-04
- Night portrait fixed: screen blend instead of invert — photo's black background melts into the card.

## v13 — 2026-11-04
- "The Press Run" intro: title lockup, 6-panel paper accordion with lighting sweeps, plane fly-by,
  3-layer synthesized sound (whoosh/crinkles/thump), click-to-skip, reduced-motion skip.
- Fixed StrictMode timer bug that left the intro overlay stuck.

## v12 — 2026-11-04
- Real portrait wired into the front page (halftone plate, object-top framing, FIG 1.1 caption).

## v11 — 2026-11-04
- Night clarity: honours `bg-[#FFFFFF]` → `bg-card`; `--card` moved to HSL triplets so shadcn's
  `hsl(var(--card))` resolves; opaque experience cards; night texture 0.55→0.35, sheen softened;
  `--ink-soft` brightened.

## v10 — 2026-11-04
- Night parity for readability fixes: theme-aware trail opacity, theme-aware intro panels.

## v9 — 2026-11-04
- Texture + sheen moved behind content (z-0/z-1); plane trail moved behind cards (z-[5], 0.5).

## v8 — 2026-11-04
- Hero headline is "PRANAV SINGH"; No BS tooltip; "Press Run" intro v1 (unfold + whoosh);
  aged-paper cursor-reactive texture. Fixed stuck-overlay StrictMode bug.

## v7 — 2026-11-04
- No BS mode: plain recruiter-first portfolio view, persisted, day/night aware.

## v6.1 — 2026-11-04
- Fixed count-up restart loop (unstable effect deps).

## v6 — 2026-11-04
- Evening Edition: full dark theme via CSS vars, night-press photos, persisted.

## v5 — 2026-11-04
- Azure blue accent (red and teal rejected by user); Résumé Snapshot (print-only);
  live contact form via FastAPI + managed Resend.

## v4 — 2026-11-04
- Pine accent; Fraunces typography; interactive hover language; count-up stats.

## v3 — 2026-11-04
- Cinematic take-off + tap-to-fly barrel roll; recruiter "By the Numbers" band;
  azure-free monochrome era ends.

## v2 — 2026-11-04
- Real resume data merged from user PDFs (Slay Health, MA Studio, Engram, Nexus, achievements).

## v1 — 2026-11-04
- First edition: newspaper design system, paper-plane scroll engine, all sections,
  marquee, masked reveals, parallax portrait, mailto contact.
