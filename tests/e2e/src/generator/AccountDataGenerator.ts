import { faker } from '@faker-js/faker'
import { MyAccountData } from '../types/page/MyAccountTypes'
import { CollectionsUtils } from '../utils/CollectionsUtils'

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

  static generateMandatoryAndOrOptionalAccountData() {
    const mandatory: MyAccountDataFileds[] = ['email', 'phone']
    const optional: MyAccountDataFileds[] = ['firstName', 'lastName']
    const randomOptional = CollectionsUtils.randomSubArray(optional)
    const fieldsToGenerate = [...mandatory, ...randomOptional]
    return AccountDataGenerator.generateAccountData(fieldsToGenerate)
  }
}
