import { APIResponse } from '@playwright/test'
import { test } from 'allure-playwright'
import { Allure } from '../../Allure'
import { ApiCache } from '../src/cache/ApiCache'
import { TransactionsPageAssertion } from '../src/assertion/rest/TransactionsPageAssertion'
import { RestClient } from '../src/client/RestClient'

test.describe('transactions tests @API', () => {
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

  test('fetch list of public transactions', async () => {
    await allure.suite('transactions')

    await allure.step('fetch list of public transactions', async () => {
      response = await restClient.fetchPublicTransactions(cookie)
    })

    transactionsPageAssertion = new TransactionsPageAssertion(response)
    await allure.step(
      'verify list of public transactions response',
      async () => {
        await allure.attachResponse(response)
        transactionsPageAssertion.statusIsOk()
        const body = await transactionsPageAssertion.extractBody()
        await allure.attachResponseBody(body)
        transactionsPageAssertion.assertTransactionsListInNotEmpty(body)
      },
    )
  })
})
