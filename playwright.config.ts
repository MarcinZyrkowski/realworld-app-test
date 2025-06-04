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
  },
  projects: [
    {
      name: "dev",
      use: {
        ...devices["Desktop Chrome"],
        // baseURL: "http://localhost:3000", we can set a default baseURL here
      },
    },
    {
      name: "qa",
      use: {
        ...devices["Desktop Firefox"],
        // baseURL: "http://localhost:3000", we can set a default baseURL here
      },
    },
  ],
  reporter: [
    ["json", { outputFile: "json-report/test-results.json" }],
    ["html", { open: "never" }],
  ],
});
