import { BankDetails } from "../types/page/HomePageTypes";

export class HomePageGenerator {
  static generateRandomBankDetails(): BankDetails {
    return {
      bankName: `Bank ${Math.random().toString(36).substring(2, 15)}`,
      routingNumber: HomePageGenerator.generateNineDigitNumber(),
      accountNumber: HomePageGenerator.generateNineDigitNumber(),
    };
  }

  // TODO: move to mathutils or similar
  private static generateNineDigitNumber(): string {
    return Math.floor(Math.random() * 1_000_000_000)
      .toString()
      .padStart(9, "0");
  }
}
