import { Locator, Page } from '@playwright/test'
import { BankDetails } from '../types/page/HomePageTypes'

export class HomePage {
  static readonly url = '/'
  readonly page: Page
  readonly getStartedDialog: GetStartedDialog
  readonly createBankAccountDialog: CreateBankAccountDialog
  readonly finishedDialog: FinishedDialog

  constructor(page: Page) {
    this.page = page
    this.getStartedDialog = new GetStartedDialog(page)
    this.createBankAccountDialog = new CreateBankAccountDialog(page)
    this.finishedDialog = new FinishedDialog(page)
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
