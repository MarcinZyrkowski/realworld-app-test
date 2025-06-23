import { APIResponse } from '@playwright/test'
import { test } from 'allure-playwright'
import { Allure } from '../../Allure'
import { TransactionsPageAssertion } from '../src/assertion/TransactionsPageAssertion'
import { ApiCache } from '../src/cache/ApiCache'
import { Client } from '../src/client/Client'
import { getRandomTransaction } from '../src/Types/utils/ModelUtils'
import { TransactionsPageResponse } from '../src/Types/Responses'

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

    let transaction
    await allure.step('select random transaction', async () => {
      transaction = getRandomTransaction(body!)
      await allure.attachment(transaction)
    })

    // TODO make a comment
  })
})
