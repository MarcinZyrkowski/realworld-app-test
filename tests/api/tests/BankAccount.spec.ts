import test, { APIResponse } from '@playwright/test'
import { Allure } from '../../Allure'
import { Client } from '../src/client/Client'
import { ApiCache } from '../src/cache/ApiCache'
import { ListBankAccountAssertion } from '../src/assertion/ListBankAccountAssertion'

test.describe('register tests @API', () => {
  let client: Client
  let cookie: string
  let allure: Allure
  let listBankAccountAssertion: ListBankAccountAssertion
  let response: APIResponse

  test.beforeEach(async ({ page, request }) => {
    client = new Client(request)
    cookie = ApiCache.retrieveCookie()
    allure = new Allure(page)
  })

  test('fetch users bank accounts', async () => {
    await allure.suite('bank account')

    await allure.step('fetch users bank accounts', async () => {
      response = await client.fetchBankAccounts(cookie)
    })

    listBankAccountAssertion = new ListBankAccountAssertion(response)
    await allure.step('verify fetch users bank accounts', async () => {
      await allure.attachResponse(response)
      listBankAccountAssertion.statusIsOk()
      const body = await listBankAccountAssertion.extractBody()
      await allure.attachResponseBody(body)
      listBankAccountAssertion.assertListBankAccountIsNotEmpty(body)
      listBankAccountAssertion.assertAllBankAccountsBelogngToUser(body, ApiCache.retrieveUserId())
    })
  })
})
