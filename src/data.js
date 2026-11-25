/* ------------------------------------------------------------
   Site content — edit this file to update text on the page.
   ------------------------------------------------------------ */

export const checks = [
  ['functional + regression suites', 412],
  ['smoke & sanity on every deploy', 188],
  ['end-to-end user journeys', 903],
  ['API request/response checks', 241],
  ['clear defects in Jira + Jam.dev', 96],
  ['Playwright + n8n automation', 577]
];
export const work = [
  {tag:'Telecom · Remote · 2025 — now', title:'LotusFlare / T-Mobile Fiber', body:'Testing the customer-facing fiber web apps (address check, waitlist, account dashboard, service cancellation) across QA and production, with pre/post-deployment checks on critical journeys and Playwright scripts (Page Object Model) for repetitive regression.', chips:['Jira','Jam.dev','Playwright','POM','E2E']},
  {tag:'Side project · built for my QA team', title:'AI QA Studio', body:'A QA workspace that turns screenshots and requirement documents into test cases with a local AI orchestrated by n8n, plus a bug report generator and a HAR reader, with per-project access for the team.', chips:['n8n','Ollama','React','Express','460+ tests'], link:['#studio','Read the case study ↓']},
  {tag:'Test automation · Playwright', title:'Sauce Demo E2E suite', body:'Playwright framework for the SauceDemo store covering login (valid, locked-out and invalid users), product listing, sorting and details, cart actions, checkout form validation, order totals with tax, and order completion. Page objects, custom fixtures and data-driven scenarios, run on every push and pull request by GitHub Actions.', chips:['Playwright','JavaScript','POM','Fixtures','GitHub Actions'], link:['#sauce','Read the case study ↓']},
  {tag:'Test automation · Playwright', title:'Automation Exercise framework', body:'Playwright + Page Object Model framework for the automationexercise.com practice shop: 71 tests split into sanity, regression, end-to-end and exhaustive validation suites. Test accounts are created through the site\'s API and deleted after each test; HTML reports with screenshots, video and traces on failure.', chips:['Playwright','JavaScript','POM','API setup','Test data'], link:['#ae','Read the case study ↓']},
  {tag:'Crowdtesting · 2026 — now', title:'uTest invited cycles', body:'Invited test cycles for global clients covering face and ID capture, plus card and ID validation flows.', chips:['Mobile','Identity flows','Exploratory']},
  {tag:'Internship · 2025', title:'Engagement Tracker', body:'An AppSheet app built for the KCC Malls Internal Audit team to log and follow up on engagements.', chips:['AppSheet','No-code']},
  {tag:'Internship · 2025', title:'Logbook Scanner', body:'Front-end and UI for a web-based logbook scanner during my DICT internship.', chips:['Front-end','UI']},
  {tag:'Freelance · 2023 — 2024', title:'Access & barcode systems', body:'Manual web and mobile testing for barcode entry management and access control products.', chips:['Manual','Web','Mobile']}
];
export const jobs = [
  {when:'Jun 2025 — now', role:'Software QA Engineer', org:'LotusFlare', now:1, body:'Full-time, remote, via Six Eleven Global Services. Designs and maintains test cases, reports defects in Jira with Jam.dev recordings so developers fix faster, runs pre/post-deployment checks, and shares pass/fail/blocked status with dev, QA and product.'},
  {when:'Aug 2026 — now', role:'Freelance QA Tester', org:'uTest', now:1, body:'Invited cycles on real-world web and mobile apps, including face & ID capture and card/ID validation, reporting defects against strict cycle requirements on tight deadlines.'},
  {when:'Jan — Mar 2025', role:'AppSheet Developer Intern', org:'KCC Malls', body:'Built the Engagement Tracker for Internal Audit.'},
  {when:'Jan — Mar 2025', role:'IT Intern', org:'DICT', body:'Front-end and UI for the Logbook Scanner web app.'},
  {when:'Jun 2023 — Nov 2024', role:'Freelance Manual Tester', org:'Self-employed', body:'Wrote and ran test cases from requirements, reported defects and retested fixes for barcode entry management and access control apps.'}
];
export const kit = [
  ['Testing', ['Functional','Regression','Smoke','Sanity','Exploratory','UI','End-to-end','Pre/post-deploy validation']],
  ['Automation', ['Playwright','JavaScript','Page Object Model','Locator strategies','Fixtures','Data-driven tests','GitHub Actions CI','n8n']],
  ['API & debugging', ['API request/response validation','Chrome DevTools']],
  ['AI for QA', ['Prompt engineering','Generative AI','LLMs','AI agents']],
  ['Tools', ['Jira','Jam.dev','Reflect','Git','GitHub','VS Code','AppSheet']],
  ['Practices', ['Agile/Scrum','Test case design','Requirements analysis','Defect lifecycle','Test reporting']]
];
/* AI QA Studio case study (the #studio section).
   LIVE DEMO URL: the app runs on a Cloudflare quick tunnel, so this address
   changes whenever the tunnel restarts. Update it here only; it's not used anywhere else. */
