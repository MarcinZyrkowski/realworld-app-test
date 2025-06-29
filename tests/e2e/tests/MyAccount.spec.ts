import { uiTest } from '../src/fixture/Fixture'
import { AccountDataGenerator } from '../src/generator/AccountDataGenerator'

uiTest(
  'verify my accounts elements @UI',
  async ({ allure, homePage, myAccountAssertion }) => {
    await allure.suite('my account')

    await allure.step('open home page', async () => {
      await homePage.open()
      await allure.makeScreenshot('Home Page')
    })

    await allure.step('open my account', async () => {
      await homePage.menuDrawer.myAccountButton.click()
      await allure.makeScreenshot('My Account Page')
    })

    await allure.step('verify my account elements', async () => {
      await myAccountAssertion.assertUserSettingsVisible()
    })
  },
)

uiTest(
  'update user account details @UI',
  async ({ allure, homePage, myAccountPage, myAccountAssertion }) => {
    await allure.suite('my account')

    await allure.step('open home page', async () => {
      await homePage.open()
      await allure.makeScreenshot('Home Page')
    })

    await allure.step('open my account', async () => {
      await homePage.menuDrawer.myAccountButton.click()
      await allure.makeScreenshot('My Account Page')
    })

    const myAccountDataToUpdate =
      AccountDataGenerator.generateEmailAndPhoneAccountData()

    await allure.step('update user account details', async () => {
      await myAccountPage.fillUserDetails(myAccountDataToUpdate)
      await allure.makeScreenshot('Filled My Account Form')
      await myAccountPage.saveButton.click()
    })

    await allure.step('verify user account details updated', async () => {
      await myAccountAssertion.assertUserDetailsUpdated(myAccountDataToUpdate)
      await allure.makeScreenshot('Updated My Account Form')
    })

    /* Note: There is a bug where no popup appears to confirm the update. 
     Bugs.MY_ACCOUNT_DETAILS_UPDATE extra step to verify the absence of the popup */

    await allure.step('open home screen', async () => {
      await homePage.menuDrawer.homeButton.click()
      await allure.makeScreenshot('Home Page')
    })

    await allure.step('open my account again', async () => {
      await homePage.menuDrawer.myAccountButton.click()
      await allure.makeScreenshot('My Account Page Again')
    })

    await allure.step(
      'verify user account details updated - double check',
      async () => {
        await myAccountAssertion.assertUserDetailsUpdated(myAccountDataToUpdate)
        await allure.makeScreenshot('Updated My Account Form')
      },
    )
  },
)
