import { APIResponse, expect } from '@playwright/test'
import { SignInUpResponse } from '../../typess/rest/response/RestUserResponse'
import { SignUpRequest } from '../../typess/rest/request/RestUserRequest'

export class SignInUpAssertion {
  readonly response: APIResponse

  constructor(response: APIResponse) {
    this.response = response
  }

  statusIsCreated() {
    expect(this.response.status()).toBe(201)
  }

  statusIsOk() {
    expect(this.response.status()).toBe(200)
  }

  async extractBody(): Promise<SignInUpResponse> {
    return await this.response.json()
  }

  verifyResponse(response: SignInUpResponse, signUpRequest: SignUpRequest) {
    expect(response.user).toMatchObject({
      firstName: signUpRequest.firstName,
      lastName: signUpRequest.lastName,
      username: signUpRequest.username,
    })
  }
}
