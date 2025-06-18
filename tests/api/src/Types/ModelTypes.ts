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

export type SignInUpResponseDto = {
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

export type GraphQLQuery = {
  operationName: string
  query: string
  variables: object
}

export type BankAccount = {
  userId: string
  bankName: string
  accountNumber: string
  routingNumber: string
}

export type CreateBankAccountResponse = {
  data: {
    createBankAccount: {
      id: string
      uuid: string
      userId: string
      bankName: string
      accountNumber: string
      routingNumber: string
      isDeleted: boolean
      createdAt: string
    }
  }
}
