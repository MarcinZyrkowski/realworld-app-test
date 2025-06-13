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
    await expect(this.component.title).toBeVisible()
    await expect(this.component.saveButton).toBeVisible()
    await expect(this.component.bankNameInput).toBeVisible()
    await expect(this.component.routingNumberInput).toBeVisible()
    await expect(this.component.accountNumberInput).toBeVisible()
  }
}
