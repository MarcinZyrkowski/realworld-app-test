import { test } from 'allure-playwright'
import { SignInPage } from '../src/page/SignInPage'
import { AllureSteps } from '../src/steps/AllureSteps'
import { SignInSteps } from '../src/steps/SignInSteps'
import { HomePage } from '../src/page/HomePage'
import { BankAccountsPage } from '../src/page/BankAccountsPage'
import { BankDetailsGenerator } from '../src/generator/BankDetailsGenerator'
import { BankAccountsAssertion } from '../src/assertion/BankAccountsAssertion'

test.describe('bank accounts tests', () => {
  let homePage: HomePage
  let bankAccountsPage: BankAccountsPage
  let allureSteps: AllureSteps
  let signInSteps: SignInSteps
  let bankAccountsAssertion: BankAccountsAssertion

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    bankAccountsPage = new BankAccountsPage(page)
    allureSteps = new AllureSteps(page)
    signInSteps = new SignInSteps(page, new SignInPage(page), allureSteps)
    bankAccountsAssertion = new BankAccountsAssertion(bankAccountsPage)
  })

  test('create new bank account', async () => {
    await allureSteps.suite('bank accounts')

    await signInSteps.loginWithExistingUser()

    await allureSteps.step('open bank accounts page', async () => {
      await homePage.menuDrawer.bankAccountsButton.click()
      await allureSteps.makeScreenshot('Bank Accounts')
    })

    await allureSteps.step('click create bank account button', async () => {
      await bankAccountsPage.createBankAccountButton.click()
      await allureSteps.makeScreenshot('Create Bank Account Form')
    })

    const bankDetails = BankDetailsGenerator.generateRandomBankDetails()
    await allureSteps.step('fill bank account form', async () => {
      await bankAccountsPage.createBankAccountFormComponent.fillBankAccountForm(bankDetails)
      await allureSteps.makeScreenshot('Filled Bank Account Form')
    })

    await allureSteps.step('save new bank account', async () => {
      await bankAccountsPage.createBankAccountFormComponent.saveButton.click()
      await allureSteps.makeScreenshot('Bank Account Created')
    })

    await allureSteps.step('verify bank account creation', async () => {
      await bankAccountsAssertion.assertBankAccountCreation(bankDetails.bankName!)
      await allureSteps.makeScreenshot('Bank Account List Updated')
    })
  })

  test.afterEach(async () => {
    await allureSteps.attachVideoIfExists()
  })
})
