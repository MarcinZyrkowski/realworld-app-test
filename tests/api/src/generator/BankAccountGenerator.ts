import { BankAccountRequest } from '../types/graphql/GraphqlRequest'
import { MathUtils } from '../utils/MathUtils'

export class BankAccountGenerator {
  static generateRandomBankDetails(userId: string): BankAccountRequest {
    return {
      userId: userId,
      bankName: `Bank ${Math.random().toString(36).substring(2, 15)}`,
      routingNumber: MathUtils.generateNineDigitNumber(),
      accountNumber: MathUtils.generateNineDigitNumber(),
    }
  }
}
