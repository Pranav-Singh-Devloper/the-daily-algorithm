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
- Paper plane: ResizeObserver-measured SVG path spanning full document height, plane bound to spring-smoothed scrollYProgress via offset-path/offsetDistance, offset-rotate for tangent orientation, solid trail grows behind plane (pathLength).
- Masked line-by-line headline reveals (observe clip container, propagate variants to inner line).
- Parallax halftone portrait; hover inversions on nav/links/buttons.

## Implemented (2026-11-03)
- All 7 sections + footer, plane scroll engine, marquee, masked reveals, parallax, mailto contact form, favicon paper-plane mark, full mobile layout, data-testids on all interactive elements.
- Verified: desktop 1440 + mobile 390 screenshots, no overflow-x, all reveals firing, plane tracking scroll; fixed masked-reveal IntersectionObserver bug and footer path overlap.

## Backlog
- P0: Swap placeholder persona (Alexander Sterling) for the user's real name, resume content, links, and portrait photo (edit src/data/content.js only).
- P1: Real contact backend (form POST + email delivery via Resend) instead of mailto.
- P1: Per-project detail pages or case-study modals; GitHub live-repo embeds.
- P2: Dark "evening edition" theme toggle; printable PDF edition of the page.
