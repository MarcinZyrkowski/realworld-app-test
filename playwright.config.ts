import { defineConfig, devices } from '@playwright/test'
import 'dotenv/config'

export default defineConfig({
  timeout: 20_000,
  globalTimeout: 20_000,
  testDir: './tests',
  retries: 1,
  fullyParallel: true,
  workers: 5,
  use: {
    testIdAttribute: 'data-test',
    // baseURL: "http://localhost:3000", default url if project doesn't override it
    baseURL: process.env.base_url_fe,
    launchOptions: {
      slowMo: 0,
    },
    viewport: { width: 1280, height: 720 },
  },
  projects: [
    {
      name: 'setup new user ui',
      ...devices['Desktop Chrome'],
      testMatch: 'SetUpNewUser.setup.ts',
      use: {
        video: {
          mode: 'retain-on-failure',
        },
        trace: 'retain-on-failure',
      },
    },
    {
      name: 'setup first login ui',
      ...devices['Desktop Chrome'],
      testMatch: 'SetUpFirstLogin.setup.ts',
      dependencies: ['setup new user ui'],
      use: {
        video: {
          mode: 'retain-on-failure',
        },
        trace: 'retain-on-failure',
      },
    },
    {
      name: 'chrome ui',
      use: {
        ...devices['Desktop Chrome'],
        // baseURL: "http://localhost:3000", we can set a default baseURL here
        storageState: 'playwright/ui/.auth/user.json',
        video: {
          mode: 'retain-on-failure',
        },
        trace: 'retain-on-failure',
      },
      testMatch: 'tests/e2e/**/**.spec.ts',
      dependencies: ['setup first login ui'],
    },
    {
      name: 'firefox ui',
      use: {
        ...devices['Desktop Firefox'],
        // baseURL: "http://localhost:3000", we can set a default baseURL here
        storageState: 'playwright/ui/.auth/user.json',
        video: {
          mode: 'retain-on-failure',
        },
        trace: 'retain-on-failure',
      },
      testMatch: 'tests/e2e/**/**.spec.ts',
      dependencies: ['setup first login ui'],
    },
    {
      name: 'setup api',
      testMatch: 'SetUp.setup.ts',
    },
    {
      name: 'chrome api',
      testMatch: 'tests/api/**/**.spec.ts',
      dependencies: ['setup api'],
    },
  ],
  reporter: [
    ['json', { outputFile: 'reports/json-report.json' }],
    ['html', { open: 'never', outputFolder: 'reports/html-report' }],
    [
      'allure-playwright',
      {
        resultsDir: 'reports/allure-results',
        environmentInfo: {
          URL_FE: process.env.base_url_fe,
          URL_BE: process.env.base_url_be,
        },
      },
    ],
    ['list'],
  ],
})
