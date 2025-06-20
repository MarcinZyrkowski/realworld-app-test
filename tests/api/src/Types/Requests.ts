export type SignInRequestDto = {
  type: 'LOGIN'
  username: string
  password: string
}

export type SignUpRequestDto = {
  firstName: string
  lastName: string
  username: string
  password: string
  confirmPassword: string
}
