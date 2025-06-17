import { SignUpData } from '../types/page/SignUpTypes'
import { faker } from '@faker-js/faker'

export class UserGenerator {
  static generateRandomSignUpData(): SignUpData {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      userName: faker.internet.username(),
      password: 'password123',
      confirmPassword: 'password123',
    }
  }
}
