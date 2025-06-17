import { defineConfig, devices } from '@playwright/test'
import 'dotenv/config'

export default defineConfig({
  timeout: 20_000,
  globalTimeout: 20_000,
  testDir: './tests',
  retries: 1,
  fullyParallel: true,
  workers: 8,
  use: {
    // baseURL: "http://localhost:3000", default url if project doesn't override it
    baseURL: process.env.base_url,
    launchOptions: {
      slowMo: 0,
    },
    viewport: { width: 1280, height: 720 },
    video: {
      mode: 'on-first-retry',
    },
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'setup new user',
      ...devices['Desktop Chrome'],
      testMatch: 'SetUpNewUser.setup.ts',
    },
    {
      name: 'setup first login',
      ...devices['Desktop Chrome'],
      testMatch: 'SetUpFirstLogin.setup.ts',
      dependencies: ['setup new user'],
    },
    {
      name: 'chrome ui',
      use: {
        ...devices['Desktop Chrome'],
        // baseURL: "http://localhost:3000", we can set a default baseURL here
      },
      dependencies: ['setup first login'],
    },
    {
      name: 'firefox ui',
      use: {
        ...devices['Desktop Firefox'],
        // baseURL: "http://localhost:3000", we can set a default baseURL here
      },
      dependencies: ['setup first login'],
    },
    {
      name: 'chrome api',
      use: {
        ...devices['Desktop Chrome'],
        // baseURL: "http://localhost:3000", we can set a default baseURL here
      },
    },
  ],
  reporter: [
    ['json', { outputFile: 'reports/json-report.json' }],
    ['html', { open: 'never', outputFolder: 'reports/html-report' }],
    [
      'allure-playwright',
      {
        resultsDir: 'reports/allure-results',
      },
    ],
    ['list'],
  ],
})
