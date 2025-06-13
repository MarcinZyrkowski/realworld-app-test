import { Locator, Page } from '@playwright/test'
import { BankDetails } from '../types/page/CommonTypes'

export class BankAccountsPage {
  readonly page: Page
  readonly createBankAccountButton: Locator
  readonly bankList: Locator
  readonly createBankAccountFormComponent: CreateBankAccountFormComponent

  constructor(page: Page) {
    this.page = page
    this.createBankAccountButton = this.page.getByRole('button', { name: 'Create' })
    this.bankList = this.page.locator('[data-test="bankaccount-list"]')
    this.createBankAccountFormComponent = new CreateBankAccountFormComponent(page)
  }

  async getBankAccountsNames(): Promise<string[]> {
    const bankAccounts = await this.bankList.locator('li p').all()
    const bankNames: string[] = []
    for (const account of bankAccounts) {
      const name = await account.textContent()
      if (name) {
        bankNames.push(name.trim())
      }
    }
    return bankNames
  }
}

export class CreateBankAccountFormComponent {
  readonly page: Page
  readonly title: Locator
  readonly bankNameInput: Locator
  readonly routingNumberInput: Locator
  readonly accountNumberInput: Locator
  readonly saveButton: Locator

  constructor(page: Page) {
    this.page = page
    this.title = this.page.getByText('Create Bank Account')
    this.bankNameInput = this.page.getByPlaceholder('Bank Name')
    this.routingNumberInput = this.page.getByPlaceholder('Routing Number')
    this.accountNumberInput = this.page.getByPlaceholder('Account Number')
    this.saveButton = this.page.getByRole('button', { name: 'Save' })
  }

  async fillBankAccountForm(bankDetails: BankDetails): Promise<void> {
    if (bankDetails.bankName !== undefined) {
      await this.bankNameInput.fill(bankDetails.bankName)
    }
    if (bankDetails.routingNumber !== undefined) {
      await this.routingNumberInput.fill(bankDetails.routingNumber)
    }
    if (bankDetails.accountNumber !== undefined) {
      await this.accountNumberInput.fill(bankDetails.accountNumber)
    }
  }
}
