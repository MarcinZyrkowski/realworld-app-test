import { Locator, Page } from '@playwright/test'

export class MyAccountPage {
  readonly page: Page
  readonly title: Locator
  readonly firstNameInput: Locator
  readonly lastNameInput: Locator
  readonly emailInput: Locator
  readonly phoneInput: Locator
  readonly saveButton: Locator

  constructor(page: Page) {
    this.page = page
    this.title = this.page.locator('[data-test="main"] h2')
    this.firstNameInput = this.page.locator('[id="user-settings-firstName-input"]')
    this.lastNameInput = this.page.locator('[id="user-settings-lastName-input"]')
    this.emailInput = this.page.locator('[id="user-settings-email-input"]')
    this.phoneInput = this.page.locator('[id="user-settings-phoneNumber-input"]')
    this.saveButton = this.page.getByRole('button', { name: 'Save' })
  }
}
