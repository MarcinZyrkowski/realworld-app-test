import { CollectionsUtils } from '../../utils/CollectionsUtils'
import { Transaction, TransactionsPageResponse } from '../Responses'

export const getRandomTransaction = (page: TransactionsPageResponse): Transaction => {
  if (page.results.length === 0) {
    throw new Error('results (transactions) array is empty')
  }
  return CollectionsUtils.randomElement(page.results)
}
