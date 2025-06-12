import { test } from 'allure-playwright'
import { SignInPage } from '../src/page/SignInPage'
import { AllureSteps } from '../src/steps/AllureSteps'
import { SignInSteps } from '../src/steps/SignInSteps'
import { HomePage } from '../src/page/HomePage'
import { MyAccountPage } from '../src/page/MyAccountPage'
import { MyAccountAssertion } from '../src/assertion/MyAccountAssertion'

test.describe('my account tests', () => {
  let homePage: HomePage
  let myAccountPage: MyAccountPage
  let allureSteps: AllureSteps
  let signInSteps: SignInSteps
  let myAccountAssertion: MyAccountAssertion

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    myAccountPage = new MyAccountPage(page)
    allureSteps = new AllureSteps(page)
    signInSteps = new SignInSteps(page, new SignInPage(page), allureSteps)
    myAccountAssertion = new MyAccountAssertion(myAccountPage)
  })

  test('verify my accounts elements', async () => {
    await allureSteps.suite('my account')

    await signInSteps.loginWithExistingUser()

    await allureSteps.step('open my account', async () => {
      await homePage.menuDrawer.myAccountButton.click()
      await allureSteps.makeScreenshot('my account page')
    })

    await allureSteps.step('verify my account elements', async () => {
      await myAccountAssertion.assertUserSettingsVisible()
    })
  })

  test.afterEach(async () => {
    await allureSteps.attachVideoIfExists()
  })
})
