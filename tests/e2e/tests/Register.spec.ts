import { expect } from '@playwright/test'
import { SignInPage } from '../src/page/SignInPage'
import { SignUpPage } from '../src/page/SignUpPage'
import { uiTest } from '../src/fixture/Fixture'

uiTest('verify sign up form @UI', async ({ page, allure, signInPage, signUpAssertion }) => {
  await allure.suite('register')

  await allure.step('open sign in page', async () => {
    await signInPage.open()
    await expect(page).toHaveURL(SignInPage.url)
    await allure.makeScreenshot('Sign In Page')
  })

  await allure.step('open sign up page', async () => {
    await signInPage.signUpButton.click()
    await signInPage.signUpButton.click()
    await allure.makeScreenshot('Sign Up Page')
  })

  await allure.step('assert sign up form is visible', async () => {
    await signUpAssertion.assertSignUpFormVisible()
    await expect(page).toHaveURL(SignUpPage.url)
  })
})
