import { defineConfig } from "@playwright/test";

export default defineConfig({
  timeout: 30_000,
  globalTimeout: 60_000,
  testDir: "./tests",
  use: {
    launchOptions: {
      slowMo: 0,
    },
  },
  reporter: [
    ["json", { outputFile: "json-report/test-results.json" }],
    ["html", { open: "never" }],
  ],
});
