import { test } from 'allure-playwright'
import { SignInPage } from '../src/page/SignInPage'
import { Allure } from '../../Allure'
import { SignInSteps } from '../src/steps/SignInSteps'
import { HomePage } from '../src/page/HomePage'
import { BankAccountsPage } from '../src/page/BankAccountsPage'
import { BankDetailsGenerator } from '../src/generator/BankDetailsGenerator'
import { BankAccountsAssertion } from '../src/assertion/BankAccountsAssertion'

test.describe('bank accounts tests @UI', () => {
  let homePage: HomePage
  let bankAccountsPage: BankAccountsPage
  let allure: Allure
  let signInSteps: SignInSteps
  let bankAccountsAssertion: BankAccountsAssertion

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    bankAccountsPage = new BankAccountsPage(page)
    allure = new Allure(page)
    signInSteps = new SignInSteps(page, new SignInPage(page), allure)
    bankAccountsAssertion = new BankAccountsAssertion(bankAccountsPage)
  })

  test('create new bank account', async () => {
    await allure.suite('bank accounts')

    await signInSteps.loginWithExistingUser()

    await allure.step('open bank accounts page', async () => {
      await homePage.menuDrawer.bankAccountsButton.click()
      await allure.makeScreenshot('Bank Accounts')
    })

    await allure.step('click create bank account button', async () => {
      await bankAccountsPage.createBankAccountButton.click()
      await allure.makeScreenshot('Create Bank Account Form')
    })

    const bankDetails = BankDetailsGenerator.generateRandomBankDetails()
    await allure.step('fill bank account form', async () => {
      await bankAccountsPage.createBankAccountForm.fillBankAccountForm(bankDetails)
      await allure.makeScreenshot('Filled Bank Account Form')
    })

    await allure.step('save new bank account', async () => {
      await bankAccountsPage.createBankAccountForm.saveButton.click()
      await allure.makeScreenshot('Bank Account Created')
    })

    await allure.step('verify bank account creation', async () => {
      await bankAccountsAssertion.assertBankAccountVisible(bankDetails.bankName!)
      await allure.makeScreenshot('Bank Account List Updated')
    })
  })

  test('delete bank account', async () => {
    await allure.suite('bank accounts')

    await signInSteps.loginWithExistingUser()

    await allure.step('open bank accounts page', async () => {
      await homePage.menuDrawer.bankAccountsButton.click()
      await allure.makeScreenshot('Bank Accounts')
    })

    await allure.step('click create bank account button', async () => {
      await bankAccountsPage.createBankAccountButton.click()
      await allure.makeScreenshot('Create Bank Account Form')
    })

    const bankDetails = BankDetailsGenerator.generateRandomBankDetails()
    await allure.step('fill bank account form', async () => {
      await bankAccountsPage.createBankAccountForm.fillBankAccountForm(bankDetails)
      await allure.makeScreenshot('Filled Bank Account Form')
    })

    await allure.step('save new bank account', async () => {
      await bankAccountsPage.createBankAccountForm.saveButton.click()
      await allure.makeScreenshot('Bank Account Created')
    })

    await allure.step('delete bank account', async () => {
      await bankAccountsPage.deleteBankAccount(bankDetails.bankName!)
      await allure.makeScreenshot('Bank Account Deleted')
    })

    await allure.step('verify bank account is deleted', async () => {
      await bankAccountsAssertion.assertBankAccountAbsent(bankDetails.bankName!)
      // deleted bank account should still be visible with "(Deleted)" suffix
      await bankAccountsAssertion.assertBankAccountVisible(bankDetails.bankName! + ' (Deleted)')
    })
  })

  test.afterEach(async () => {
    await allure.attachVideoIfExists()
  })
})
