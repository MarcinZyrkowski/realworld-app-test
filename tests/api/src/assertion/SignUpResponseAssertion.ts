import { APIResponse, expect } from '@playwright/test'
import { SignUpRequestDto, SignUpResponseDto } from '../Types/ModelTypes'

export class SignUpResponseAssertion {
  readonly response: APIResponse

  constructor(response: APIResponse) {
    this.response = response
  }

  statusIsCreated() {
    expect(this.response.status()).toBe(201)
  }

  async extractBody(): Promise<SignUpResponseDto> {
    return await this.response.json()
  }

  verifyResponse(signUpResponseDto: SignUpResponseDto, signUpRequestDto: SignUpRequestDto) {
    expect(signUpResponseDto.user).toMatchObject({
      firstName: signUpRequestDto.firstName,
      lastName: signUpRequestDto.lastName,
      username: signUpRequestDto.username,
    })
  }
}
