import { Bank } from '../Model'

export type GraphqlResponse<T> = {
  data: T
}

export type DeletedBankAccountResponse = GraphqlResponse<{ deleteBankAccount: boolean }>
export type ListBankAccountResponse = GraphqlResponse<{ listBankAccount: Bank[] }>
export type CreateBankAccountResponse = GraphqlResponse<{ createBankAccount: Bank }>
