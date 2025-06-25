import { APIResponse, expect } from '@playwright/test'
import { UserProfileResponse } from '../../typess/rest/response/RestUserResponse'

export class UserProfileAssertion {
  private response: APIResponse

  constructor(response: APIResponse) {
    this.response = response
  }

  statusIsOk() {
    expect(this.response.status()).toBe(200)
  }

  async extractBody(): Promise<UserProfileResponse> {
    return await this.response.json()
  }

  verifyUserProfileResponse(
    response: UserProfileResponse,
    expectedFirstName: string,
    expectedLastName: string,
  ): void {
    expect(response.user.firstName).toBe(expectedFirstName)
    expect(response.user.lastName).toBe(expectedLastName)
  }
}
