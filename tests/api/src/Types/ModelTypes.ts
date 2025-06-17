export type LoginRequestDto = {
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

export type SignUpResponseDto = {
  user: {
    id: string
    uuid: string
    firstName: string
    lastName: string
    username: string
    password: string
    balance: number
    createdAt: string
    modifiedAt: string
  }
}
