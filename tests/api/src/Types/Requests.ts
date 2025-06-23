export type SignInRequest = {
  type: 'LOGIN'
  username: string
  password: string
}

export type SignUpRequest = {
  firstName: string
  lastName: string
  username: string
  password: string
  confirmPassword: string
}

export type CommentRequest = {
  transactionId: string
  content: string
}
