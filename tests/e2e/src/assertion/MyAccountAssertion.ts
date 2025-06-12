import { expect } from 'allure-playwright'
import { MyAccountPage } from '../page/MyAccountPage'
import { MyAccountData } from '../types/page/MyAccountTypes'

export class MyAccountAssertion {
  readonly myAccountPage: MyAccountPage

  constructor(myAccountPage: MyAccountPage) {
    this.myAccountPage = myAccountPage
  }

  async assertUserSettingsVisible(): Promise<void> {
    await expect(this.myAccountPage.title).toHaveText('User Settings')
    await expect(this.myAccountPage.firstNameInput).toBeVisible()
    await expect(this.myAccountPage.lastNameInput).toBeVisible()
    await expect(this.myAccountPage.emailInput).toBeVisible()
    await expect(this.myAccountPage.phoneInput).toBeVisible()
    await expect(this.myAccountPage.saveButton).toBeVisible()
  }

  async assertUserDetailsUpdated(data: MyAccountData): Promise<void> {
    if (data.firstName) {
      await expect(this.myAccountPage.firstNameInput).toHaveValue(data.firstName)
    }
    if (data.lastName) {
      await expect(this.myAccountPage.lastNameInput).toHaveValue(data.lastName)
    }
    if (data.email) {
      await expect(this.myAccountPage.emailInput).toHaveValue(data.email)
    }
    if (data.phone) {
      await expect(this.myAccountPage.phoneInput).toHaveValue(data.phone)
    }
  }
}
