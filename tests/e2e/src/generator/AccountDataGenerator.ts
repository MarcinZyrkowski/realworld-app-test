import { faker } from '@faker-js/faker'
import { MyAccountData } from '../types/page/MyAccountTypes'

type MyAccountDataFileds = Partial<keyof MyAccountData>

export class AccountDataGenerator {
  static generateAccountData(fields: MyAccountDataFileds[]): MyAccountData {
    const data: MyAccountData = {}

    if (fields.includes('firstName')) {
      data.firstName = faker.person.firstName()
    }

    if (fields.includes('lastName')) {
      data.lastName = faker.person.lastName()
    }

    if (fields.includes('email')) {
      data.email = faker.internet.email()
    }

    if (fields.includes('phone')) {
      // .substring(1) => remove the leading '+' sign
      data.phone = faker.phone.number({ style: 'international' }).substring(1)
    }
    return data
  }

  static generateEmailAndPhoneAccountData() {
    const mandatory: MyAccountDataFileds[] = ['email', 'phone']
    return AccountDataGenerator.generateAccountData(mandatory)
  }
}
