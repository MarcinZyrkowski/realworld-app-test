import test, { expect } from '@playwright/test'
import { UiCache } from '../src/cache/UiCache'
import { HomePage } from '../src/page/HomePage'
import { SignInPage } from '../src/page/SignInPage'
import { SignInAssertion } from '../src/assertion/SignInAssertion'
import { Allure } from '../../Allure'

test.describe('login tests @UI', () => {
  let signInPage: SignInPage
  let signInAssertion: SignInAssertion
  let allure: Allure

  test.beforeEach(async ({ page }) => {
    signInPage = new SignInPage(page)
    signInAssertion = new SignInAssertion(signInPage)
    allure = new Allure(page)
  })

  test('login with existing user', async ({ page }) => {
    await allure.suite('login')

    await allure.step('open sign in page', async () => {
      await signInPage.open()
      await expect(page).toHaveURL(SignInPage.url)
      await allure.makeScreenshot('Sign In Page')
    })

    await allure.step('fill sign in form', async () => {
      const signInData = UiCache.retrieveSignInData()
      await signInPage.fillForm(signInData)
      await allure.makeScreenshot('Filled Sign In Form')
    })

    await allure.step('sign in', async () => {
      await signInPage.signInButton.click()
      await allure.makeScreenshot('Sign In Button Clicked')
    })

    await allure.step('verify successful login', async () => {
      await expect(page).toHaveURL(HomePage.url)
      await allure.makeScreenshot('Home Page')
    })
  })

  test('verify sign in form', async ({ page }) => {
    await allure.suite('login')

    await allure.step('open sign in page', async () => {
      await signInPage.open()
      await expect(page).toHaveURL(SignInPage.url)
      await allure.makeScreenshot('Sign In Page')
    })

    await allure.step('assert sign in form is visible', async () => {
      await signInAssertion.assertSignInFormVisible()
    })
  })

  test.afterEach(async () => {
    await allure.attachVideoIfExists()
  })
})
