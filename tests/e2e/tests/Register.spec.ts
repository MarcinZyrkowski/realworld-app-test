import { test, expect } from 'allure-playwright'
import { SignInPage } from '../src/page/SignInPage'
import { Allure } from '../../Allure'
import { SignUpPage } from '../src/page/SignUpPage'
import { SignUpAssertion } from '../src/assertion/SignUpAssertion'

test.describe('register tests @UI', () => {
  let signInPage: SignInPage
  let signUpPage: SignUpPage
  let allureSteps: Allure
  let signUpAssertion: SignUpAssertion

  test.beforeEach(async ({ page }) => {
    signInPage = new SignInPage(page)
    signUpPage = new SignUpPage(page)
    signUpAssertion = new SignUpAssertion(signUpPage)
    allureSteps = new Allure(page)
  })

  test('verify sign up form', async ({ page }) => {
    await allureSteps.suite('register')

    await allureSteps.step('open sign in page', async () => {
      await signInPage.open()
      await expect(page).toHaveURL(SignInPage.url)
      await allureSteps.makeScreenshot('Sign In Page')
    })

    await allureSteps.step('open sign up page', async () => {
      await signInPage.signUpButton.click()
      await signInPage.signUpButton.click()
      await allureSteps.makeScreenshot('Sign Up Page')
    })

    await allureSteps.step('assert sign up form is visible', async () => {
      await signUpAssertion.assertSignUpFormVisible()
      await expect(page).toHaveURL(SignUpPage.url)
    })
  })

  test.afterEach(async () => {
    await allureSteps.attachVideoIfExists()
  })
})
