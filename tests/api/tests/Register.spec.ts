import test from '@playwright/test'
import { Client } from '../src/client/Client'
import { UserGenerator } from '../src/generator/UserGenerator'
import { SignUpResponseAssertion } from '../src/assertion/SignUpResponseAssertion'
import { Allure } from '../../Allure'

test.describe('sign up @API', () => {
  let client: Client
  let allure: Allure

  test.beforeEach(async ({ page, request }) => {
    client = new Client(request)
    allure = new Allure(page)
  })

  test('sign up new user', async () => {
    await allure.suite('sign up')

    const signUpRequestDto = UserGenerator.generateRandomUser()

    let response
    await allure.step('sign up', async () => {
      await allure.request(signUpRequestDto)
      response = await client.signUp(signUpRequestDto)
    })

    const signUpResponseAssertion = new SignUpResponseAssertion(response!)
    await allure.step('verify sign up response', async () => {
      await allure.response(response!)
      signUpResponseAssertion.statusIsCreated()
      const body = await signUpResponseAssertion.extractBody()
      await allure.responseBody(body)
      signUpResponseAssertion.verifyResponse(body, signUpRequestDto)
    })
  })
})