export const studio = {
  live: 'https://accent-ethernet-milwaukee-marker.trycloudflare.com',
  repo: 'https://github.com/Harley0211/ai-qa-studio',
  dir: 'assets/projects/ai-qa-studio/',
  problem: 'Writing test cases from screens and PRDs, writing bug reports for Jira and Slack, and reading HAR files took the QA team a lot of manual time. New QAs also struggled to explain network failures to their leads.',
  role: 'Designed and built it end to end for my QA team: requirements from the team, UI, API, database, n8n workflows, local AI prompts, staging/live releases, and a test suite of 460+ automated tests.',
  stats: [
    ['460+', 'automated tests (server and web)'],
    ['2 envs', 'separate staging and live, with a release checklist'],
    ['$0', 'cloud AI cost: screenshots and logs stay on the machine']
  ],
  features: [
    ['Screenshot → test cases', 'Upload screens and pick a focus (functional, negative, boundary…); the local AI writes test cases. Review them, refine them with an AI chat, flag likely duplicates, and add the keepers to the project library (run status, Excel export).'],
    ['PRD / document → test cases', 'Paste or upload a document, pick sections, generate.'],
    ['Bug report generator', 'Describe the bug and attach screenshots, screen recordings or a HAR. Get a title, severity, root cause analysis and steps, formatted for Jira and Slack, plus a ZIP of every file. It keeps generating in the background.'],
    ['HAR reader', 'Reads browser network logs locally, redacts secrets, and explains failures in plain language: what happened, likely cause, who should look, and how to explain it to your lead.'],
    ['Team and access', 'Sign-in, admins and testers; testers only open the projects assigned to them (enforced on the server). Email invitations with a set-password link, account disable/enable, and notification emails sent through n8n + Gmail.']
  ],
  flow: ['React (Vite) web app', 'Express API · Prisma + SQLite', 'n8n workflow: webhook → validate → plan scenarios → AI writes cases → parse → callback', 'Ollama · qwen3-vl, on the same machine'],
  stack: ['React','Vite','Tailwind CSS','TanStack Query','Node.js','Express','Prisma','SQLite','Zod','n8n','Ollama (qwen3-vl)','Cloudflare Tunnel','Vitest','Testing Library','Playwright'],
  shots: [
    ['03-image-to-test-cases', 'Screenshot → test cases tool: evidence, format and focus'],
    ['04-test-case-library', "A project's test case library with execution progress"],
    ['05-har-reader-explained', 'HAR reader explaining a failed checkout request in plain language'],
    ['06-bug-report-jira', 'Generated bug report: Jira ticket with root cause analysis'],
    ['07-bug-report-slack', 'The same report as a Slack message ready to paste'],
    ['11-n8n-workflow', 'The n8n workflow that drives AI test case generation'],
    ['12-n8n-executions', 'n8n execution log showing a successful run'],
    ['02-projects-admin', 'Admin project picker with totals and per-project user counts'],
    ['08-users-admin', 'Admin Users page: roles, project access and status'],
    ['09-assign-projects', 'Per-person project access with on/off switches'],
    ['13-projects-tester-locked', "A tester's view: assigned projects open, others locked"],
    ['10-invitation-email', 'Designed invitation email sent through n8n + Gmail']
  ]
};
/* Playwright automation case studies (the #automation section).
   Facts come from the repos' code, configs, CI workflow and README.
   `listing` mirrors `npx playwright test --list`: it shows what is covered, not run results. */
