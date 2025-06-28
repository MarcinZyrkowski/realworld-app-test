import { CollectionsUtils } from '../../utils/CollectionsUtils'
import { TransactionsPageResponse } from '../rest/response/RestTransactionResponse'
import { Transaction } from '../Model'

export const getRandomTransaction = (
  page: TransactionsPageResponse,
): Transaction => {
  if (page.results.length === 0) {
    throw new Error('results (transactions) array is empty')
  }
  return CollectionsUtils.randomElement(page.results)
}
