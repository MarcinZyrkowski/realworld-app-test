import { APIResponse } from "@playwright/test"
import { expect } from "allure-playwright"
import { TransactionsPageResponse } from "../Types/Responses"

export class TransactionsPageAssertion {
  readonly response: APIResponse

  constructor(response: APIResponse) {
    this.response = response
  }

  statusIsOk() {
    expect(this.response.status()).toBe(200)
  }

  async extractBody(): Promise<TransactionsPageResponse> {
    return await this.response.json()
  }

  assertTransactionsListInNotEmpty(response: TransactionsPageResponse) {
    expect(response.results.length).toBeGreaterThan(0)
  }
}