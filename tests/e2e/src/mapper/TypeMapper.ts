import { SignInData } from '../types/page/SignInTypes'
import { SignUpData } from '../types/page/SignUpTypes'

export class TypeMapper {
  static mapSignUpDataToSignInData(signUpData: SignUpData): SignInData {
    return {
      username: signUpData.userName,
      password: signUpData.password,
    }
  }
}
