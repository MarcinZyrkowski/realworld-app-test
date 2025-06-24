import { APIResponse, expect } from '@playwright/test'
import { test } from 'allure-playwright'
import { Allure } from '../../Allure'
import { TransactionsPageAssertion } from '../src/assertion/TransactionsPageAssertion'
import { ApiCache } from '../src/cache/ApiCache'
import { Client } from '../src/client/Client'
import { getRandomTransaction } from '../src/Types/utils/ModelUtils'
import { TransactionsPageResponse } from '../src/Types/rest/response/RestTransactionResponse'
import { Transaction } from '../src/Types/Model'

test.describe('comments tests @API', () => {
  let client: Client
  let allure: Allure
  let response: APIResponse
  let cookie: string
  let transactionsPageAssertion: TransactionsPageAssertion

  test.beforeEach(async ({ page, request }) => {
    client = new Client(request)
    allure = new Allure(page)
    cookie = ApiCache.retrieveCookie()
  })

  test('comment random transaction', async () => {
    await allure.suite('comments')

    await allure.step('fetch list of public transactions', async () => {
      response = await client.fetchPublicTransactions(cookie)
    })

    transactionsPageAssertion = new TransactionsPageAssertion(response)
    let body: TransactionsPageResponse
    await allure.step('show list of public transactions response', async () => {
      await allure.attachResponse(response)
      body = await transactionsPageAssertion.extractBody()
      await allure.attachResponseBody(body)
    })

    let transaction: Transaction
    await allure.step('select random transaction', async () => {
      transaction = getRandomTransaction(body!)
      await allure.attachment(transaction)
    })

    let comment: string
    await allure.step('publish comment', async () => {
      comment = ApiCache.retriveUserData().username + ' comment'
      await allure.attachRequest(comment)
      response = await client.publishComment(cookie, transaction!.id, comment)
    })

    await allure.step('verify published comment response', async () => {
      await allure.attachResponse(response)
      const body = await response.text()
      await allure.attachResponseBody(body)
      expect(body).toBe('OK')
    })

    await allure.step('fetch list of public transactions', async () => {
      response = await client.fetchPublicTransactions(cookie)
    })

    transactionsPageAssertion = new TransactionsPageAssertion(response)
    await allure.step(
      'assert published comment is visible in fetched list of public transactions',
      async () => {
        await allure.attachResponse(response)
        const body = await transactionsPageAssertion.extractBody()
        await allure.attachResponseBody(body)

        transactionsPageAssertion.assertCommentIsVisible(
          body,
          transaction.id,
          comment,
          ApiCache.retrieveUserId(),
        )
      },
    )
  })
})
