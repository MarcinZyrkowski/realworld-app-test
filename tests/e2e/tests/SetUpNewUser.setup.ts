import { expect, test } from '@playwright/test'
import { UiCache } from '../src/cache/UiCache'
import { SignInPage } from '../src/page/SignInPage'
import { SignUpPage } from '../src/page/SignUpPage'
import { UserGenerator } from '../src/generator/UserGenerator'
import { Allure } from '../../Allure'

test('setup: register new user @UI', async ({ page }) => {
  const signInPage = new SignInPage(page)
  const signUpPage = new SignUpPage(page)
  const allure = new Allure(page)

  await allure.suite('setup register new user')

  await allure.step('open sign in page', async () => {
    await signInPage.open()
    await expect(page).toHaveURL(SignInPage.url)
    await allure.makeScreenshot('Sign In Page')
  })

  await allure.step('open sign up page', async () => {
    // bug: Bugs.SIGN_UP_BUTTON
    await signInPage.signUpButton.click()
    await signInPage.signUpButton.click()
    await expect(page).toHaveURL(SignUpPage.url)
    await allure.makeScreenshot('Sign Up Page')
  })

  await allure.step('fill sign up form', async () => {
    const signUpData = UserGenerator.generateRandomSignUpData()
    UiCache.cacheSignUpData(signUpData)
    await signUpPage.fillForm(signUpData)
    await allure.makeScreenshot('Filled Sign Up Form')
  })

  await allure.step('submit sign up form', async () => {
    await signUpPage.signUpButton.click()
    await expect(page).toHaveURL(SignInPage.url)
    await allure.makeScreenshot('Sign Up Successful')
  })
})
