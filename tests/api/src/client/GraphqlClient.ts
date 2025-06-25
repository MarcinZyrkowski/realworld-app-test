import { APIResponse } from '@playwright/test'
import {
  CREATE_BANK_ACCOUNT,
  LIST_BANK_ACCOUNT,
  DELETE_BANK_ACCOUNT,
} from '../graphql/GraphqlQueryMutation'
import { BankAccountRequest, GraphqlQuery } from '../Types/graphql/GraphqlRequest'
import { Client } from './Client'

export class GraphqlClient extends Client {
  private static graphqlUrl = Client.baseUrl + '/graphql'

  async createBankAccount(cookie: string, bankAccount: BankAccountRequest): Promise<APIResponse> {
    const query: GraphqlQuery = {
      operationName: 'CreateBankAccount',
      query: CREATE_BANK_ACCOUNT,
      variables: bankAccount,
    }
    return await this.request.post(GraphqlClient.graphqlUrl, {
      data: query,
      headers: { Cookie: cookie },
    })
  }

  async fetchBankAccounts(cookie: string): Promise<APIResponse> {
    const query: GraphqlQuery = {
      operationName: 'ListBankAccount',
      query: LIST_BANK_ACCOUNT,
    }
    return await this.request.post(GraphqlClient.graphqlUrl, {
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
    return await this.request.post(GraphqlClient.graphqlUrl, {
      data: query,
      headers: { Cookie: cookie },
    })
  }
}
