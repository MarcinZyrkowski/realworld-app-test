import { expect } from 'allure-playwright'
import { CreateBankAccountFormComponent } from '../../page/component/CreateBankAccountFormComponent'

export class CreateBankAccountComponentAssertion {
  readonly component: CreateBankAccountFormComponent

  private constructor(component: CreateBankAccountFormComponent) {
    this.component = component
  }

  static assertThat(
    component: CreateBankAccountFormComponent,
  ): CreateBankAccountComponentAssertion {
    return new CreateBankAccountComponentAssertion(component)
  }

  async assertCreateBankAccountComponentVisible(): Promise<void> {
    const form = this.component
    await expect(form.title).toBeVisible()
    await expect(form.saveButton).toBeVisible()
    await expect(form.bankNameInput).toBeVisible()
    await expect(form.routingNumberInput).toBeVisible()
    await expect(form.accountNumberInput).toBeVisible()
  }
}
