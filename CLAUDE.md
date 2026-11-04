# CLAUDE.md — working guide for Claude Code

This is a newspaper-editorial portfolio for Pranav Singh (AI/ML intern candidate).
Read this file before changing anything; it encodes the non-obvious rules.

## Commands

```bash
cd frontend && yarn start            # dev server :3000 (hot reload, CRA + craco)
cd frontend && yarn add <pkg>        # ONLY yarn, never npm (npm breaks the env)
cd backend && pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001   # standalone backend run
```

In Emergent pods the supervisor owns processes; code edits hot-reload. Only
`.env` changes / dependency installs need `sudo supervisorctl restart backend|frontend`.

## The one file to edit for content

`frontend/src/data/content.js` holds **all** copy: `PERSON`, `HIGHLIGHTS`, `TICKER_ITEMS`,
`NAV_LINKS`, `AT_A_GLANCE`, `EDUCATION`, `EXPERIENCES`, `PROJECTS`, `ACHIEVEMENTS`,
`SKILLS`, `ABOUT_BODY`.

- Blue keyword highlights in body copy use `##phrase##` markup (rendered by
  `components/Rich.jsx`).
- Case-study URLs derive from titles: first word lowercased → `/projects/engram`.
- GitHub/LinkedIn are `"#"` placeholders — real URLs still pending from the owner.

## Architecture map

```
frontend/src/
├── App.js                    routes (/ → Home, /projects/:slug → CaseStudy),
│                             Lenis singleton (window.__lenis), ErrorBoundary, PenCursor
├── pages/Home.jsx            view switch (No BS vs newspaper), intro, texture, cursor-parallax
├── pages/CaseStudy.jsx       placeholder case files, slug = first word of title
├── components/
│   ├── PaperPlaneLayer.jsx   ⭐ scroll-driven 3D paper plane + trail (see notes)
│   ├── IntroUnfold.jsx       "The Press Run" load cinematic + WebAudio sound design
│   ├── Masthead.jsx          dateline, title, nav, JAZZ / NIGHT / NO BS toggles, ticker
│   ├── About.jsx             hero (name-first) + By-the-Numbers band + portrait + glance
│   ├── Experiences.jsx       classified-ad grid (2 cards, opaque bg-card)
│   ├── PullQuote.jsx         editorial quote break w/ parallax mark
│   ├── Projects.jsx          lead + secondary stories, links to case files
│   ├── Achievements.jsx      gazette box + APPROVED stamp (useInView + thump)
│   ├── Skills.jsx            3-column almanac w/ tickboxes
│   ├── ResumeSnapshot.jsx    print-only 3-column résumé (print CSS in index.css)
│   ├── Contact.jsx           form → POST /api/contact, sonner toasts
│   ├── Footer.jsx            colophon + back-to-top (lenis)
│   ├── Reveal.jsx            Reveal / MaskedLines / SectionHeading primitives
│   ├── Rich.jsx              ##highlight## parser (azure)
│   ├── CountUp.jsx           stat count-up (memoised — deps were a bug once, keep memo!)
│   ├── ThemeToggle.jsx       Evening Edition (html.night + localStorage "edition")
│   ├── AmbientAudio.jsx      jazz toggle UI (singleton in utils/ambient.js)
│   └── PenCursor.jsx         fountain-pen nib cursor (fine pointers, newspaper only)
├── data/content.js           ⭐ single source of copy
└── utils/{date.js, ambient.js}
```

## Non-obvious engineering rules

1. **Masked reveals**: `MaskedLines` animates a child span inside an `overflow-hidden`
   span — the observer MUST sit on the outer (static) span, variants propagate inward.
   Observing the translated child never fires (clipped → ratio 0).
2. **CountUp**: the regex match is memoised via `useMemo([value])`. Putting the match
   object in deps restarts the animation every render (this bug shipped once).
3. **Plane z-ordering**: trail SVG lives at `z-[5]` (behind content, sections are
   `z-10`); the plane's z toggles 4 ↔ 50 by depth — the z must sit on the outer
   wrapper (`transform: scale()` creates a stacking context that traps inner z).
4. **Theme**: colors flow through CSS vars (--paper/--ink/--card/--azure/…) mapped in
   `tailwind.config.js` (`ink`, `paper`, `card`, `paper2`, `ink-soft`, `rule-light`,
   `azure`). `--card` must stay an **HSL triplet** (`0 0% 100%`) because shadcn's
   `card` color = `hsl(var(--card))`. Night overrides live in `.night { … }`.
5. **Night photos**: `.night .halftone img` = `screen` blend (no invert) — the
   portrait is shot on black and melts into the card. Don't "fix" this.
6. **Print**: `@media print` in index.css hides everything but `.print-snapshot` and
   forces day vars.
7. **Env/infra**: backend on 0.0.0.0:8001, routes prefixed `/api`, frontend calls only
   `process.env.REACT_APP_BACKEND_URL`. Never commit `.env` (ignored) or hardcode keys.
8. **Sound**: all SFX are synthesized WebAudio (no assets). Autoplay may be blocked —
   every sound silently no-ops; ambient jazz waits for first interaction.

## Backend

`backend/server.py` — single file. Route `POST /api/contact` validates + rate-limits
(5/min/IP) and sends via Emergent's managed email proxy using `EMERGENT_EMAIL_KEY`.
Guardrails (`_assert_safe_email`) block forms/links/credential-bait in emails.
Recipient is always `OWNER_EMAIL` from env — never caller input. Mongo is connected
but unused; don't remove it (platform health checks).

## Verification habits

- `curl` `/`, `/api/`, `/api/contact` (200/200/200-valid, 422-invalid),
  `/audio/jazz-loop.mp3`, SPA fallback `/projects/engram` against
  `REACT_APP_BACKEND_URL`.
- Screenshot passes: 1440×900 and 390×844, scroll-through first (reveal animations),
  check overflow-x + night mode + the intro + the stamp.
