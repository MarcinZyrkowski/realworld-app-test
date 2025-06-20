export const CREATE_BANK_ACCOUNT = `
  mutation CreateBankAccount(
  $bankName: String!,
  $accountNumber: String!,
  $routingNumber: String!)
  {
    createBankAccount(
      bankName: $bankName
      accountNumber: $accountNumber
      routingNumber: $routingNumber
    ) {
      id
      uuid
      userId
      bankName
      accountNumber
      routingNumber
      isDeleted
      createdAt
    }
  }
`

export const LIST_BANK_ACCOUNT = `
  query ListBankAccount {
    listBankAccount {
      id
      uuid
      userId
      bankName
      accountNumber
      routingNumber
      isDeleted
      createdAt
      modifiedAt
    }
  }
`

export const DELETE_BANK_ACCOUNT = `
  mutation DeleteBankAccount($id: ID!) {
    deleteBankAccount(id: $id)
  }
`
