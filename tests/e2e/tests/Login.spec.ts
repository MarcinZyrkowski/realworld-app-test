import test, { expect } from '@playwright/test'
import { UiCache } from '../src/cache/UiCache'
import { HomePage } from '../src/page/HomePage'
import { SignInPage } from '../src/page/SignInPage'
import { SignInAssertion } from '../src/assertion/SignInAssertion'
import { Allure } from '../../Allure'

test.describe('login tests @UI', () => {
  let signInPage: SignInPage
  let signInAssertion: SignInAssertion
  let allureSteps: Allure

  test.beforeEach(async ({ page }) => {
    signInPage = new SignInPage(page)
    signInAssertion = new SignInAssertion(signInPage)
    allureSteps = new Allure(page)
  })

  test('login with existing user', async ({ page }) => {
    await allureSteps.suite('login')

    await allureSteps.step('open sign in page', async () => {
      await signInPage.open()
      await expect(page).toHaveURL(SignInPage.url)
      await allureSteps.makeScreenshot('Sign In Page')
    })

    await allureSteps.step('fill sign in form', async () => {
      const signInData = UiCache.retrieveSignInData()
      await signInPage.fillForm(signInData)
      await allureSteps.makeScreenshot('Filled Sign In Form')
    })

    await allureSteps.step('sign in', async () => {
      await signInPage.signInButton.click()
      await allureSteps.makeScreenshot('Sign In Button Clicked')
    })

    await allureSteps.step('verify successful login', async () => {
      await expect(page).toHaveURL(HomePage.url)
      await allureSteps.makeScreenshot('Home Page')
    })
  })

  test('verify sign in form', async ({ page }) => {
    await allureSteps.suite('login')

    await allureSteps.step('open sign in page', async () => {
      await signInPage.open()
      await expect(page).toHaveURL(SignInPage.url)
      await allureSteps.makeScreenshot('Sign In Page')
    })

    await allureSteps.step('assert sign in form is visible', async () => {
      await signInAssertion.assertSignInFormVisible()
    })
  })

  test.afterEach(async () => {
    await allureSteps.attachVideoIfExists()
  })
})
