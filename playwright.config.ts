import { defineConfig, devices } from "@playwright/test";
import "dotenv/config";

export default defineConfig({
  timeout: 30_000,
  globalTimeout: 60_000,
  testDir: "./tests",
  retries: 2,
  use: {
    // baseURL: "http://localhost:3000", default url if project doesn't override it
    baseURL: process.env.base_url,
    launchOptions: {
      slowMo: 0,
    },
    trace: "off",
  },
  projects: [
    {
      name: "setup new user",
      ...devices["Desktop Chrome"],
      testMatch: 'SetUpNewUser.setup.ts',
    },
    {
      name: "setup first login",
      ...devices["Desktop Chrome"],
      testMatch: 'SetUpFirstLogin.setup.ts',
      dependencies: ["setup new user"],
    },
    {
      name: "dev",
      use: {
        ...devices["Desktop Chrome"],
        // baseURL: "http://localhost:3000", we can set a default baseURL here
      },
      dependencies: ["setup first login"],
    },
    {
      name: "qa",
      use: {
        ...devices["Desktop Firefox"],
        // baseURL: "http://localhost:3000", we can set a default baseURL here
      },
      dependencies: ["setup first login"],
    },
  ],
  reporter: [
    ["json", { outputFile: "reports/json-report.json" }],
    ["html", { open: "never", outputFolder: "reports/html-report" }],
    ["allure-playwright", { resultsDir: "reports/allure-results" }],
  ],
});
