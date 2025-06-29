import test, { APIResponse } from '@playwright/test'
import { Allure } from '../../Allure'
import { ApiCache } from '../src/cache/ApiCache'
import { UserProfileAssertion } from '../src/assertion/rest/UserProfileAssertion'
import { RestClient } from '../src/client/RestClient'

test.describe('user tests @API', () => {
  let restClient: RestClient
  let allure: Allure
  let userProfileAssertion: UserProfileAssertion
  let response: APIResponse

  test.beforeEach(async ({ page, request }) => {
    restClient = new RestClient(request)
    allure = new Allure(page)
  })

  test('fetch user profile by username', async () => {
    await allure.suite('user')

    const useData = ApiCache.retriveUserData()
    await allure.step('fetch user profile', async () => {
      response = await restClient.fetchUserProfilByUsername(useData.username)
    })

    userProfileAssertion = new UserProfileAssertion(response)
    await allure.step('verify fetched user profile', async () => {
      await allure.attachResponse(response)
      userProfileAssertion.statusIsOk()
      const body = await userProfileAssertion.extractBody()
      await allure.attachResponseBody(body)
      userProfileAssertion.verifyUserProfileResponse(
        body,
        useData.firstName,
        useData.lastName,
      )
    })
  })
})
