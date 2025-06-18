import test from '@playwright/test'
import { Client } from '../src/client/Client'

test.describe('login @API', () => {
  let client: Client

  test.beforeEach(async ({ request }) => {
    client = new Client(request)
  })

  // TODO finish test
  test('login', async () => {
    const response = await client.signIn({
      type: 'LOGIN',
      username: 'qwe',
      password: '123123',
    })

    console.log(response.headers())
  })
})
