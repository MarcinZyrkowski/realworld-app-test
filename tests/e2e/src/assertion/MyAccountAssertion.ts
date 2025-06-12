import { expect } from 'allure-playwright'
import { MyAccountPage } from '../page/MyAccountPage'

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
}
