import test, { APIResponse, expect } from '@playwright/test'
import { Allure } from '../../Allure'
import { ApiCache } from '../src/cache/ApiCache'
import { ListBankAccountAssertion } from '../src/assertion/graphql/ListBankAccountAssertion'
import { BankAccountGenerator } from '../src/generator/BankAccountGenerator'
import { CreateBankAccountAssertion } from '../src/assertion/graphql/CreateBankAccountAssertion'
import { CreateBankAccountResponse } from '../src/Types/graphql/GraphqlResponse'
import { DeleteBankAccountAccountAssertion } from '../src/assertion/graphql/DeleteBankAccountAssertion'
import { GraphqlClient } from '../src/client/GraphqlClient'

test.describe('bank accounts tests @API', () => {
  let graphqlClient: GraphqlClient
  let cookie: string
  let allure: Allure
  let listBankAccountAssertion: ListBankAccountAssertion
  let createBankAccountAssertion: CreateBankAccountAssertion
  let deleteBankAccountAccountAssertion: DeleteBankAccountAccountAssertion
  let response: APIResponse

  test.beforeEach(async ({ page, request }) => {
    graphqlClient = new GraphqlClient(request)
    cookie = ApiCache.retrieveCookie()
    allure = new Allure(page)
  })

  test('fetch users bank accounts', async () => {
    await allure.suite('bank account')

    await allure.step('fetch users bank accounts', async () => {
      response = await graphqlClient.fetchBankAccounts(cookie)
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

  test('delete bank account', async () => {
    await allure.suite('bank account')

    let bankAccount
    await allure.step('create bank account', async () => {
      bankAccount = BankAccountGenerator.generateRandomBankDetails(ApiCache.retrieveUserId())
      await allure.attachRequest(bankAccount)
      response = await graphqlClient.createBankAccount(cookie, bankAccount)
    })

    createBankAccountAssertion = new CreateBankAccountAssertion(response!)
    let createdBankAccountResponse: CreateBankAccountResponse
    await allure.step('verify created bank account', async () => {
      await allure.attachResponse(response)
      createBankAccountAssertion.statusIsOk()
      const body = await createBankAccountAssertion.extractBody()
      createdBankAccountResponse = body
      await allure.attachResponseBody(body)
    })

    await allure.step('delete bank account', async () => {
      response = await graphqlClient.deleteBankAccount(
        cookie,
        createdBankAccountResponse.data.createBankAccount.id,
      )
    })

    deleteBankAccountAccountAssertion = new DeleteBankAccountAccountAssertion(response!)
    await allure.step('verify delete bank account response', async () => {
      await allure.attachResponse(response)
      deleteBankAccountAccountAssertion.statusIsOk()
      const body = await deleteBankAccountAccountAssertion.extractBody()
      await allure.attachResponseBody(body)
      expect(body.data.deleteBankAccount).toBeTruthy()
    })
  })
})
