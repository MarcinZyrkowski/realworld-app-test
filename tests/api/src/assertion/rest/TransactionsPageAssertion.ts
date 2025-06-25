import { APIResponse } from '@playwright/test'
import { expect } from 'allure-playwright'
import { TransactionsPageResponse } from '../../typess/rest/response/RestTransactionResponse'

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

  assertCommentIsVisible(
    response: TransactionsPageResponse,
    transactionId: string,
    expectedComment: string,
    userId: string,
  ) {
    const transaction = response.results.find((t) => t.id === transactionId)

    if (typeof transaction === 'undefined') {
      throw new Error(`didn't find transaction with id: ${transactionId}`)
    }

    const isPresent = transaction.comments
      .filter((c) => c.userId === userId)
      .find((c) => c.content === expectedComment)

    if (!isPresent) {
      console.log(transaction)

      const usersComment = transaction.comments.filter((c) => c.userId === userId)
      console.log(usersComment)
    }

    expect(isPresent).toBeTruthy()
  }
}
