import { APIResponse, expect } from '@playwright/test'
import { UserListResponse } from '../Types/Responses'

export class UserListAssertion {
  readonly response: APIResponse

  constructor(response: APIResponse) {
    this.response = response
  }

  statusIsOk() {
    expect(this.response.status()).toBe(200)
  }

  async extractBody(): Promise<UserListResponse> {
    return await this.response.json()
  }

  assertUserIsNotInList(response: UserListResponse, userId: string) {
    expect(response.results.find((user) => user.id === userId)).toBeFalsy()
  }
}
