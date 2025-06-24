import { User } from '../../Model'

export type UserResponse<T> = {
  user: T
}

export type SignInUpUser = Pick<
  User,
  | 'id'
  | 'uuid'
  | 'firstName'
  | 'lastName'
  | 'username'
  | 'password'
  | 'balance'
  | 'createdAt'
  | 'modifiedAt'
>
export type ProfileUser = Pick<User, 'firstName' | 'lastName'>

export type SignInUpResponse = UserResponse<SignInUpUser>
export type UserProfileResponse = UserResponse<ProfileUser>
export type UserListResponse = {
  results: User[]
}
