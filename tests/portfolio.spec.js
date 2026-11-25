// The portfolio's own regression suite. Runs on every push before GitHub Pages deploys.
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const SECTIONS = ['work', 'studio', 'automation', 'experience', 'skills', 'contact'];

/** Collect console errors/warnings, page errors and failed requests for the whole test. */
function watch(page) {
  const problems = [];
  page.on('console', m => { if (['error', 'warning'].includes(m.type())) problems.push(`${m.type()}: ${m.text()}`); });
  page.on('pageerror', e => problems.push(`pageerror: ${e.message}`));
  page.on('requestfailed', r => problems.push(`request failed: ${r.url()}`));
  page.on('response', r => { if (r.status() >= 400) problems.push(`${r.status()} ${r.url()}`); });
  return problems;
}

/** Scroll the whole page in small steps so every IntersectionObserver fires. */
async function scrollThrough(page) {
  await page.evaluate(async () => {
    // 'instant': CSS smooth scrolling would let big programmatic jumps skip elements between frames.
    for (let y = 0; y < document.body.scrollHeight; y += 300) {
      scrollTo({ top: y, behavior: 'instant' });
      await new Promise(r => requestAnimationFrame(() => setTimeout(r, 40)));
    }
    scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });
  });
}

test.describe('portfolio', () => {
  test('loads cleanly: no console errors, no failed requests', async ({ page }) => {
    const problems = watch(page);
    await page.goto('./');
    await expect(page.locator('#sum')).toHaveText(/^6 passed · 0 failed/, { timeout: 10_000 });
    await scrollThrough(page);
    await page.waitForLoadState('networkidle');
    expect(problems).toEqual([]);
  });

  test('has title, description and social preview tags', async ({ page }) => {
    await page.goto('./');
    await expect(page).toHaveTitle(/Harley Valencia/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /QA Engineer/);
    for (const p of ['og:title', 'og:description', 'og:image', 'og:url']) {
      await expect(page.locator(`meta[property="${p}"]`), p).toHaveAttribute('content', /\S/);
    }
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(ogImage).toMatch(/^https:\/\/.+\.png$/);
  });

  test('hero test run ends on "6 passed · 0 failed" and can be re-run', async ({ page }) => {
    await page.goto('./');
    const sum = page.locator('#sum');
    await expect(sum).toHaveText('6 passed · 0 failed · ready to hire', { timeout: 10_000 });
    await expect(page.locator('#lines .ln.ok')).toHaveCount(6);
    await page.locator('#rerun').click();
    await expect(sum).not.toHaveText(/6 passed/);
    await expect(sum).toHaveText('6 passed · 0 failed · ready to hire', { timeout: 10_000 });
  });

  test('every section and project card renders', async ({ page }) => {
    await page.goto('./');
    for (const id of SECTIONS) await expect(page.locator(`#${id}`), `#${id}`).toHaveCount(1);
    await expect(page.locator('.card')).toHaveCount(8);
    await expect(page.locator('.case')).toHaveCount(2);
    await expect(page.locator('#st-live')).toHaveAttribute('href', /^https:\/\//);
  });

  test('content reveals on scroll and the timeline lights up', async ({ page }) => {
    await page.goto('./');
    await scrollThrough(page);
    await expect.poll(() => page.evaluate(() => [...document.querySelectorAll('.rv')].filter(e => !e.classList.contains('in')).length)).toBe(0);
    await expect(page.locator('.job.lit').first()).toBeVisible();
  });

  test('all images and the demo video load', async ({ page }) => {
    await page.goto('./');
    await scrollThrough(page);
    await page.waitForLoadState('networkidle');
    const broken = await page.evaluate(() => [...document.images].filter(i => !(i.complete && i.naturalWidth > 0)).map(i => i.src));
    expect(broken).toEqual([]);
    const video = page.locator('video');
    const src = await video.locator('source').first().getAttribute('src').catch(() => null) || await video.getAttribute('src');
    const res = await page.request.get(src);
    expect(res.status()).toBe(200);
  });

  test('résumé downloads as a PDF', async ({ page }) => {
    await page.goto('./');
    const href = await page.locator('.hero a[download]').getAttribute('href');
    const res = await page.request.get(href);
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('pdf');
    expect((await res.body()).subarray(0, 4).toString()).toBe('%PDF');
  });

  test('external links open safely in a new tab', async ({ page }) => {
    await page.goto('./');
    const bad = await page.evaluate(() => [...document.querySelectorAll('a[href^="http"]')]
      .filter(a => a.target !== '_blank' || !/noopener|noreferrer/.test(a.rel)).map(a => a.href));
    expect(bad).toEqual([]);
  });

  test('in-page links all point at real sections', async ({ page }) => {
    await page.goto('./');
    const missing = await page.evaluate(() => [...document.querySelectorAll('a[href^="#"]')]
      .map(a => a.getAttribute('href').slice(1)).filter(id => id && !document.getElementById(id)));
    expect(missing).toEqual([]);
  });

  test('skip link jumps past the navigation', async ({ page, isMobile }) => {
    test.skip(isMobile, 'keyboard flow');
    await page.goto('./');
    await page.keyboard.press('Tab');
    const skip = page.locator('.skip');
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#main$/);
  });

  test('nav links scroll to their section', async ({ page, isMobile }) => {
    test.skip(isMobile, 'text links are hidden on phones');
    await page.goto('./');
    for (const id of ['automation', 'skills']) {
      await page.locator(`.links a[href="#${id}"]`).click();
      await expect(page.locator(`#${id}`)).toBeInViewport();
    }
  });

  test('copy email button confirms', async ({ page, context, isMobile }) => {
    test.skip(isMobile, 'clipboard permission is desktop-only in CI');
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('./');
    await page.locator('#copy').click();
    await expect(page.locator('#note')).toHaveText('✓ email copied');
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('harleydavevalencia@gmail.com');
  });

  test('fits the screen with no sideways scroll', async ({ page, isMobile }) => {
    await page.goto('./');
    await scrollThrough(page);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
    if (isMobile) await expect(page.locator('.links a:not(.btn)').first()).toBeHidden();
  });

  test('respects reduced motion', async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.goto('./');
    await expect(page.locator('#sum')).toHaveText(/^6 passed/, { timeout: 2_000 });
    await expect(page.locator('.rv').first()).toHaveCSS('opacity', '1');
    await ctx.close();
  });

  test('has no serious accessibility violations (axe, WCAG 2 AA)', async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('#sum')).toHaveText(/^6 passed/, { timeout: 10_000 });
    await scrollThrough(page);
    // wait for reveal transitions to finish so contrast is measured on final colours
    await expect.poll(() => page.locator('.rv:not(.done)').count()).toBe(0);
    const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
    const serious = violations.filter(v => ['serious', 'critical'].includes(v.impact))
      .map(v => `${v.id}: ${v.nodes.slice(0, 3).map(n => n.target.join(' ')).join(' | ')}`);
    expect(serious).toEqual([]);
  });
});
