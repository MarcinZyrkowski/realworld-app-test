import { Locator, Page } from 'playwright-core'
import { SignInData } from '../types/page/SignInTypes'

export class SignInPage {
  static readonly url = '/signin'
  readonly page: Page
  readonly signUpButton: Locator
  readonly userNameInput: Locator
  readonly passwordInput: Locator
  readonly signInButton: Locator

  constructor(page: Page) {
    this.page = page
    this.signUpButton = this.page.getByText("Don't have an account? Sign Up")
    this.userNameInput = this.page.locator('input[name="username"]')
    this.passwordInput = this.page.locator('input[name="password"]')
    this.signInButton = this.page.getByRole('button', {
      exact: true,
      name: 'Sign In',
    })
  }

  async open() {
    await this.page.goto(SignInPage.url)
  }

  async fillForm(signInData: SignInData) {
    if (signInData.username) {
      await this.userNameInput.fill(signInData.username)
    }
    if (signInData.password) {
      await this.passwordInput.fill(signInData.password)
    }
  }
}
