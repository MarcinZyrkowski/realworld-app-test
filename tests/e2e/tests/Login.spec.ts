import { expect } from '@playwright/test'
import { UiCache } from '../src/cache/UiCache'
import { HomePage } from '../src/page/HomePage'
import { SignInPage } from '../src/page/SignInPage'
import { uiTest } from '../src/fixture/Fixture'

uiTest('login with existing user @UI', async ({ page, allure, signInPage }) => {
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

uiTest('verify sign in form @UI', async ({ page, allure, signInPage, signInAssertion }) => {
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
