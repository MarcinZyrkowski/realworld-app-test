import { APIRequestContext, APIResponse } from '@playwright/test'
import { GraphQLQuery } from '../Types/Responses'
import { BankAccount } from '../Types/Model'
import { SignUpRequestDto } from '../Types/Requests'
import { SignInRequestDto } from '../Types/Requests'
import { CREATE_BANK_ACCOUNT, LIST_BANK_ACCOUNT } from '../graphql/GraphQL'

export class Client {
  private static baseUrl = 'http://localhost:3002'
  private request: APIRequestContext

  constructor(request: APIRequestContext) {
    this.request = request
  }

  async signIn(login: SignInRequestDto): Promise<APIResponse> {
    return await this.request.post(Client.baseUrl + '/login', {
      data: login,
    })
  }

  async signUp(signUp: SignUpRequestDto): Promise<APIResponse> {
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
}
