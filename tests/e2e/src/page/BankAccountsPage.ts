import { Locator, Page } from '@playwright/test'
import { CreateBankAccountFormComponent } from './component/CreateBankAccountFormComponent'

export class BankAccountsPage {
  readonly page: Page
  readonly createBankAccountButton: Locator
  readonly bankList: Locator
  readonly createBankAccountForm: CreateBankAccountFormComponent

  constructor(page: Page) {
    this.page = page
    this.createBankAccountButton = this.page.getByRole('button', { name: 'Create' })
    this.bankList = this.page.locator('[data-test="bankaccount-list"]')
    this.createBankAccountForm = new CreateBankAccountFormComponent(page)
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

  async deleteBankAccount(bankName: string): Promise<void> {
    const bankElement = this.bankList.locator('li').filter({ hasText: bankName }).first()

    if (await bankElement.isVisible()) {
      await bankElement.locator('button', { hasText: 'Delete' }).click()
    }
  }
}
