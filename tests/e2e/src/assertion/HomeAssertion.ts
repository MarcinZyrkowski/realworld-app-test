import { expect } from '@playwright/test'
import { HomePage } from '../page/HomePage'

export class HomeAssertion {
  readonly homePage: HomePage

  constructor(homePage: HomePage) {
    this.homePage = homePage
  }

  async assertGetStartedDialogVisible(): Promise<void> {
    const dialog = this.homePage.getStartedDialog
    await expect(dialog.title).toBeVisible()
    await expect(dialog.nextButton).toBeVisible()
  }

  async assertCreateBankAccountDialogVisible(): Promise<void> {
    const dialog = this.homePage.createBankAccountDialog
    await expect(dialog.title).toBeVisible()
    await expect(dialog.saveButton).toBeVisible()
    await expect(dialog.bankNameInput).toBeVisible()
    await expect(dialog.routingNumberInput).toBeVisible()
    await expect(dialog.accountNumberInput).toBeVisible()
  }

  async assertFinishedDialogVisible(): Promise<void> {
    const dialog = this.homePage.finishedDialog
    await expect(dialog.title).toBeVisible()
    await expect(dialog.doneButton).toBeVisible()
  }

  async assertNoDialogIsVisible(): Promise<void> {
    const dialog = this.homePage.page.getByRole('dialog')
    await expect(dialog).toBeHidden()
  }

  async assertAccountBalanceVisible(): Promise<void> {
    const menu = this.homePage.menuDrawer
    await expect(menu.accountBalanceValue).toBeVisible()
    await expect(menu.accountBalanceTitle).toBeVisible()
  }

  async assertAccountBalanceValue(value: string): Promise<void> {
    await expect(this.homePage.menuDrawer.accountBalanceValue).toHaveText(value)
  }

  async assertHomePageElementsVisible(): Promise<void> {
    await expect(this.homePage.logo).toBeVisible()
    await expect(this.homePage.everyoneTab).toBeVisible()
    await expect(this.homePage.friendsTab).toBeVisible()
    await expect(this.homePage.mineTab).toBeVisible()
    await expect(this.homePage.newTransactionButton).toBeVisible()
    await expect(this.homePage.notificationsBellButton).toBeVisible()
  }

  async assertMenuDrawerVisible(): Promise<void> {
    const drawer = this.homePage.menuDrawer
    await expect(this.homePage.menuDrawerButton).toBeVisible()
    await expect(drawer.userFullName).toBeVisible()
    await expect(drawer.username).toBeVisible()
    await expect(drawer.accountBalanceValue).toBeVisible()
    await expect(drawer.accountBalanceTitle).toBeVisible()
    await expect(drawer.homeButton).toBeVisible()
    await expect(drawer.myAccountButton).toBeVisible()
    await expect(drawer.bankAccountsButton).toBeVisible()
    await expect(drawer.notificationsButton).toBeVisible()
    await expect(drawer.logOutButton).toBeVisible()
  }

  async verifyUserAccountDetails(userFullName: string, username: string): Promise<void> {
    const drawer = this.homePage.menuDrawer
    await expect(drawer.userFullName).toHaveText(userFullName)
    await expect(drawer.username).toHaveText(username)
  }
}
