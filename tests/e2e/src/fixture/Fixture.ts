import { test as base } from '@playwright/test'
import { Allure } from '../../../Allure'
import { MyAccountAssertion } from '../assertion/MyAccountAssertion'
import { HomePage } from '../page/HomePage'
import { MyAccountPage } from '../page/MyAccountPage'
import { SignInPage } from '../page/SignInPage'
import { HomeAssertion } from '../assertion/HomeAssertion'
import { BankAccountsPage } from '../page/BankAccountsPage'
import { BankAccountsAssertion } from '../assertion/BankAccountsAssertion'
import { SignUpPage } from '../page/SignUpPage'
import { SignUpAssertion } from '../assertion/SignUpAssertion'
import { SignInAssertion } from '../assertion/SignInAssertion'

type UiFixture = {
  homePage: HomePage
  myAccountPage: MyAccountPage
  signInPage: SignInPage
  signUpPage: SignUpPage
  bankAccountsPage: BankAccountsPage
  allure: Allure
  homeAssertion: HomeAssertion
  myAccountAssertion: MyAccountAssertion
  bankAccountsAssertion: BankAccountsAssertion
  signUpAssertion: SignUpAssertion
  signInAssertion: SignInAssertion
}

export const uiTest = base.extend<UiFixture>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page))
  },
  myAccountPage: async ({ page }, use) => {
    await use(new MyAccountPage(page))
  },
  signInPage: async ({ page }, use) => {
    await use(new SignInPage(page))
  },
  signUpPage: async ({ page }, use) => {
    await use(new SignUpPage(page))
  },
  bankAccountsPage: async ({ page }, use) => {
    await use(new BankAccountsPage(page))
  },
  allure: async ({ page }, use) => {
    await use(new Allure(page))
  },
  myAccountAssertion: async ({ myAccountPage }, use) => {
    await use(new MyAccountAssertion(myAccountPage))
  },
  homeAssertion: async ({ homePage }, use) => {
    await use(new HomeAssertion(homePage))
  },
  bankAccountsAssertion: async ({ bankAccountsPage }, use) => {
    await use(new BankAccountsAssertion(bankAccountsPage))
  },
  signUpAssertion: async ({ signUpPage }, use) => {
    await use(new SignUpAssertion(signUpPage))
  },
  signInAssertion: async ({ signInPage }, use) => {
    await use(new SignInAssertion(signInPage))
  },
})
