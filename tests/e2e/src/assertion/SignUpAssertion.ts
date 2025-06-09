import { expect } from 'allure-playwright'
import { SignUpPage } from '../page/SignUpPage'

export class SignUpAssertion {
  readonly signUnPage: SignUpPage

  constructor(signUnPage: SignUpPage) {
    this.signUnPage = signUnPage
  }

  async assertSignUpFormVisible(): Promise<void> {
    await expect(this.signUnPage.firstNameInput).toBeVisible()
    await expect(this.signUnPage.lastNameInput).toBeVisible()
    await expect(this.signUnPage.userNameInput).toBeVisible()
    await expect(this.signUnPage.passwordInput).toBeVisible()
    await expect(this.signUnPage.confirmPasswordInput).toBeVisible()
    await expect(this.signUnPage.signUpButton).toBeVisible()
    await expect(this.signUnPage.signInButton).toBeVisible()
  }
}
