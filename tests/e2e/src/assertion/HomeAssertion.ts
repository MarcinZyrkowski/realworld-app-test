import { expect } from '@playwright/test'
import { HomePage } from '../page/HomePage'
import { TransactionDetails } from '../types/page/HomePageTypes'

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
    const home = this.homePage
    await expect(home.logo).toBeVisible()
    await expect(home.everyoneTab).toBeVisible()
    await expect(home.friendsTab).toBeVisible()
    await expect(home.mineTab).toBeVisible()
    await expect(home.newTransactionButton).toBeVisible()
    await expect(home.notificationsBellButton).toBeVisible()
    await expect(home.transactionsList).toBeVisible()
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

  async verifyUserAccountDetails(
    userFullName: string,
    username: string,
  ): Promise<void> {
    const drawer = this.homePage.menuDrawer
    await expect(drawer.userFullName).toHaveText(userFullName)
    await expect(drawer.username).toHaveText(username)
  }

  async assertTransactionsHistoryIsDisplayed(): Promise<void> {
    const transactions = await this.homePage.getVisibleTransactions()
    expect(transactions.length).toBeGreaterThan(0)
  }

  async verifyTransactionDetails(details: TransactionDetails): Promise<void> {
    expect([' requested ', ' paid ', ' charged ']).toContain(details.action)
    expect(
      details.description.includes('Request: ') ||
        details.description.includes('Payment: '),
    ).toBe(true)
    expect(details.title).toBe('Transaction Detail')
    expect(details.sender).not.toBeNull()
    expect(details.receiver).not.toBeNull()
    expect(details.amount).toContain('$')
    expect(details.likeCount).toBeGreaterThanOrEqual(0)
  }
}
