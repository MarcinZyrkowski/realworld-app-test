import { BankDetails } from "../types/page/HomePageTypes";


export class HomePageGenerator {
  static generateRandomBankDetails(): BankDetails {
    return {
      bankName: `Bank ${Math.random().toString(36).substring(2, 15)}`,
      routingNumber: Math.floor(Math.random() * 1_000_000_000).toString(),
      accountNumber: Math.floor(Math.random() * 1_000_000_000).toString(),
    };
  }
}
