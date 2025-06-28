import { APIResponse, expect } from '@playwright/test'
import { ListBankAccountResponse } from '../../types/graphql/GraphqlResponse'

export class ListBankAccountAssertion {
  private response: APIResponse

  constructor(response: APIResponse) {
    this.response = response
  }

  statusIsOk() {
    expect(this.response.status()).toBe(200)
  }

  async extractBody(): Promise<ListBankAccountResponse> {
    return this.response.json()
  }

  assertListBankAccountIsNotEmpty(response: ListBankAccountResponse): void {
    expect(response.data.listBankAccount.length).toBeGreaterThan(0)
  }

  assertAllBankAccountsBelogngToUser(
    response: ListBankAccountResponse,
    userId: string,
  ) {
    expect(
      response.data.listBankAccount.every((bank) => bank.userId === userId),
    ).toBe(true)
  }
}
