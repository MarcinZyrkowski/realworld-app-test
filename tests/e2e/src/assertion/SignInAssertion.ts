import { expect } from '@playwright/test'
import { SignInPage } from '../page/SignInPage'

export class SignInAssertion {
  readonly signInPage: SignInPage

  constructor(signInPage: SignInPage) {
    this.signInPage = signInPage
  }

  async assertSignInFormVisible(): Promise<void> {
    const page = this.signInPage
    await expect(page.userNameInput).toBeVisible()
    await expect(page.passwordInput).toBeVisible()
    await expect(page.signInButton).toBeVisible()
    await expect(page.signUpButton).toBeVisible()
  }
}
