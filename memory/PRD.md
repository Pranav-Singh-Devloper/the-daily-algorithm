# PRD — The Daily Algorithm (Newspaper Editorial Portfolio)

## Original Problem Statement
Build a portfolio for a student aspiring to be an AI/ML engineering intern (exploring ML, GenAI, deep learning roles). Design: extremely aesthetic, minimal, modern classic-newspaper editorial. Fully responsive (laptop + mobile), smooth, no lag, storytelling scroll narration led by an interactive paper aero-plane tied to scroll. Sections: About, Experiences, Projects, Curricular Achievements, Skills/What I Offer, Contact. Goal: land an internship/full-time role at an AI firm.

## User Choices (from ask_human)
- Realistic placeholders for now (real resume content to be swapped later)
- Pure monochrome ink palette (black on aged cream)
- Hand-drawn line-art paper plane with dashed flight trail following scroll
- Section order: About → Experiences → Projects → Achievements → Skills → Contact
- Contact: email + LinkedIn + GitHub (placeholders)

## Architecture
- Frontend-only React (CRA + craco) SPA. No backend routes or DB needed; contact form composes a mailto: draft.
- Lenis smooth momentum scrolling; framer-motion reveals; CSS offset-path scroll engine for the plane.
- Key files: src/App.js (Lenis + ErrorBoundary), src/pages/Home.jsx, src/components/{PaperPlaneLayer,Masthead,About,Experiences,Projects,Achievements,Skills,Contact,Footer,Reveal}.jsx, src/data/content.js (all copy in one place for easy swap).

## Design System
- Paper #F9F7F1, ink #121212, rules #D2CEC4. Fonts: Cinzel Decorative (masthead), Playfair Display (headlines), Newsreader (body), Barlow Condensed (kickers), JetBrains Mono (folio).
- Newspaper devices: dateline, masthead, double rules, drop cap, justified 2-col editorial text with column rule, halftone photo treatment, grain overlay, classified-ad grid, gazette notice box, almanac tickboxes, telegram form, slow marquee ticker.

## Signature Interactions
- Paper plane (v2, 3D flight system): organic wander path (irregular phase/amplitude) spanning the document; plane rendered as two-tone 3/4-view line art with CSS 3D — banks into turns (rotateX from path curvature), yaws toward/away from viewer (rotateY from heading), under a 700px perspective. Depth cycle (~1.5 passes down the page) drives scale 0.7–1.25, opacity, blur and z-index so it flies BEHIND cards/headlines (z=4) then in FRONT (z=50). All dynamics updated imperatively via useMotionValueEvent (zero re-renders). Solid trail grows behind plane via pathLength.
- Masked line-by-line headline reveals (observe clip container, propagate variants to inner line).
- Parallax halftone portrait; hover inversions on nav/links/buttons.

