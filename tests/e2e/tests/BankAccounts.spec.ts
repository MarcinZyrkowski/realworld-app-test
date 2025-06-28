import { BankDetailsGenerator } from '../src/generator/BankDetailsGenerator'
import { uiTest } from '../src/fixture/Fixture'

uiTest(
  'create new bank account @UI',
  async ({ allure, homePage, bankAccountsPage, bankAccountsAssertion }) => {
    await allure.suite('bank accounts')

    await allure.step('open home page', async () => {
      await homePage.open()
    })

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
      await bankAccountsPage.createBankAccountForm.fillBankAccountForm(
        bankDetails,
      )
      await allure.makeScreenshot('Filled Bank Account Form')
    })

    await allure.step('save new bank account', async () => {
      await bankAccountsPage.createBankAccountForm.saveButton.click()
      await allure.makeScreenshot('Bank Account Created')
    })

    await allure.step('verify bank account creation', async () => {
      await bankAccountsAssertion.assertBankAccountVisible(
        bankDetails.bankName!,
      )
      await allure.makeScreenshot('Bank Account List Updated')
    })
  },
)

uiTest(
  'delete bank account @UI',
  async ({ allure, homePage, bankAccountsPage, bankAccountsAssertion }) => {
    await allure.suite('bank accounts')

    await allure.step('open home page', async () => {
      await homePage.open()
    })

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
      await bankAccountsPage.createBankAccountForm.fillBankAccountForm(
        bankDetails,
      )
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
      await bankAccountsAssertion.assertBankAccountVisible(
        bankDetails.bankName! + ' (Deleted)',
      )
    })
  },
)
