import { test, expect } from 'allure-playwright'
import { SignInPage } from '../src/page/SignInPage'
import { Allure } from '../../Allure'
import { SignUpPage } from '../src/page/SignUpPage'
import { SignUpAssertion } from '../src/assertion/SignUpAssertion'

test.describe('register tests @UI', () => {
  let signInPage: SignInPage
  let signUpPage: SignUpPage
  let allure: Allure
  let signUpAssertion: SignUpAssertion

  test.beforeEach(async ({ page }) => {
    signInPage = new SignInPage(page)
    signUpPage = new SignUpPage(page)
    signUpAssertion = new SignUpAssertion(signUpPage)
    allure = new Allure(page)
  })

  test('verify sign up form', async ({ page }) => {
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

  test.afterEach(async () => {
    await allure.attachVideoIfExists()
  })
})
