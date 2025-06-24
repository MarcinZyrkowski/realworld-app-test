import { APIRequestContext, APIResponse } from '@playwright/test'
import { GraphQLQuery } from '../Types/Responses'
import { BankAccount } from '../Types/Model'
import { CommentRequest, SignUpRequest } from '../Types/Requests'
import { SignInRequest } from '../Types/Requests'
import { CREATE_BANK_ACCOUNT, DELETE_BANK_ACCOUNT, LIST_BANK_ACCOUNT } from '../graphql/GraphQL'

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

  async createBankAccount(cookie: string, bankAccount: BankAccount): Promise<APIResponse> {
    const query: GraphQLQuery = {
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
    const query: GraphQLQuery = {
      operationName: 'ListBankAccount',
      query: LIST_BANK_ACCOUNT,
    }
    return await this.request.post(Client.baseUrl + '/graphql', {
      data: query,
      headers: { Cookie: cookie },
    })
  }

  async deleteBankAccount(cookie: string, bankId: string): Promise<APIResponse> {
    const query: GraphQLQuery = {
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
