import { APIResponse, expect } from '@playwright/test'
import { test } from 'allure-playwright'
import { Allure } from '../../Allure'
import { TransactionsPageAssertion } from '../src/assertion/rest/TransactionsPageAssertion'
import { ApiCache } from '../src/cache/ApiCache'
import { getRandomTransaction } from '../src/types/utils/ModelUtils'
import { TransactionsPageResponse } from '../src/types/rest/response/RestTransactionResponse'
import { Transaction } from '../src/types/Model'
import { RestClient } from '../src/client/RestClient'

test.describe('comments tests @API', () => {
  let restClient: RestClient
  let allure: Allure
  let response: APIResponse
  let cookie: string
  let transactionsPageAssertion: TransactionsPageAssertion

  test.beforeEach(async ({ page, request }) => {
    restClient = new RestClient(request)
    allure = new Allure(page)
    cookie = ApiCache.retrieveCookie()
  })

  test('comment random transaction', async () => {
    await allure.suite('comments')

    await allure.step('fetch list of public transactions', async () => {
      response = await restClient.fetchPublicTransactions(cookie)
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
      await allure.attachment(transaction, 'transaction')
    })

    let comment: string
    await allure.step('publish comment', async () => {
      comment = ApiCache.retriveUserData().username + ' comment'
      await allure.attachRequest(comment)
      response = await restClient.publishComment(
        cookie,
        transaction!.id,
        comment,
      )
    })

    await allure.step('verify published comment response', async () => {
      await allure.attachResponse(response)
      const body = await response.text()
      await allure.attachResponseBody(body)
      expect(body).toBe('OK')
    })

    await allure.step('fetch list of public transactions', async () => {
      response = await restClient.fetchPublicTransactions(cookie)
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
