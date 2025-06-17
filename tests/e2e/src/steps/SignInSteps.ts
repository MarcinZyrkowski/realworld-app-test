import { expect, Page } from '@playwright/test'
import { SignInPage } from '../page/SignInPage'
import { Allure } from '../../../Allure'
import { UiCache } from '../cache/UiCache'
import { HomePage } from '../page/HomePage'

export class SignInSteps {
  readonly page: Page
  readonly signInPage: SignInPage
  readonly allureSteps: Allure

  constructor(page: Page, signInPage: SignInPage, allureSteps: Allure) {
    this.page = page
    this.signInPage = signInPage
    this.allureSteps = allureSteps
  }

  async loginWithExistingUser() {
    await this.allureSteps.step('open sign in page', async () => {
      await this.signInPage.open()
      await expect(this.page).toHaveURL(SignInPage.url)
      await this.allureSteps.makeScreenshot('Sign In Page')
    })

    await this.allureSteps.step('fill sign in form', async () => {
      const signInData = UiCache.retrieveSignInData()
      await this.signInPage.fillForm(signInData)
      await this.allureSteps.makeScreenshot('Filled Sign In Form')
    })

    await this.allureSteps.step('sign in', async () => {
      await this.signInPage.signInButton.click()
      await this.allureSteps.makeScreenshot('Sign In Button Clicked')
    })

    await this.allureSteps.step('verify successful login', async () => {
      await expect(this.page).toHaveURL(HomePage.url)
      await this.allureSteps.makeScreenshot('Home Page')
    })
  }
}
