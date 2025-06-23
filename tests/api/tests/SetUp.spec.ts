import test, { APIResponse } from '@playwright/test'
import { Client } from '../src/client/Client'
import { UserGenerator } from '../src/generator/UserGenerator'
import { SignInUpAssertion } from '../src/assertion/SignInUpAssertion'
import { Allure } from '../../Allure'
import { ApiCache } from '../src/cache/ApiCache'
import { BankAccountGenerator } from '../src/generator/BankAccountGenerator'
import { CreateBankAccountAssertion } from '../src/assertion/CreateBankAccountAssertion'

test('setup new user @API', async ({ page, request }) => {
  const client = new Client(request)
  const allure = new Allure(page)
  let signInUpAssertion: SignInUpAssertion
  let createBankAccountAssertion: CreateBankAccountAssertion
  let response: APIResponse

  await allure.suite('setup')

  const signUpRequest = UserGenerator.generateRandomUser()
  await allure.step('sign up', async () => {
    await allure.attachRequest(signUpRequest)
    ApiCache.cacheUserData(signUpRequest)
    response = await client.signUp(signUpRequest)
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
    const signInRequest = UserGenerator.of(signUpRequest)
    await allure.attachRequest(signInRequest)
    response = await client.signIn(signInRequest)
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
    response = await client.createBankAccount(ApiCache.retrieveCookie(), bankAccount)
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
