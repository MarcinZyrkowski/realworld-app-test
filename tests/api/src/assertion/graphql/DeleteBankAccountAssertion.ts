import { APIResponse, expect } from '@playwright/test'
import { DeletedBankAccountResponse } from '../../types/graphql/GraphqlResponse'

export class DeleteBankAccountAccountAssertion {
  private response: APIResponse

  constructor(response: APIResponse) {
    this.response = response
  }

  statusIsOk() {
    expect(this.response.status()).toBe(200)
  }

  async extractBody(): Promise<DeletedBankAccountResponse> {
    return this.response.json()
  }
}
