import { Bank } from '../Model'

export type GraphqlQuery = {
  operationName: string
  query: string
  variables?: object
}

export type BankAccountRequest = Pick<
  Bank,
  'userId' | 'bankName' | 'accountNumber' | 'routingNumber'
>
