// End-to-end tests for the portfolio. They run against the production build
// (`vite preview`), the same files GitHub Pages serves.
// Locally: `npm run build && npm test`. Set PW_CHANNEL=msedge to use installed Edge
// instead of Playwright's bundled Chromium.
import { defineConfig, devices } from '@playwright/test';

const channel = process.env.PW_CHANNEL || undefined;
const PORT = 4173;

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  // The hero animation is timing-based; too many browsers on a busy machine starve it.
  workers: 2,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: `http://127.0.0.1:${PORT}/`,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], channel, viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['Pixel 5'], channel, viewport: { width: 375, height: 740 } } },
  ],
  webServer: {
    command: `npm run preview -- --port ${PORT} --strictPort --host 127.0.0.1`,
    url: `http://127.0.0.1:${PORT}/`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
