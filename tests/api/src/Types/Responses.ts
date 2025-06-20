export type GraphQLQuery = {
  operationName: string
  query: string
  variables?: object
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

export type ListBankAccountResponse = {
  data: {
    listBankAccount: [
      {
        id: string
        uuid: string
        userId: string
        bankName: string
        accountNumber: string
        routingNumber: string
        isDeleted: boolean
        createdAt: string
        modifiedAt: string
      },
    ]
  }
}
