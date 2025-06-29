import { Locator, Page } from '@playwright/test'
import { MyAccountData } from '../types/page/MyAccountTypes'

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
    this.title = this.page.getByTestId('main').locator('h2')
    this.firstNameInput = this.page.locator(
      '[id="user-settings-firstName-input"]',
    )
    this.lastNameInput = this.page.locator(
      '[id="user-settings-lastName-input"]',
    )
    this.emailInput = this.page.locator('[id="user-settings-email-input"]')
    this.phoneInput = this.page.locator(
      '[id="user-settings-phoneNumber-input"]',
    )
    this.saveButton = this.saveButton = this.page.getByRole('button', {
      name: 'Save',
    })
  }

  async fillUserDetails(data: MyAccountData) {
    if (typeof data.firstName === 'string') {
      await this.firstNameInput.fill(data.firstName)
    }
    if (typeof data.lastName === 'string') {
      await this.lastNameInput.fill(data.lastName)
    }
    if (typeof data.email === 'string') {
      await this.emailInput.fill(data.email)
    }
    if (typeof data.phone === 'string') {
      await this.phoneInput.fill(data.phone)
    }
  }
}
