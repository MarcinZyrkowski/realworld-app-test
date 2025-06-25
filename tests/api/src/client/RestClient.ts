import { APIResponse } from '@playwright/test'
import { SignUpRequest } from '../types/rest/request/RestUserRequest'
import { CommentRequest } from '../types/rest/request/RestCommentRequest'
import { SignInRequest } from '../types/rest/request/RestUserRequest'
import { Client } from './Client'

export class RestClient extends Client {
  async signIn(login: SignInRequest): Promise<APIResponse> {
    return await this.request.post(RestClient.baseUrl + '/login', {
      data: login,
    })
  }

  async signUp(signUp: SignUpRequest): Promise<APIResponse> {
    return await this.request.post(RestClient.baseUrl + '/users', {
      data: signUp,
    })
  }

  async fetchUserProfilByUsername(username: string): Promise<APIResponse> {
    return this.request.get(RestClient.baseUrl + `/users/profile/${username}`)
  }

  async fetchListOfUsers(cookie: string) {
    return this.request.get(RestClient.baseUrl + '/users', {
      headers: { Cookie: cookie },
    })
  }

  async fetchPublicTransactions(cookie: string): Promise<APIResponse> {
    return this.request.get(RestClient.baseUrl + '/transactions/public', {
      headers: { Cookie: cookie },
    })
  }

  async publishComment(
    cookie: string,
    transactionId: string,
    comment: string,
  ): Promise<APIResponse> {
    const request: CommentRequest = {
      transactionId: transactionId,
      content: comment,
    }

    return this.request.post(RestClient.baseUrl + `/comments/${transactionId}`, {
      data: request,
      headers: { Cookie: cookie },
    })
  }
}
