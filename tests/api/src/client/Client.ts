import { APIRequestContext } from '@playwright/test'
import { SignInRequestDto, SignUpRequestDto } from '../Types/ModelTypes'

export class Client {
  readonly baseUrl: string
  readonly request: APIRequestContext

  constructor(request: APIRequestContext) {
    this.baseUrl = 'http://localhost:3002'
    this.request = request
  }

  async signIn(login: SignInRequestDto) {
    return await this.request.post(this.baseUrl + '/login', {
      data: login,
    })
  }

  async signUp(signUp: SignUpRequestDto) {
    return await this.request.post(this.baseUrl + '/users', {
      data: signUp,
    })
  }
}
