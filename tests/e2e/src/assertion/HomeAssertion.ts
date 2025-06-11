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
    await expect(this.homePage.accountBalanceValue).toBeVisible()
    await expect(this.homePage.accountBalanceTitle).toBeVisible()
  }

  async assertAccountBalanceValue(value: string): Promise<void> {
    await expect(this.homePage.accountBalanceValue).toHaveText(value)
  }
}
