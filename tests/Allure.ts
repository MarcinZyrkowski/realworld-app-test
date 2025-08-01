import { Page } from '@playwright/test'
import * as allure from 'allure-js-commons'

export class Allure {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async makeScreenshot(name: string) {
    const screenshot = await this.page.screenshot()
    allure.attachment(name, screenshot, 'image/png')
  }

  async step(name: string, action: () => Promise<void>) {
    await allure.step(name, async () => {
      await action()
    })
  }

  async suite(name: string) {
    await allure.suite(name)
  }

  async attachRequest(request: unknown) {
    await allure.attachment(
      'request',
      JSON.stringify(request, null, 2),
      'application/json',
    )
  }

  async attachResponse(response: unknown) {
    await allure.attachment(
      'response',
      JSON.stringify(response, null, 2),
      'application/json',
    )
  }

  async attachResponseBody(responseBody: unknown) {
    await allure.attachment(
      'responseBody',
      JSON.stringify(responseBody, null, 2),
      'application/json',
    )
  }

  async attachment(obj: unknown, name = 'attachement') {
    await allure.attachment(
      name,
      JSON.stringify(obj, null, 2),
      'application/json',
    )
  }
}
