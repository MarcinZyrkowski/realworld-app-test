import { Transaction } from '../../Model'

export type TransactionsPageResponse = {
  pageData: {
    page: number
    limit: number
    hasNextPages: boolean
    totalPages: number
  }
  results: Transaction[]
}
