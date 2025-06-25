export type Comment = {
  id: string
  uuid: string
  content: string
  userId: string
  transactionId: string
  createdAt: string
  modifiedAt: string
}

export type Transaction = {
  receiverName: string
  senderName: string
  receiverAvatar: string
  senderAvatar: string
  likes: object[]
  comments: Comment[]
  id: string
  uuid: string
  source: string
  amount: number
  description: string
  privacyLevel: string
  receiverId: string
  senderId: string
  balanceAtCompletion: number
  status: string
  requestStatus: string
  requestResolvedAt: string
  createdAt: string
  modifiedAt: string
}

export type User = {
  id: string
  uuid: string
  firstName: string
  lastName: string
  username: string
  password: string
  email: string
  phoneNumber: string
  avatar: string
  defaultPrivacyLevel: string
  balance: number
  createdAt: string
  modifiedAt: string
}

export type Bank = {
  id: string
  uuid: string
  userId: string
  bankName: string
  accountNumber: string
  routingNumber: string
  isDeleted: boolean
  createdAt: string
  modifiedAt: string
}
