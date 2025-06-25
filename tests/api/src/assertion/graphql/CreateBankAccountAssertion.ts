import { APIResponse, expect } from '@playwright/test'
import { CreateBankAccountResponse } from '../../Types/graphql/GraphqlResponse'
import { BankAccountRequest } from '../../Types/graphql/GraphqlRequest'

export class CreateBankAccountAssertion {
  private response: APIResponse

  constructor(response: APIResponse) {
    this.response = response
  }

  statusIsOk() {
    expect(this.response.status()).toBe(200)
  }

  async extractBody(): Promise<CreateBankAccountResponse> {
    return await this.response.json()
  }

  verifyResponse(response: CreateBankAccountResponse, bankAccount: BankAccountRequest) {
    expect(response.data.createBankAccount).toMatchObject({
      userId: bankAccount.userId,
      bankName: bankAccount.bankName,
      accountNumber: bankAccount.accountNumber,
      routingNumber: bankAccount.routingNumber,
    })
  }
}
