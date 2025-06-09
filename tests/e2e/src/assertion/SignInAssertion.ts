import { expect } from '@playwright/test'
import { SignInPage } from '../page/SignInPage'

export class SignInAssertion {
  readonly signInPage: SignInPage

  constructor(signInPage: SignInPage) {
    this.signInPage = signInPage
  }

  async assertSignInFormVisible(): Promise<void> {
    await expect(this.signInPage.userNameInput).toBeVisible()
    await expect(this.signInPage.passwordInput).toBeVisible()
    await expect(this.signInPage.signInButton).toBeVisible()
    await expect(this.signInPage.signUpButton).toBeVisible()
  }
}
