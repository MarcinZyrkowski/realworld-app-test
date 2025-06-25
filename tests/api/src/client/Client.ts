import { APIRequestContext, APIResponse } from '@playwright/test'
import { GraphqlQuery } from '../Types/graphql/GraphqlRequest'
import { BankAccountRequest } from '../Types/graphql/GraphqlRequest'
import { SignUpRequest } from '../Types/rest/request/RestUserRequest'
import { CommentRequest } from '../Types/rest/request/RestCommentRequest'
import { SignInRequest } from '../Types/rest/request/RestUserRequest'
import {
  CREATE_BANK_ACCOUNT,
  DELETE_BANK_ACCOUNT,
  LIST_BANK_ACCOUNT,
} from '../graphql/GraphqlQueryMutation'

// TODO: split to rest and grapql clients
export class Client {
  private static baseUrl = process.env.base_url_be
  private request: APIRequestContext

  constructor(request: APIRequestContext) {
    this.request = request
  }

  async signIn(login: SignInRequest): Promise<APIResponse> {
    return await this.request.post(Client.baseUrl + '/login', {
      data: login,
    })
  }

  async signUp(signUp: SignUpRequest): Promise<APIResponse> {
    return await this.request.post(Client.baseUrl + '/users', {
      data: signUp,
    })
  }

  async createBankAccount(cookie: string, bankAccount: BankAccountRequest): Promise<APIResponse> {
    const query: GraphqlQuery = {
      operationName: 'CreateBankAccount',
      query: CREATE_BANK_ACCOUNT,
      variables: bankAccount,
    }
    return await this.request.post(Client.baseUrl + '/graphql', {
      data: query,
      headers: { Cookie: cookie },
    })
  }

  async fetchBankAccounts(cookie: string): Promise<APIResponse> {
    const query: GraphqlQuery = {
      operationName: 'ListBankAccount',
      query: LIST_BANK_ACCOUNT,
    }
    return await this.request.post(Client.baseUrl + '/graphql', {
      data: query,
      headers: { Cookie: cookie },
    })
  }

  async deleteBankAccount(cookie: string, bankId: string): Promise<APIResponse> {
    const query: GraphqlQuery = {
      operationName: 'DeleteBankAccount',
      query: DELETE_BANK_ACCOUNT,
      variables: {
        id: bankId,
      },
    }
    return await this.request.post(Client.baseUrl + '/graphql', {
      data: query,
      headers: { Cookie: cookie },
    })
  }

  async fetchUserProfilByUsername(username: string): Promise<APIResponse> {
    return this.request.get(Client.baseUrl + `/users/profile/${username}`)
  }

  async fetchListOfUsers(cookie: string) {
    return this.request.get(Client.baseUrl + '/users', {
      headers: { Cookie: cookie },
    })
  }

  async fetchPublicTransactions(cookie: string): Promise<APIResponse> {
    return this.request.get(Client.baseUrl + '/transactions/public', {
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

    return this.request.post(Client.baseUrl + `/comments/${transactionId}`, {
      data: request,
      headers: { Cookie: cookie },
    })
  }
}
