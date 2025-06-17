import { faker } from '@faker-js/faker'
import { SignInRequestDto, SignUpRequestDto } from '../Types/ModelTypes'

export class UserGenerator {
  static generateRandomUser(): SignUpRequestDto {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      username: faker.internet.username(),
      password: 'password123',
      confirmPassword: 'password123',
    }
  }

  static of(signUpRequestDto: SignUpRequestDto): SignInRequestDto {
    return {
      type: 'LOGIN',
      username: signUpRequestDto.username,
      password: signUpRequestDto.password,
    }
  }
}
