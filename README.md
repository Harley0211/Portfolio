# Harley Dave Valencia — Portfolio

Personal portfolio for a Software QA Engineer. Dark "test run" theme: the hero is an animated Playwright runner where every check passes, over an interactive grid of "test nodes" that react to the cursor.

Built with **React 18 + Vite** (JavaScript). No UI libraries; all styling is one CSS file.

## Run it locally

Needs Node.js 18+.

```bash
npm install
npm run dev        # http://localhost:3000 with hot reload
npm run build      # production build into dist/
npm run preview    # serve the built dist/ at http://localhost:3000
```

## Tests

The site has its own Playwright regression suite (`tests/portfolio.spec.js`), run at desktop and 375px mobile against the production build:
no console errors or failed requests, the hero run ends on "6 passed · 0 failed", every section/card/image/video loads,
the résumé is a real PDF, links are safe and point at real sections, keyboard skip link, no sideways scroll,
reduced-motion support, and an **axe** WCAG 2 AA audit.

```bash
npx playwright install chromium   # once
npm run build && npm test         # PW_CHANNEL=msedge npm test uses installed Edge instead
npm run test:report               # open the HTML report
```

CI runs the suite on every push; GitHub Pages only deploys if it passes.

## Project structure

```
index.html                 Page <head> (title, meta, fonts, favicon) + #root
src/main.jsx               Entry: mounts <App/> and imports styles.css
src/App.jsx                Page layout: which sections appear, in order
src/data.js                ALL list content: EDIT THIS for projects, jobs, skills, case studies, runner lines
src/styles.css             All styling, colours and animations (design tokens in :root)
src/usePageEffects.js      Scroll reveals, nav highlight, timeline fill, hero spotlight, card tilt
src/components/            One file per section (Hero, Runner, Work, Studio, Automation, …) + Backdrop canvas
public/assets/             Résumé PDF and project media, served as-is at assets/…
```

## Common edits

| To change… | Edit |
| --- | --- |
| Projects, experience, skills, marquee words, terminal checks, case studies | `src/data.js` |
| AI QA Studio live demo link (changes when the tunnel restarts) | `studio.live` in `src/data.js` |
| Headline, intro | `src/components/Hero.jsx` |
| Contact text, email | `src/components/Contact.jsx` |
| Accent colour | `--acc` in `src/styles.css` (also the `rgba(124,240,182,…)` glows and `Backdrop.jsx`) |
| Résumé | Replace the PDF in `public/assets/` and update `RESUME` in `Hero.jsx` and `Contact.jsx` |

## Deploy

**GitHub Pages:** push to `main`. `.github/workflows/deploy.yml` builds, tests and publishes automatically.
One-time setup: repo → Settings → Pages → Source: **GitHub Actions**.

**Netlify:** connect the repo; `netlify.toml` already sets build command `npm run build` and publish dir `dist`.

## Accessibility & motion

Respects `prefers-reduced-motion` (animations off, background drawn as a still grid), keyboard focus styles on every control, and stacks to a single column on phones.
