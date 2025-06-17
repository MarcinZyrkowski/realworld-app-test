import test from '@playwright/test'
import { Client } from '../src/client/Client'
import { UserGenerator } from '../src/generator/UserGenerator'
import { SignInUpResponseAssertion } from '../src/assertion/SignInUpResponseAssertion'
import { Allure } from '../../Allure'

test('setup new user @API', async ({ page, request }) => {
  const client = new Client(request)
  const allure = new Allure(page)
  let signInUpResponseAssertion: SignInUpResponseAssertion

  await allure.suite('setup')

  const signUpRequestDto = UserGenerator.generateRandomUser()

  let response
  await allure.step('sign up', async () => {
    await allure.attachRequest(signUpRequestDto)
    response = await client.signUp(signUpRequestDto)
  })

  signInUpResponseAssertion = new SignInUpResponseAssertion(response!)
  await allure.step('verify sign up response', async () => {
    await allure.attachResponse(response!)
    signInUpResponseAssertion.statusIsCreated()
    const body = await signInUpResponseAssertion.extractBody()
    await allure.attachResponseBody(body)
    signInUpResponseAssertion.verifyResponse(body, signUpRequestDto)
  })

  await allure.step('sign in', async () => {
    const signInRequestDto = UserGenerator.of(signUpRequestDto)
    await allure.attachRequest(signInRequestDto)
    response = await client.signIn(signInRequestDto)
  })

  signInUpResponseAssertion = new SignInUpResponseAssertion(response!)
  await allure.step('verify sign in response', async () => {
    await allure.attachResponse(response!)
    signInUpResponseAssertion.statusIsOk()
    const body = await signInUpResponseAssertion.extractBody()
    await allure.attachResponseBody(body)
    signInUpResponseAssertion.verifyResponse(body, signUpRequestDto)

    // TODO save cookie
  })
})
