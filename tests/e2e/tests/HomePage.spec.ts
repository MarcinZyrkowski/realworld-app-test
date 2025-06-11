import { test } from 'allure-playwright'
import { SignInPage } from '../src/page/SignInPage'
import { AllureSteps } from '../src/steps/AllureSteps'
import { SignInSteps } from '../src/steps/SignInSteps'
import { HomePage } from '../src/page/HomePage'
import { HomeAssertion } from '../src/assertion/HomeAssertion'

test.describe('home page tests', () => {
  let homePage: HomePage
  let allureSteps: AllureSteps
  let signInSteps: SignInSteps
  let homeAssertion: HomeAssertion

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    allureSteps = new AllureSteps(page)
    signInSteps = new SignInSteps(page, new SignInPage(page), allureSteps)
    homeAssertion = new HomeAssertion(homePage)
  })

  test('verify home page balance', async () => {
    await allureSteps.suite('home page')

    await signInSteps.loginWithExistingUser()

    await allureSteps.step('assert home page account balance is visible', async () => {
      await homeAssertion.assertAccountBalanceVisible()
    })

    await allureSteps.step('assert home page account balance value is $0.00', async () => {
      await homeAssertion.assertAccountBalanceValue('$0.00')
    })
  })

  test.afterEach(async () => {
    await allureSteps.attachVideoIfExists()
  })
})
