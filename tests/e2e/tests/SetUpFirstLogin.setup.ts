import { SignInPage } from '../src/page/SignInPage'
import { LoginCache } from '../src/cache/LoginCache'
import { HomeAssertion } from '../src/assertion/HomeAssertion'
import { BankDetailsGenerator } from '../src/generator/BankDetailsGenerator'
import { expect, test } from '@playwright/test'
import { HomePage } from '../src/page/HomePage'
import { AllureSteps } from '../src/steps/AllureSteps'

test('setup: login new user for first time', async ({ page }) => {
  const signInPage = new SignInPage(page)
  const homePage = new HomePage(page)
  const allureSteps = new AllureSteps(page)
  const homeAssertion = new HomeAssertion(homePage)

  await allureSteps.suite('setup first login')

  await allureSteps.step('open sign in page', async () => {
    await signInPage.open()
    await expect(page).toHaveURL(SignInPage.url)
    await allureSteps.makeScreenshot('Sign In Page')
  })

  await allureSteps.step('fill sign in form', async () => {
    const signInData = LoginCache.retrieveSignInData()
    await signInPage.fillForm(signInData)
    await allureSteps.makeScreenshot('Filled Sign In Form')
    await signInPage.signInButton.click()
    await expect(page).toHaveURL(HomePage.url)
  })

  await allureSteps.step('get started is visible', async () => {
    await homeAssertion.assertGetStartedDialogVisible()
    await allureSteps.makeScreenshot('Get Started Dialog')
  })

  await allureSteps.step('create bank account dialog is visible', async () => {
    await homePage.getStartedDialog.nextButton.click()
    await homeAssertion.assertCreateBankAccountDialogVisible()
    const bankDetails = BankDetailsGenerator.generateRandomBankDetails()
    await homePage.createBankAccountDialog.fillBankAccountForm(bankDetails)
    await allureSteps.makeScreenshot('Filled Create Bank Account Form')
  })

  await allureSteps.step('finished dialog is visible', async () => {
    await homePage.createBankAccountDialog.saveButton.click()
    await homeAssertion.assertFinishedDialogVisible()
    await allureSteps.makeScreenshot('Finished Dialog')
  })

  await allureSteps.step('no dialog is visible', async () => {
    await homePage.finishedDialog.doneButton.click()
    await homeAssertion.assertNoDialogIsVisible()
    await allureSteps.makeScreenshot('No Dialog Visible')
  })
})
