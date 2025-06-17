import { expect, test } from '@playwright/test'
import { UiCache } from '../src/cache/UiCache'
import { SignInPage } from '../src/page/SignInPage'
import { SignUpPage } from '../src/page/SignUpPage'
import { UserGenerator } from '../src/generator/UserGenerator'
import { Allure } from '../../Allure'

test('setup: register new user', async ({ page }) => {
  const signInPage = new SignInPage(page)
  const signUpPage = new SignUpPage(page)
  const allureSteps = new Allure(page)

  await allureSteps.suite('setup register new user')

  await allureSteps.step('open sign in page', async () => {
    await signInPage.open()
    await expect(page).toHaveURL(SignInPage.url)
    await allureSteps.makeScreenshot('Sign In Page')
  })

  await allureSteps.step('open sign up page', async () => {
    // bug: Bugs.SIGN_UP_BUTTON
    await signInPage.signUpButton.click()
    await signInPage.signUpButton.click()
    await expect(page).toHaveURL(SignUpPage.url)
    await allureSteps.makeScreenshot('Sign Up Page')
  })

  await allureSteps.step('fill sign up form', async () => {
    const signUpData = UserGenerator.generateRandomSignUpData()
    UiCache.cacheSignUpData(signUpData)
    await signUpPage.fillForm(signUpData)
    await allureSteps.makeScreenshot('Filled Sign Up Form')
  })

  await allureSteps.step('submit sign up form', async () => {
    await signUpPage.signUpButton.click()
    await expect(page).toHaveURL(SignInPage.url)
    await allureSteps.makeScreenshot('Sign Up Successful')
  })
})
