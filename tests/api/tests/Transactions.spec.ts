import { APIResponse } from '@playwright/test'
import { test } from 'allure-playwright'
import { Allure } from '../../Allure'
import { ApiCache } from '../src/cache/ApiCache'
import { Client } from '../src/client/Client'
import { TransactionsPageAssertion } from '../src/assertion/TransactionsPageAssertion'

test.describe('transactions tests @API', () => {
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

  test('fetch list of public transactions', async () => {
    await allure.suite('transactions')

    await allure.step('fetch list of public transactions', async () => {
      response = await client.fetchPublicTransactions(cookie)
    })

    transactionsPageAssertion = new TransactionsPageAssertion(response)
    await allure.step('verify list of public transactions response', async () => {
      await allure.attachResponse(response)
      transactionsPageAssertion.statusIsOk()
      const body = await transactionsPageAssertion.extractBody()
      await allure.attachResponseBody(body)
      transactionsPageAssertion.assertTransactionsListInNotEmpty(body)
    })
  })
})
