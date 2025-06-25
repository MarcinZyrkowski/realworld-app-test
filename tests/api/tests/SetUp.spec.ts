import test, { APIResponse } from '@playwright/test'
import { GraphqlClient } from '../src/client/GraphqlClient'
import { UserGenerator } from '../src/generator/UserGenerator'
import { SignInUpAssertion } from '../src/assertion/rest/SignInUpAssertion'
import { Allure } from '../../Allure'
import { ApiCache } from '../src/cache/ApiCache'
import { BankAccountGenerator } from '../src/generator/BankAccountGenerator'
import { CreateBankAccountAssertion } from '../src/assertion/graphql/CreateBankAccountAssertion'
import { ModelMapper } from '../src/mapper/ModelMapper'
import { RestClient } from '../src/client/RestClient'

test('setup new user @API', async ({ page, request }) => {
  const restClient = new RestClient(request)
  const graphqlClient = new GraphqlClient(request)
  const allure = new Allure(page)
  let signInUpAssertion: SignInUpAssertion
  let createBankAccountAssertion: CreateBankAccountAssertion
  let response: APIResponse

  await allure.suite('setup')

  const signUpRequest = UserGenerator.generateRandomUser()
  await allure.step('sign up', async () => {
    await allure.attachRequest(signUpRequest)
    ApiCache.cacheUserData(signUpRequest)
    response = await restClient.signUp(signUpRequest)
  })

  signInUpAssertion = new SignInUpAssertion(response!)
  await allure.step('verify sign up response', async () => {
    await allure.attachResponse(response!)
    signInUpAssertion.statusIsCreated()
    const body = await signInUpAssertion.extractBody()
    ApiCache.cacheUserId(body.user.id)
    await allure.attachResponseBody(body)
    signInUpAssertion.verifyResponse(body, signUpRequest)
  })

  await allure.step('sign in', async () => {
    const signInRequest = ModelMapper.mapSignUpToSignInRequest(signUpRequest)
    await allure.attachRequest(signInRequest)
    response = await restClient.signIn(signInRequest)
  })

  signInUpAssertion = new SignInUpAssertion(response!)
  await allure.step('verify sign in response', async () => {
    await allure.attachResponse(response!)
    signInUpAssertion.statusIsOk()
    ApiCache.cacheCookie(response!.headers()['set-cookie'])
    const body = await signInUpAssertion.extractBody()
    await allure.attachResponseBody(body)
    signInUpAssertion.verifyResponse(body, signUpRequest)
  })

  let bankAccount
  await allure.step('create bank account', async () => {
    bankAccount = BankAccountGenerator.generateRandomBankDetails(ApiCache.retrieveUserId())
    await allure.attachRequest(bankAccount)
    response = await graphqlClient.createBankAccount(ApiCache.retrieveCookie(), bankAccount)
  })

  createBankAccountAssertion = new CreateBankAccountAssertion(response!)
  await allure.step('verify created bank account', async () => {
    await allure.attachResponse(response!)
    createBankAccountAssertion.statusIsOk()
    const body = await createBankAccountAssertion.extractBody()
    await allure.attachResponseBody(body)
    createBankAccountAssertion.verifyResponse(body, bankAccount!)
  })
})
