import { test } from 'allure-playwright'
import { SignInPage } from '../src/page/SignInPage'
import { AllureSteps } from '../src/steps/AllureSteps'
import { SignInSteps } from '../src/steps/SignInSteps'
import { HomePage } from '../src/page/HomePage'
import { HomeAssertion } from '../src/assertion/HomeAssertion'
import { LoginCache } from '../src/cache/LoginCache'

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

  test('verify account balance', async () => {
    await allureSteps.suite('home page')

    await signInSteps.loginWithExistingUser()

    await allureSteps.step('assert home page account balance is visible', async () => {
      await homeAssertion.assertAccountBalanceVisible()
    })

    await allureSteps.step('assert home page account balance value is $0.00', async () => {
      await homeAssertion.assertAccountBalanceValue('$0.00')
    })
  })

  test('verify home page elements', async () => {
    await allureSteps.suite('home page')

    await signInSteps.loginWithExistingUser()

    await allureSteps.step('assert home page elements are visible', async () => {
      await homeAssertion.assertHomePageElementsVisible()
    })

    await allureSteps.step('assert menu drawer is visible', async () => {
      await homeAssertion.assertMenuDrawerVisible()
    })
  })

  test('verify user account details', async () => {
    await allureSteps.suite('home page')

    await signInSteps.loginWithExistingUser()

    await allureSteps.step('verify user account details', async () => {
      const expectedDisplayName = LoginCache.retrieveDisplayName()
      const expectedUsername = '@' + LoginCache.retrieveUsername()
      await homeAssertion.verifyUserAccountDetails(expectedDisplayName, expectedUsername)
    })
  })

  test.afterEach(async () => {
    await allureSteps.attachVideoIfExists()
  })
})
