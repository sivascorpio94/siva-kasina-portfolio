# Siva Kasina — Portfolio

Next.js (App Router) + TypeScript + CSS Modules portfolio site built from
`Siva_Kasina_Portfolio_Content_and_Claude_Build_Brief.md`.

## Run locally

```bash
cd portfolio
npm install
npm run dev
```

Open http://localhost:3000.

Production build check:

```bash
npm run build
```

This site is **not deployed anywhere** — local dev/build only, per the brief's
explicit instruction not to publish without direct approval.

## Unresolved placeholders

These are called out inline in the UI (pending badges / tags) and listed here
so they're easy to track down and fill in:

- **LinkedIn, GitHub, resume (PDF), and email links** — all `href="#"` placeholders in `src/data/site.ts`.
- **Fidelity job title** — shown as `[Official title pending confirmation]` in `src/data/experience.ts`; do not guess at "Principal Engineer" or similar without HR/resume confirmation.
- **FLIGHTDECK outcome metrics** (80% revenue increase / 70% task-time reduction) — shown with an attribution/measurement-period caveat in `src/data/projects.ts`; confirm source before stating as fact.
- **Meridian automated test count** (14 vs. 66 in different source materials) — intentionally not shown as a specific number; update `src/data/projects.ts` once the final repo/test scope is checked.
- **Worldpay experience card** — the brief's page-flow section lists Worldpay among the experience entries, but its own "Selected professional experience cards" section supplies no title, dates, or stack for it. Rendered as a clearly labeled "Details pending" stub in `src/data/experience.ts` — needs real content or removal.
- **Video captions/transcript** — `public/video/captions-placeholder.vtt` is a stub; replace with a real transcript.
- **Video poster image** — `public/video/poster-placeholder.svg` is a generated placeholder (no `ffmpeg` available in this environment to extract a real frame). Replace with a real poster still.
- **Meridian architecture diagram / screenshots** — not included; the case-study page shows a "diagram coming soon" placeholder.
- **Employment date overlaps** — Capital One (Jan–Apr 2024), Citi (Aug 2021–Aug 2022), CenturyLink/Lumen (Dec 2018–Jul 2021), MAXIMUS (Feb–Nov 2018), and Prithvi (Jan–Dec 2015) dates are reproduced as supplied; Fidelity dates and any overlap with Worldpay were not supplied and should be confirmed before publishing.
- **FLIGHTDECK official role title** — currently framed narratively ("Siva says he fully owned...") rather than as a formal title, per the brief's instruction not to substitute an unconfirmed title.
- **CenturyLink/Lumen vs. FLIGHTDECK relationship** — the brief flags these may be the same application/time period; currently kept as separate cards per the brief's explicit structure, but worth confirming they shouldn't be merged.

## Structure

- `src/data/` — all editable content (site copy, tech grid, projects, experience). Edit these files to change copy without touching components.
- `src/components/` — presentational components, one folder per section.
- `src/app/page.tsx` — home page composition.
- `src/app/projects/[slug]/page.tsx` — case-study detail route for Meridian and FLIGHTDECK.
- `public/video/intro.mp4` — the supplied hero video.

## Accessibility notes

- Skip-to-content link, semantic landmarks, visible focus rings (`:focus-visible`).
- Hero video: muted/`playsInline` by default (no autoplay-with-sound), explicit play/pause and mute/unmute controls, `prefers-reduced-motion` disables autoplay, placeholder caption track wired up via `<track>`.
- Experience cards use native `<details>/<summary>` so they're keyboard- and screen-reader-accessible without custom ARIA.
