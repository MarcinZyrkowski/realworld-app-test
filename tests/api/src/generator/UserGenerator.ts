import { faker } from '@faker-js/faker'
import { SignUpRequest } from '../Types/Requests'
import { SignInRequest } from '../Types/Requests'

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

  static of(signUpRequest: SignUpRequest): SignInRequest {
    return {
      type: 'LOGIN',
      username: signUpRequest.username,
      password: signUpRequest.password,
    }
  }
}