## Implemented (2026-11-03)
- All 7 sections + footer, plane scroll engine, marquee, masked reveals, parallax, mailto contact form, favicon paper-plane mark, full mobile layout, data-testids on all interactive elements.
- Verified: desktop 1440 + mobile 390 screenshots, no overflow-x, all reveals firing, plane tracking scroll; fixed masked-reveal IntersectionObserver bug and footer path overlap.
- v2 (2026-11-03): Real resume data merged from user PDFs (Pranav Singh, Slay Health, MA Studio, Engram/Nexus/Sentiment projects, achievements, skills).
- v3 (2026-11-03): Cinematic take-off intro (plane unfolds at masthead and lifts off over 2.4s, skipped under prefers-reduced-motion); tap-to-fly barrel roll with speed lines; recruiter-first "By the Numbers" hero stat band (19 agents, ~300ms TTFT, 250+ problems, 2 internships); key phrases highlighted via ##-markup Rich component; fixed plane z-index stacking so front/back depth actually renders above/below content.
- v4 (2026-11-03): Accent changed from red to calm deep pine teal after user feedback ("red too intimidating"); typography modernized with Fraunces display serif for masthead + all headlines; interactivity pass — hover-lift cards with hard offset shadows, count-up stat numbers, pausable news ticker, project image zooms, sliding skill rows, achievement row tints, focus-glow form inputs, fading halftone overlays, tag hovers.
- v5 (2026-11-03): Accent moved to deep azure blue (#1A5D8F) per user ("green is also weird"); Résumé Snapshot section added (3-column print-only recruiter sheet + Print/Save PDF button using print CSS); live contact form — POST /api/contact via FastAPI + Emergent managed Resend email (fixed server-side template, recipient OWNER_EMAIL from env, per-IP rate limit, guardrail gate); sonner toast confirmations. Verified end-to-end: curl 202/422 responses + UI submission toast with real email delivered to owner inbox.
- v6 (2026-11-04): Evening Edition — dark-ink night theme toggle in masthead dateline (lucide Moon/Sun), persisted via localStorage ("edition" key). All colors migrated to CSS variables (--paper/--ink/--card/--paper-2/--ink-soft/--rule-light/--azure) mapped through Tailwind; night values: paper #101419, ink #e8e4d8, azure #4d84c0; halftone photos flip to screen-blend inverted "night press" look; smooth 0.5s theme transition; print always forces day values. Verified day/night desktop + mobile night, persistence after reload, no overflow.
- v6.1 (2026-11-04): Fixed glitching count-up — unstable match object in useEffect deps restarted the animation every render; now memoized with onComplete pinning the final value. Verified: stats settle at 19 / ~300ms / 250+ / 2 and stay.
- v7 (2026-11-04): No BS mode — toggle in masthead dateline ("No BS") swaps the newspaper for a clean straight-talking portfolio (Archivo sans, plain sections: stats, experience, projects, skills, education, achievements, email CTA), same content.js data, persists via localStorage ("view" key), "Theatrics on →" returns to the paper, respects day/night vars. Verified both modes desktop + mobile + night, persistence, round-trip toggle.
- v8 (2026-11-04): Hero headline is now "PRANAV SINGH" (display size) with the seeking-line as secondary headline; No BS button got a crisp hover tooltip ("Straight résumé, zero theatre — the plain-paper edition for busy recruiters"); IntroUnfold — every load/reload plays a 2.7s cinematic: paper plane flies across a folded-paper overlay with a synthesized WebAudio whoosh (no asset; silent if autoplay blocked), four paper panels unfold from the centre fold revealing the site, click to skip, skipped under prefers-reduced-motion (fixed StrictMode timer-clear bug that left the overlay stuck); background upgraded to aged-paper texture (grain + creases + stains data-URI SVG, day/night variants) that reacts to the cursor — a light sheen follows the pointer and the texture drifts with it via rAF-throttled CSS vars.
- v9 (2026-11-04): Readability fix — paper texture + sheen moved from above the content (z-40/41) to the background (z-0/1) so text renders crystal clear on top; plane trail moved from z-30 to z-[5] with opacity 0.5 so it passes behind cards and text instead of cutting through them (plane itself keeps its dynamic front/behind z). Verified day + night at the experiences section: no line crosses text, cards occlude the trail.
- v10 (2026-11-04): Night parity for the same fixes — trail opacity now theme-aware (day 0.5 / night 0.3, dashed base 0.22/0.15 via .np-trail classes), intro unfold panels theme-aware (.intro-panel with night-tuned folds/shadows). Verified night: intro plays and dismisses, trail quiet and behind cards, no overflow.

## Backlog
- P0: Swap placeholder persona (Alexander Sterling) for the user's real name, resume content, links, and portrait photo (edit src/data/content.js only).
- P1: Real contact backend (form POST + email delivery via Resend) instead of mailto.
- P1: Per-project detail pages or case-study modals; GitHub live-repo embeds.
- P2: Dark "evening edition" theme toggle; printable PDF edition of the page.
