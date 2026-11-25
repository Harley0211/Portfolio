# CLAUDE.md — Harley Dave Valencia portfolio

Personal portfolio for Harley Dave Valencia, Software QA Engineer (General Santos, PH, open to remote).
Goal: land a remote QA role — the site must look senior, load fast, and never break.

## Stack
- **React 18 + Vite (JavaScript, JSX)**, converted from the original static site on 2026-11-25 at Harley's request. Only deps: react, react-dom, vite, @vitejs/plugin-react. Don't add UI/animation libraries unless asked.
- One plain CSS file (no CSS-in-JS, no Tailwind). Markup/class names mirror the original static site so the CSS applies unchanged.
- Fonts from Google Fonts (Inter Tight, JetBrains Mono). No other external requests.
- `npm run dev` (port 3000), `npm run build` → `dist/`, `npm run preview`.
- Deploys from `main`: GitHub Pages via `.github/workflows/deploy.yml` (Pages source = GitHub Actions), or Netlify via `netlify.toml` (build `npm run build`, publish `dist`). `vite.config.js` uses `base: './'` so both work.
- The pre-React static version is backed up at `..\harley-portfolio-static-backup`.

## Files
- `index.html` — `<head>` only (meta, fonts, inline SVG favicon) + `#root`.
- `src/data.js` — ALL list content as exports: `checks` (hero runner lines), `work` (cards), `studio` (AI QA Studio case study; `studio.live` is the ONLY place the tunnel URL lives), `autos` (Playwright case studies), `jobs`, `kit`, `words`. Edit content here.
- `src/components/*.jsx` — one component per section; fixed copy (headline, intro, contact) lives in Hero.jsx / Contact.jsx. `Backdrop.jsx` is the interactive canvas background. `Runner.jsx` is the hero test run.
- `src/usePageEffects.js` — DOM effects after mount: scroll reveals (`.rv`), nav highlight, timeline fill, hero spotlight, card tilt. Exports `reduceMotion`.
- `src/styles.css` — all styles and keyframes; tokens in `:root`.
- `public/assets/` — résumé PDF (linked from Hero.jsx and Contact.jsx) and `projects/ai-qa-studio/` media; served at `assets/…`.

## Design rules ("Test Run" direction)
- Dark only. Background `--bg #0d1014`, panels `--panel #151a21`, lines `--line #232b35`, text `--ink #e8edf2`, muted `--mute #9aa6b2`, accent pass-mint `--acc #7cf0b6`.
- Concept: the page behaves like a passing Playwright test run (terminal, ✓ checks, green results). New sections should fit that idea.
- Headings Inter Tight 800, tight letter-spacing; labels/meta in JetBrains Mono.
- Every animation must be disabled under `prefers-reduced-motion` (CSS at bottom of styles.css; JS checks `reduceMotion`, e.g. Backdrop draws one still frame).
- Must work at 360px wide: grids use `minmax(min(100%,Npx),1fr)`; nav hides text links under 600px.
- Accessible: real `<a>`/`<button>`, visible `:focus-visible`, 44px+ targets, `aria-label` on decorative/role=img blocks.

## Content rules
- Only facts from Harley's résumé/LinkedIn. Never invent metrics, clients, testimonials or certifications.
- Experience: LotusFlare / T-Mobile Fiber (via Six Eleven Global Services, Jun 2025–now), uTest crowdtesting (Aug 2026–now), DICT & KCC Malls internships (Jan–Mar 2025), freelance manual tester (Jun 2023–Nov 2024). Side project: AI QA Studio.
- Contact: harleydavevalencia@gmail.com (`EMAIL` in Contact.jsx), linkedin.com/in/hire-me-harley. Phone number intentionally NOT on the site.
- Render data as JSX text (React escapes it). Never use `dangerouslySetInnerHTML` for content.

## Before finishing any change
- `npm run build` must succeed. Check `npm run dev` at desktop + ~375px mobile width.
- Check the console has no errors and the test-runner still ends on "6 passed · 0 failed".
