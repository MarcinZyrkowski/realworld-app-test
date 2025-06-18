import { test } from 'allure-playwright'
import { SignInPage } from '../src/page/SignInPage'
import { Allure } from '../../Allure'
import { SignInSteps } from '../src/steps/SignInSteps'
import { HomePage } from '../src/page/HomePage'
import { HomeAssertion } from '../src/assertion/HomeAssertion'
import { UiCache } from '../src/cache/UiCache'
import { CollectionsUtils } from '../src/utils/CollectionsUtils'

test.describe('home page tests @UI', () => {
  let homePage: HomePage
  let allure: Allure
  let signInSteps: SignInSteps
  let homeAssertion: HomeAssertion

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    allure = new Allure(page)
    signInSteps = new SignInSteps(page, new SignInPage(page), allure)
    homeAssertion = new HomeAssertion(homePage)
  })

  test('verify account balance', async () => {
    await allure.suite('home page')

    await signInSteps.loginWithExistingUser()

    await allure.step('assert home page account balance is visible', async () => {
      await homeAssertion.assertAccountBalanceVisible()
    })

    await allure.step('assert home page account balance value is $0.00', async () => {
      await homeAssertion.assertAccountBalanceValue('$0.00')
    })
  })

  test('verify home page elements', async () => {
    await allure.suite('home page')

    await signInSteps.loginWithExistingUser()

    await allure.step('assert home page elements are visible', async () => {
      await homeAssertion.assertHomePageElementsVisible()
    })

    await allure.step('assert menu drawer is visible', async () => {
      await homeAssertion.assertMenuDrawerVisible()
    })
  })

  test('verify user account details', async () => {
    await allure.suite('home page')

    await signInSteps.loginWithExistingUser()

    await allure.step('verify user account details', async () => {
      const expectedDisplayName = UiCache.retrieveDisplayName()
      const expectedUsername = '@' + UiCache.retrieveUsername()
      await homeAssertion.verifyUserAccountDetails(expectedDisplayName, expectedUsername)
    })
  })

  test('transactions history is displayed', async () => {
    await allure.suite('home page')

    await signInSteps.loginWithExistingUser()

    await allure.step('wait for transactions', async () => {
      await homePage.waitForTransactionsList()
      await allure.makeScreenshot('Transactions List')
    })

    await allure.step('assert transactions history is displayed', async () => {
      await homeAssertion.assertTransactionsHistoryIsDisplayed()
    })
  })

  test('open transaction details', async () => {
    await allure.suite('home page')

    await signInSteps.loginWithExistingUser()

    await allure.step('wait for transactions', async () => {
      await homePage.waitForTransactionsList()
      await allure.makeScreenshot('Transactions List')
    })

    await allure.step('open a random transaction details', async () => {
      const transactions = await homePage.getVisibleTransactions()
      const transactionToOpen = CollectionsUtils.randomElement(transactions)
      await transactionToOpen.click()
    })

    await allure.step('verify transaction details', async () => {
      const details = await homePage.getOpenedTransactionDetails()
      await homeAssertion.verifyTransactionDetails(details)
      await allure.makeScreenshot('Transaction Details')
    })
  })

  test.afterEach(async () => {
    await allure.attachVideoIfExists()
  })
})
