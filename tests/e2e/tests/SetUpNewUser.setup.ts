import { expect, test } from '@playwright/test'
import { LoginCache } from '../src/cache/LoginCache'
import { SignInPage } from '../src/page/SignInPage'
import { SignUpPage } from '../src/page/SignUpPage'
import { SignUpDataGenerator } from '../src/generator/SignUpDataGenerator'
import { AllureSteps } from '../src/steps/AllureSteps'

test('setup: register new user', async ({ page }) => {
  const signInPage = new SignInPage(page)
  const signUpPage = new SignUpPage(page)
  const allureSteps = new AllureSteps(page)

  await allureSteps.suite('setup register new user')

  await allureSteps.step('open sign in page', async () => {
    await signInPage.open()
    await expect(page).toHaveURL(SignInPage.url)
    await allureSteps.makeScreenShot('Sign In Page')
  })

  await allureSteps.step('open sign up page', async () => {
    // bug: Bugs.SIGN_UP_BUTTON
    await signInPage.signUpButton.click()
    await signInPage.signUpButton.click()
    await expect(page).toHaveURL(SignUpPage.url)
    await allureSteps.makeScreenShot('Sign Up Page')
  })

  await allureSteps.step('fill sign up form', async () => {
    const signUpData = SignUpDataGenerator.generateRandomSignUpData()
    LoginCache.cacheSignUpData(signUpData)
    await signUpPage.fillForm(signUpData)
    await allureSteps.makeScreenShot('Filled Sign Up Form')
  })

  await allureSteps.step('submit sign up form', async () => {
    await signUpPage.signUpButton.click()
    await expect(page).toHaveURL(SignInPage.url)
    await allureSteps.makeScreenShot('Sign Up Successful')
  })
})
