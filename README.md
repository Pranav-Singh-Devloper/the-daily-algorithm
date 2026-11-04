# The Daily Algorithm — Newspaper-Editorial AI/ML Portfolio

A single-page portfolio for **Pranav Singh** (aspiring AI/ML engineer) designed as a
classic broadsheet newspaper: masthead, dateline, drop caps, halftone photography,
classified-ad experience grid, honours gazette and a "Letters to the Editor" contact
desk — narrated by a paper aero-plane that flies the page as you scroll.

## Highlights

- **Paper-plane scroll engine** — organic wander path, banking/yaw in CSS 3D, depth
  cycle that flies the plane in front of and behind content.
- **The Press Run intro** — every load: title card, plane fly-by with whoosh, six-panel
  paper accordion unfolding with lighting sweeps and paper-crinkle sound design.
- **Evening Edition** — full dark-ink theme (persisted), with night-press photo treatment.
- **No BS mode** — one toggle strips the theatre into a plain, recruiter-first résumé page.
- **Résumé Snapshot** — print-only three-column sheet ("Print / Save PDF").
- **Live contact form** — FastAPI + Emergent-managed Resend delivers letters to the inbox.
- **Ambient jazz** — subtle looping soundtrack (user-supplied track, auto-trimmed 110 s),
  fade-in on first interaction, persisted mute.
- **Fountain-pen nib cursor**, azure **press-progress bar**, **pull-quote break**, and a
  rubber-stamp **"APPROVED FOR HIRING"** on the honours box.

## Stack

| Layer    | Tech                                                        |
| -------- | ----------------------------------------------------------- |
| Frontend | React (CRA + craco), Tailwind, framer-motion, Lenis, sonner  |
| Backend  | FastAPI, httpx (Emergent email proxy)                       |
| Data     | MongoDB (present, unused by pages)                          |

## Quickstart

```bash
# frontend
cd frontend && yarn install && yarn start        # :3000 (hot reload)

# backend (uvicorn via supervisor in Emergent pods; standalone:)
cd backend && pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001
```

Copy `.env.example` → `.env` in both `frontend/` and `backend/` and fill values
(see `docs/DEPLOY.md` for the env-var table).

## Folder Structure

```
/app
├── CLAUDE.md                  ← working guide for Claude Code
├── README.md
├── docs/
│   ├── DESIGN.md              ← design system: palette, type, motion catalog
│   ├── ARCHITECTURE.md        ← component map, scroll/plane engines, backend
│   ├── ASSETS.md              ← every asset: fonts, images, audio, icons
│   ├── DEPLOY.md              ← env vars + deploy checklist
│   └── CHANGELOG.md           ← v1 → v16 history
├── backend/                   ← FastAPI (contact email endpoint)
│   ├── server.py
│   ├── requirements.txt
│   └── .env                   ← secrets, never committed
├── frontend/                  ← CRA app
│   ├── public/ (favicon.svg, audio/jazz-loop.mp3)
│   └── src/
│       ├── App.js             ← routes + Lenis + ErrorBoundary + pen cursor
│       ├── pages/             ← Home (newspaper), CaseStudy (/projects/:slug)
│       ├── components/        ← 15+ editorial components
│       ├── data/content.js    ← ⭐ ALL copy lives here — edit this to rebrand
│       └── utils/             ← date, ambient audio singleton
└── memory/PRD.md              ← living product doc (not committed)
```

## Documentation

- [DESIGN.md](docs/DESIGN.md) — palette, typography, motion catalog
- [ARCHITECTURE.md](docs/ARCHITECTURE.md) — how the plane flies, the intro unfolds, the mail is sent
- [ASSETS.md](docs/ASSETS.md) — asset inventory & sources
- [DEPLOY.md](docs/DEPLOY.md) — environment & deploy checklist
- [CHANGELOG.md](docs/CHANGELOG.md) — everything shipped, dated

## Editing your content

Open [`frontend/src/data/content.js`](frontend/src/data/content.js) — name, links,
highlights, experiences, projects, achievements, skills, education and the about copy
all live in one file. Case-study URLs are derived from project titles
(`Engram: …` → `/projects/engram`).
