import { User } from '../../Model'

export type SignInUser = Pick<User, 'username' | 'password'>
export type SignUpUser = Pick<User, 'firstName' | 'lastName' | 'username' | 'password'>

export type SignInRequest = SignInUser & {
  type: 'LOGIN'
}

export type SignUpRequest = SignUpUser & {
  confirmPassword: string
}
