import { expect } from '@playwright/test'
import { BankAccountsPage } from '../page/BankAccountsPage'

export class BankAccountsAssertion {
  readonly bankAccountsPage: BankAccountsPage

  constructor(bankAccountsPage: BankAccountsPage) {
    this.bankAccountsPage = bankAccountsPage
  }

  async assertBankAccountCreation(bankName: string): Promise<void> {
    const bankList = await this.bankAccountsPage.getBankAccountsNames()
    expect(bankList).toContain(bankName)
  }
}
