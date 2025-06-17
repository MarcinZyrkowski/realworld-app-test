import { test } from 'allure-playwright'
import { SignInPage } from '../src/page/SignInPage'
import { Allure } from '../../Allure'
import { SignInSteps } from '../src/steps/SignInSteps'
import { HomePage } from '../src/page/HomePage'
import { MyAccountPage } from '../src/page/MyAccountPage'
import { MyAccountAssertion } from '../src/assertion/MyAccountAssertion'
import { faker } from '@faker-js/faker'

test.describe('my account tests @UI', () => {
  let homePage: HomePage
  let myAccountPage: MyAccountPage
  let allure: Allure
  let signInSteps: SignInSteps
  let myAccountAssertion: MyAccountAssertion

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    myAccountPage = new MyAccountPage(page)
    allure = new Allure(page)
    signInSteps = new SignInSteps(page, new SignInPage(page), allure)
    myAccountAssertion = new MyAccountAssertion(myAccountPage)
  })

  test('verify my accounts elements', async () => {
    await allure.suite('my account')

    await signInSteps.loginWithExistingUser()

    await allure.step('open my account', async () => {
      await homePage.menuDrawer.myAccountButton.click()
      await allure.makeScreenshot('My Account Page')
    })

    await allure.step('verify my account elements', async () => {
      await myAccountAssertion.assertUserSettingsVisible()
    })
  })

  test('update user account details', async () => {
    await allure.suite('my account')

    await signInSteps.loginWithExistingUser()

    await allure.step('open my account', async () => {
      await homePage.menuDrawer.myAccountButton.click()
      await allure.makeScreenshot('My Account Page')
    })

    const myAccountDataToUpdate = {
      email: faker.internet.email(),
      phone: faker.phone.number({ style: 'international' }).substring(1), // Remove the leading '+' sign
    }

    await allure.step('update user account details', async () => {
      await myAccountPage.fillUserDetails(myAccountDataToUpdate)
      await allure.makeScreenshot('Filled My Account Form')
      await myAccountPage.saveButton.click()
    })

    await allure.step('verify user account details updated', async () => {
      await myAccountAssertion.assertUserDetailsUpdated(myAccountDataToUpdate)
      await allure.makeScreenshot('Updated My Account Form')
    })

    // Note: There is a bug where no popup appears to confirm the update. Bugs.MY_ACCOUNT_DETAILS_UPDATE
    // extra step to verify the absence of the popup

    await allure.step('open home screen', async () => {
      await homePage.menuDrawer.homeButton.click()
      await allure.makeScreenshot('Home Page')
    })

    await allure.step('open my account again', async () => {
      await homePage.menuDrawer.myAccountButton.click()
      await allure.makeScreenshot('My Account Page Again')
    })

    await allure.step('verify user account details updated - double check', async () => {
      await myAccountAssertion.assertUserDetailsUpdated(myAccountDataToUpdate)
      await allure.makeScreenshot('Updated My Account Form')
    })
  })

  test.afterEach(async () => {
    await allure.attachVideoIfExists()
  })
})
