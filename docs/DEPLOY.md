# DEPLOY.md — environment & deploy checklist

## Environment variables

### frontend/.env
| Key                    | Value (preview pod)                                | Notes |
| ---------------------- | -------------------------------------------------- | ----- |
| `REACT_APP_BACKEND_URL`| `https://daily-ai-dispatch--6jak4ttr.preview.emergentagent.com` | **Protected.** The live site gets its own value on Deploy. |
| `WDS_SOCKET_PORT`      | platform-managed                                    | don't touch |
| `ENABLE_HEALTH_CHECK`  | platform-managed                                    | don't touch |

### backend/.env
| Key                 | Value | Notes |
| ------------------- | ----- | ----- |
| `MONGO_URL`         | local Mongo URI | **Protected**, platform-managed |
| `DB_NAME`           | `test_database` | don't rename |
| `CORS_ORIGINS`      | `*` | tighten for production if desired |
| `EMERGENT_EMAIL_KEY`| managed key | Emergent-managed Resend integration |
| `EMAIL_FROM_NAME`   | `The Daily Algorithm` | sender display name |
| `EMAIL_REPLY_TO`    | `pranav.singh2024@nst.rishihood.edu.in` | owner inbox |
| `OWNER_EMAIL`       | `pranav.singh2024@nst.rishihood.edu.in` | contact-form recipient |

`.env` files are git-ignored; `.env.example` files document the shape.

## Pre-deploy checklist (all passing as of 2026-11-04)

- [x] `/` 200, `/api/` 200, `/api/status` 200
- [x] `POST /api/contact` → 200 valid / 422 invalid email (real letter delivered to inbox)
- [x] `/audio/jazz-loop.mp3` 200 (1.54 MB)
- [x] SPA fallback `/projects/engram` 200
- [x] `/favicon.svg` 200
- [x] Screenshots 1440×900 + 390×844, day + night, no overflow-x, no console errors
- [x] Intro plays & dismisses; stamp, quote, count-up, plane all fire

## Deploy notes (Emergent)

- **Deploy ships code only.** The live site gets a fresh database on first Deploy;
  this app stores no content in Mongo, so nothing to migrate.
- Contact form on the live site uses the same managed email key (email integration is
  platform-managed; live/test slots already provisioned).
- After Deploy: send one real letter from the live form to confirm `OWNER_EMAIL`
  delivery, and open `/projects/engram` directly to confirm SPA fallback on the
  live host.

## Local reproduction

1. `cd frontend && yarn install && yarn start` (needs `REACT_APP_BACKEND_URL` in
   `frontend/.env` pointing at a reachable backend).
2. `cd backend && pip install -r requirements.txt && uvicorn server:app --port 8001`
   with backend `.env` filled.
3. `mkdir frontend/public/audio` and place any `jazz-loop.mp3` (see ASSETS.md).
