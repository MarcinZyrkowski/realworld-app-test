import { UiCache } from '../src/cache/UiCache'
import { CollectionsUtils } from '../src/utils/CollectionsUtils'
import { uiTest } from '../src/fixture/Fixture'

uiTest('verify account balance @UI', async ({ allure, homePage, homeAssertion }) => {
  await allure.suite('home page')

  await allure.step('open home page', async () => {
    await homePage.open()
  })

  await allure.step('assert home page account balance is visible', async () => {
    await homeAssertion.assertAccountBalanceVisible()
  })

  await allure.step('assert home page account balance value is $0.00', async () => {
    await homeAssertion.assertAccountBalanceValue('$0.00')
  })
})

uiTest('verify home page elements @UI', async ({ allure, homePage, homeAssertion }) => {
  await allure.suite('home page')

  await allure.step('open home page', async () => {
    await homePage.open()
  })

  await allure.step('assert home page elements are visible', async () => {
    await homeAssertion.assertHomePageElementsVisible()
  })

  await allure.step('assert menu drawer is visible', async () => {
    await homeAssertion.assertMenuDrawerVisible()
  })
})

uiTest('verify user account details @UI', async ({ allure, homePage, homeAssertion }) => {
  await allure.suite('home page')

  await allure.step('open home page', async () => {
    await homePage.open()
  })

  await allure.step('verify user account details', async () => {
    const expectedDisplayName = UiCache.retrieveDisplayName()
    const expectedUsername = '@' + UiCache.retrieveUsername()
    await homeAssertion.verifyUserAccountDetails(expectedDisplayName, expectedUsername)
  })
})

uiTest('transactions history is displayed @UI', async ({ allure, homePage, homeAssertion }) => {
  await allure.suite('home page')

  await allure.step('open home page', async () => {
    await homePage.open()
  })

  await allure.step('wait for transactions', async () => {
    await homePage.waitForTransactionsList()
    await allure.makeScreenshot('Transactions List')
  })

  await allure.step('assert transactions history is displayed', async () => {
    await homeAssertion.assertTransactionsHistoryIsDisplayed()
  })
})

uiTest('open transaction details @UI', async ({ allure, homePage, homeAssertion }) => {
  await allure.suite('home page')

  await allure.step('open home page', async () => {
    await homePage.open()
  })

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
