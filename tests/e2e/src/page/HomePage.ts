import { Locator, Page } from '@playwright/test'
import { BankDetails, TransactionDetails } from '../types/page/HomePageTypes'

export class HomePage {
  static readonly url = '/'
  readonly page: Page
  readonly menuDrawerButton: Locator
  readonly menuDrawer: MenuDrawer
  readonly logo: Locator
  readonly everyoneTab: Locator
  readonly friendsTab: Locator
  readonly mineTab: Locator
  readonly newTransactionButton: Locator
  readonly notificationsBellButton: Locator
  readonly transactionsList: Locator
  readonly getStartedDialog: GetStartedDialog
  readonly createBankAccountDialog: CreateBankAccountDialog
  readonly finishedDialog: FinishedDialog

  constructor(page: Page) {
    this.page = page
    this.menuDrawerButton = this.page.locator('[data-test="sidenav-toggle"]')
    this.menuDrawer = new MenuDrawer(page)
    this.logo = this.page.locator('[data-test="app-name-logo"]')
    this.everyoneTab = this.page.getByRole('tab', { name: 'Everyone' })
    this.friendsTab = this.page.getByRole('tab', { name: 'Friends' })
    this.mineTab = this.page.getByRole('tab', { name: 'Mine' })
    this.newTransactionButton = this.page.getByRole('button', { name: 'New' })
    this.notificationsBellButton = this.page.locator('[data-test="nav-top-notifications-link"]')
    this.transactionsList = this.page.locator('[data-test="transaction-list"]')
    this.getStartedDialog = new GetStartedDialog(page)
    this.createBankAccountDialog = new CreateBankAccountDialog(page)
    this.finishedDialog = new FinishedDialog(page)
  }

  async waitForTransactionsList(): Promise<void> {
    await this.transactionsList.waitFor({ state: 'visible' })
  }

  async getVisibleTransactions(): Promise<Locator[]> {
    return this.transactionsList.locator('[data-test^="transaction-item-"]').all()
  }

  async getOpenedTransactionDetails(): Promise<TransactionDetails> {
    const title = await this.page.locator('[data-test="transaction-detail-header"]').textContent()
    const sender = await this.page
      .locator('[data-test^="transaction-sender-"]')
      .last()
      .textContent()
    const receiver = await this.page
      .locator('[data-test^="transaction-receiver-"]')
      .last()
      .textContent()
    const action = await this.page.locator('[data-test^="transaction-action-"]').textContent()
    const description = await this.page
      .locator('[data-test="transaction-description"]')
      .textContent()
    const amount = await this.page.locator('[data-test^="transaction-amount-"]').textContent()
    const likeCount = await this.page
      .locator('[data-test^="transaction-like-count-"]')
      .textContent()
      .then((text) => parseInt(text || '0', 10))

    return {
      title: title || '',
      sender: sender || '',
      receiver: receiver || '',
      action: action || '',
      description: description || '',
      amount: amount || '',
      likeCount: isNaN(likeCount) ? 0 : likeCount,
    }
  }
}

export class MenuDrawer {
  readonly page: Page
  readonly userFullName: Locator
  readonly username: Locator
  readonly accountBalanceValue: Locator
  readonly accountBalanceTitle: Locator
  readonly homeButton: Locator
  readonly myAccountButton: Locator
  readonly bankAccountsButton: Locator
  readonly notificationsButton: Locator
  readonly logOutButton: Locator

  constructor(page: Page) {
    this.page = page
    this.userFullName = this.page.locator('[data-test="sidenav-user-full-name"]')
    this.username = this.page.locator('[data-test="sidenav-username"]')
    this.accountBalanceValue = this.page.locator('[data-test="sidenav-user-balance"]')
    this.accountBalanceTitle = this.page.getByText('Account Balance')
    this.homeButton = this.page.getByRole('button', { name: 'Home' })
    this.myAccountButton = this.page.getByRole('button', { name: 'My Account' })
    this.bankAccountsButton = this.page.getByRole('button', { name: 'Bank Accounts' })
    this.notificationsButton = this.page.getByRole('button', { name: 'Notifications' })
    this.logOutButton = this.page.getByRole('button', { name: 'Logout' })
  }
}

export class GetStartedDialog {
  readonly page: Page
  readonly dialog: Locator
  readonly title: Locator
  readonly nextButton: Locator

  constructor(page: Page) {
    this.page = page
    this.dialog = this.page.getByRole('dialog')
    this.title = this.dialog.getByText('Get Started with Real World App')
    this.nextButton = this.dialog.getByRole('button', { name: 'Next' })
  }
}

export class CreateBankAccountDialog {
  readonly page: Page
  readonly dialog: Locator
  readonly title: Locator
  readonly saveButton: Locator
  readonly bankNameInput: Locator
  readonly routingNumberInput: Locator
  readonly accountNumberInput: Locator

  constructor(page: Page) {
    this.page = page
    this.dialog = this.page.getByRole('dialog')
    this.title = this.dialog.getByText('Create Bank Account')
    this.saveButton = this.dialog.getByRole('button', { name: 'Save' })
    this.bankNameInput = this.dialog.getByPlaceholder('Bank Name')
    this.routingNumberInput = this.dialog.getByPlaceholder('Routing Number')
    this.accountNumberInput = this.dialog.getByPlaceholder('Account Number')
  }

  async fillBankAccountForm(bankDetails: BankDetails): Promise<void> {
    if (bankDetails.bankName) {
      await this.bankNameInput.fill(bankDetails.bankName)
    }
    if (bankDetails.routingNumber) {
      await this.routingNumberInput.fill(bankDetails.routingNumber)
    }
    if (bankDetails.accountNumber) {
      await this.accountNumberInput.fill(bankDetails.accountNumber)
    }
  }
}

export class FinishedDialog {
  readonly page: Page
  readonly dialog: Locator
  readonly title: Locator
  readonly doneButton: Locator

  constructor(page: Page) {
    this.page = page
    this.dialog = this.page.getByRole('dialog')
    this.title = this.dialog.getByText('Finished')
    this.doneButton = this.dialog.getByRole('button', { name: 'Done' })
  }
}
