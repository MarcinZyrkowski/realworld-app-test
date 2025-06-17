import { APIResponse, expect } from '@playwright/test'
import { SignUpRequestDto, SignInUpResponseDto } from '../Types/ModelTypes'

export class SignInUpResponseAssertion {
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

  async extractBody(): Promise<SignInUpResponseDto> {
    return await this.response.json()
  }

  verifyResponse(response: SignInUpResponseDto, signUpRequestDto: SignUpRequestDto) {
    expect(response.user).toMatchObject({
      firstName: signUpRequestDto.firstName,
      lastName: signUpRequestDto.lastName,
      username: signUpRequestDto.username,
    })
  }
}
