import { APIRequestContext, APIResponse } from '@playwright/test'
import { BankAccount, GraphQLQuery, SignInRequestDto, SignUpRequestDto } from '../Types/ModelTypes'
import { CREATE_BANK_ACCOUNT } from '../graphql/GraphQL'

export class Client {
  readonly baseUrl: string
  readonly request: APIRequestContext

  constructor(request: APIRequestContext) {
    this.baseUrl = 'http://localhost:3002'
    this.request = request
  }

  async signIn(login: SignInRequestDto): Promise<APIResponse> {
    return await this.request.post(this.baseUrl + '/login', {
      data: login,
    })
  }

  async signUp(signUp: SignUpRequestDto): Promise<APIResponse> {
    return await this.request.post(this.baseUrl + '/users', {
      data: signUp,
    })
  }

  async createBankAccount(cookie: string, bankAccount: BankAccount): Promise<APIResponse> {
    const query: GraphQLQuery = {
      operationName: 'CreateBankAccount',
      query: CREATE_BANK_ACCOUNT,
      variables: bankAccount,
    }
    return await this.request.post(this.baseUrl + '/graphql', {
      data: query,
      headers: { Cookie: cookie },
    })
  }
}
