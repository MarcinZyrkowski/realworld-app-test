import { SignInPage } from '../src/page/SignInPage'
import { UiCache } from '../src/cache/UiCache'
import { HomeAssertion } from '../src/assertion/HomeAssertion'
import { BankDetailsGenerator } from '../src/generator/BankDetailsGenerator'
import { expect, test } from '@playwright/test'
import { HomePage } from '../src/page/HomePage'
import { Allure } from '../../Allure'
import { CreateBankAccountComponentAssertion } from '../src/assertion/component/CreateBankAccountComponentAssertion'

test('setup: login new user for first time @UI', async ({ page }) => {
  const signInPage = new SignInPage(page)
  const homePage = new HomePage(page)
  const allure = new Allure(page)
  const homeAssertion = new HomeAssertion(homePage)

  await allure.suite('setup first login')

  await allure.step('open sign in page', async () => {
    await signInPage.open()
    await expect(page).toHaveURL(SignInPage.url)
    await allure.makeScreenshot('Sign In Page')
  })

  await allure.step('fill sign in form', async () => {
    const signInData = UiCache.retrieveSignInData()
    await signInPage.fillForm(signInData)
    await allure.makeScreenshot('Filled Sign In Form')
    await signInPage.signInButton.click()
    await expect(page).toHaveURL(HomePage.url)
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
})