export const autos = [
  {
    id: 'sauce',
    title: 'Sauce Demo E2E suite',
    lede: 'An end-to-end Playwright suite for the SauceDemo store, from login to order confirmation, with CI on every push and pull request.',
    repo: 'https://github.com/Harley0211/Sauce-Demo',
    facts: [['10', 'spec files'], ['10', 'page objects'], ['8', 'test-data modules'], ['CI', 'GitHub Actions on push + PR']],
    cmd: 'npx playwright test --list',
    listing: [
      ['smoke.spec.js', ['SauceDemo application should load successfully']],
      ['auth/login.spec.js', ['standard user logs in and lands on the products page', 'locked-out user sees a lockout error and stays on the login page', 'shows an error when logging in with ‹each invalid scenario›', 'error message can be dismissed', 'visiting the products page without logging in redirects with an error']],
      ['inventory/product-listing.spec.js', ['products page lists every product with its name and price', 'a new session shows the products heading and an empty cart']],
      ['inventory/product-sorting.spec.js', ['sorts products by ‹each sort option›']],
      ['inventory/product-details.spec.js', ['opening ‹each product› shows its name, description and price', 'back to products returns to the product listing', 'a product added from its details page shows as added on the listing']],
      ['inventory/cart-actions.spec.js', ['adding a product switches its button to Remove and sets the cart badge to 1', 'adding several products increases the cart badge count', 'removing a product restores its Add to cart button and clears the badge', 'removing one of two products decreases the cart badge count']],
      ['checkout/cart.spec.js', ['lists each added product with its name, price and quantity', 'removing one product keeps the other in the cart', 'continue shopping returns to the products page', 'removing the only product empties the cart']],
      ['checkout/customer-information.spec.js', ['checkout from the cart opens the customer information form', 'shows an error when the ‹each required field› is missing', 'valid customer information continues to the order overview', 'cancel returns to the cart']],
      ['checkout/checkout-overview.spec.js', ['lists the ordered products with their names and prices', 'shows the payment and shipping information', 'shows the item total, tax and order total', 'cancel returns to the products page and keeps the cart']],
      ['checkout/order-completion.spec.js', ['finishing the order shows the confirmation and empties the cart', 'back home after ordering returns to the products page with an empty cart']]
    ],
    built: [
      'Page Object Model with 10 page classes (login, inventory, product details, cart, three checkout steps and shared base pages).',
      'Custom fixtures hand every test its page objects, so specs read like user journeys.',
      'Data-driven scenarios: invalid logins, sort options, products and missing checkout fields live in test-data modules and loop into tests.',
      'Stable locators through the site\'s data-test attributes (testIdAttribute).',
      'Fully parallel locally; on CI it runs one worker with 2 retries. Screenshots and traces are kept on failure.',
      'A PAUSE=1 debug mode (headed, no timeout) for stepping through a failing flow.'
    ],
    flowTitle: '.github/workflows/playwright.yml',
    flow: ['on: push / pull_request → main', 'Checkout · setup Node 24 with npm cache', 'npm ci · npx playwright install --with-deps chromium', 'npx playwright test', 'Upload HTML report (always) · test results (on failure), kept 14 days'],
    tree: 'pages/       10 page objects\nfixtures/    index.js\ntest-data/   users, products, customers,\n             login / sort / checkout scenarios\ntests/       smoke · auth · inventory · checkout\nutils/       format.js, order.js\nplaywright.config.js\n.github/workflows/playwright.yml',
    stack: ['Playwright Test', 'JavaScript', 'Node.js', 'Page Object Model', 'Fixtures', 'Data-driven tests', 'GitHub Actions', 'HTML reporter', 'cross-env']
  },
  {
    id: 'ae',
    title: 'Automation Exercise framework',
    lede: 'A Playwright + Page Object Model framework for the automationexercise.com practice shop, organised into sanity, regression, end-to-end and exhaustive suites.',
    repo: 'https://github.com/Harley0211/automation-exercise-playwright',
    facts: [['71', 'tests'], ['19', 'spec files'], ['4', 'suites'], ['10', 'page objects']],
    cmd: 'cat README.md  # 8. Test coverage',
    listing: [
      ['sanity/ · 9 tests', ['homepage, navigation to Products / Cart', 'login page, valid login, logout', 'product listing, product details, add to cart']],
      ['regression/ · 15 tests', ['valid / invalid login, logout, registration (new + existing email)', 'search, category and brand navigation, product details, review submission', 'add / remove / update quantity, cart calculations', 'checkout navigation (guest and logged in)', 'Contact Us, subscription (home + cart)']],
      ['e2e/ · 3 tests', ['registration → delete account', 'search → details → quantities → cart → remove', 'login → cart → checkout → payment → confirmation']],
      ['exhaustive/ · 44 tests', ['login, registration, search, cart, contact / subscription and checkout / payment validation', 'empty, malformed, special characters and long input', 'partial and case-insensitive search, totals']]
    ],
    built: [
      'Tests never contain locators: they call page methods such as loginPage.login(email, password).',
      'A base fixture creates a unique test account through the site\'s API before each test and deletes it afterwards.',
      'All test data lives in JSON (users, products, checkout); a data generator makes unique emails and users.',
      'getByTestId reads the site\'s data-qa attributes, and ad domains are blocked in the fixture to cut flakiness.',
      'Environment config through .env (base URL, headless, workers, retries) with one npm script per suite and per feature.',
      'On failure: screenshot and video are kept, and a trace is recorded on retry, all in the HTML report.'
    ],
    flowTitle: 'how one test runs',
    flow: ['Fixture creates a unique account via the site API', 'Page objects drive the UI (locators stay in pages/)', 'Assertions on what the user sees', 'Account deleted after the test', 'Failure → screenshot, video, trace in the HTML report'],
    tree: 'tests/       sanity · regression · e2e · exhaustive\npages/       10 page objects\nfixtures/    baseFixture.js\ntest-data/   users.json, products.json, checkout.json\nutils/       dataGenerator, testHelpers, verifyProject\nconfig/      environments.js\nplaywright.config.js · .env.example',
    stack: ['Playwright Test', 'JavaScript', 'Node.js', 'Page Object Model', 'Fixtures', 'API test setup', 'dotenv', 'HTML reporter']
  }
];
export const words = ['Functional','Regression','Smoke','Sanity','Exploratory','End-to-end','Page Object Model','API testing','Playwright','JavaScript','Jira','Jam.dev','n8n','AI agents','Prompt engineering','Pre/post-deploy validation'];
