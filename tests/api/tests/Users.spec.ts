import { APIResponse } from '@playwright/test'
import { test } from 'allure-playwright'
import { Allure } from '../../Allure'
import { ApiCache } from '../src/cache/ApiCache'
import { UserListAssertion } from '../src/assertion/rest/UserListAssertion'
import { UserListResponse } from '../src/typess/rest/response/RestUserResponse'
import { RestClient } from '../src/client/RestClient'

test.describe('users tests @API', () => {
  let restClient: RestClient
  let allure: Allure
  let response: APIResponse
  let cookie: string
  let userListAssertion: UserListAssertion

  test.beforeEach(async ({ page, request }) => {
    restClient = new RestClient(request)
    allure = new Allure(page)
    cookie = ApiCache.retrieveCookie()
  })

  test('fetch list of users', async () => {
    await allure.suite('users')

    await allure.step('fetch list of all users', async () => {
      response = await restClient.fetchListOfUsers(cookie)
    })

    userListAssertion = new UserListAssertion(response)
    let body: UserListResponse
    await allure.step('verify fetched list of all users', async () => {
      await allure.attachResponse(response)
      userListAssertion.statusIsOk()
      body = await userListAssertion.extractBody()
      await allure.attachResponseBody(body)
    })

    // fetched list returns list of users except for logged in user
    await allure.step('assert user is not in fetched list', async () => {
      userListAssertion.assertUserIsNotInList(body, ApiCache.retrieveUserId())
    })
  })
})
