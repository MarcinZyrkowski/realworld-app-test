import { APIResponse, expect } from '@playwright/test'
import { DeletedBankAccountResponse } from '../Types/Responses'

export class DeleteBankAccountAccountAssertion {
  private response: APIResponse

  constructor(response: APIResponse) {
    this.response = response
  }

  statusIsOk() {
    expect(this.response.status()).toBe(200)
  }

  async extractBody(): Promise<DeletedBankAccountResponse> {
    return await this.response.json()
  }
}
