import { BankDetails } from '../types/page/CommonTypes'
import { MathUtils } from '../utils/MathUtils'

export class BankDetailsGenerator {
  static generateRandomBankDetails(): BankDetails {
    return {
      bankName: `Bank ${Math.random().toString(36).substring(2, 15)}`,
      routingNumber: MathUtils.generateNineDigitNumber(),
      accountNumber: MathUtils.generateNineDigitNumber(),
    }
  }
}
