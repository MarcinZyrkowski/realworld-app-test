import { expect } from '@playwright/test'
import { CreateBankAccountComponentAssertion } from '../src/assertion/component/CreateBankAccountComponentAssertion'
import { UiCache } from '../src/cache/UiCache'
import { uiTest } from '../src/fixture/Fixture'
import { BankDetailsGenerator } from '../src/generator/BankDetailsGenerator'
import { HomePage } from '../src/page/HomePage'
import { SignInPage } from '../src/page/SignInPage'

uiTest(
  'setup: login new user for first time @UI',
  async ({ page, allure, signInPage, homeAssertion, homePage }) => {
    await allure.suite('setup first login')

    await allure.step('open sign in page', async () => {
      await signInPage.open()
      await expect(page).toHaveURL(SignInPage.url)
      await allure.makeScreenshot('Sign In Page')
    })

    await allure.step('fill sign in form', async () => {
      const signInData = await UiCache.retrieveSignInData()
      await signInPage.fillForm(signInData)
      await allure.makeScreenshot('Filled Sign In Form')
    })

    await allure.step('sign in', async () => {
      await signInPage.signInButton.click()
    })

    await allure.step('verify user is signed in', async () => {
      await expect(page).toHaveURL(HomePage.url)
    })

    await allure.step('store session', async () => {
      await UiCache.cacheStorageState(page)
    })

    await allure.step('get started is visible', async () => {
      await homeAssertion.assertGetStartedDialogVisible()
      await allure.makeScreenshot('Get Started Dialog')
    })

    await allure.step('create bank account dialog is visible', async () => {
      await homePage.getStartedDialog.nextButton.click()
      await CreateBankAccountComponentAssertion.assertThat(
        homePage.createBankAccountDialog,
      ).assertCreateBankAccountComponentVisible()
      const bankDetails = BankDetailsGenerator.generateRandomBankDetails()
      await homePage.createBankAccountDialog.fillBankAccountForm(bankDetails)
      await allure.makeScreenshot('Filled Create Bank Account Form')
    })

    await allure.step('finished dialog is visible', async () => {
      await homePage.createBankAccountDialog.saveButton.click()
      await homeAssertion.assertFinishedDialogVisible()
      await allure.makeScreenshot('Finished Dialog')
    })

    await allure.step('no dialog is visible', async () => {
      await homePage.finishedDialog.doneButton.click()
      await homeAssertion.assertNoDialogIsVisible()
      await allure.makeScreenshot('No Dialog Visible')
    })
  },
)
