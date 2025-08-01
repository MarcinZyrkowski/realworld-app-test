import { faker } from '@faker-js/faker'
import { SignUpRequest } from '../types/rest/request/RestUserRequest'

export class UserGenerator {
  static generateRandomUser(): SignUpRequest {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      username: faker.internet.username(),
      password: 'password123',
      confirmPassword: 'password123',
    }
  }
}
