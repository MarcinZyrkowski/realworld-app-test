import { Page } from "@playwright/test";
import * as allure from "allure-js-commons";
import * as fs from "fs";

export class AllureSteps {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async makeScreenShot(name: string) {
    const screenshot = await this.page.screenshot();
    allure.attachment(name, screenshot, "image/png");
  }

  async step(name: string, action: () => Promise<void>) {
    await allure.step(name, async () => {
      await action();
    });
  }

  async suite(name: string) {
    allure.suite(name);
  }

  async attachVideoIfExists() {
    const videoPath = await this.page.video()?.path();
    if (videoPath) {
      allure.attachment("Test Video", fs.readFileSync(videoPath), "video/webm");
    }
  }
}
