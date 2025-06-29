import { expect } from 'allure-playwright'
import { SignUpPage } from '../page/SignUpPage'

export class SignUpAssertion {
  readonly signUnPage: SignUpPage

  constructor(signUnPage: SignUpPage) {
    this.signUnPage = signUnPage
  }

  async assertSignUpFormVisible(): Promise<void> {
    const page = this.signUnPage
    await expect(page.firstNameInput).toBeVisible()
    await expect(page.lastNameInput).toBeVisible()
    await expect(page.userNameInput).toBeVisible()
    await expect(page.passwordInput).toBeVisible()
    await expect(page.confirmPasswordInput).toBeVisible()
    await expect(page.signUpButton).toBeVisible()
    await expect(page.signInButton).toBeVisible()
  }
}
