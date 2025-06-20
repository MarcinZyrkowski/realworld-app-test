import { BankAccount } from '../Types/Model'
import { MathUtils } from '../utils/MathUtils'

export class BankAccountGenerator {
  static generateRandomBankDetails(userId: string): BankAccount {
    return {
      userId: userId,
      bankName: `Bank ${Math.random().toString(36).substring(2, 15)}`,
      routingNumber: MathUtils.generateNineDigitNumber(),
      accountNumber: MathUtils.generateNineDigitNumber(),
    }
  }
}
