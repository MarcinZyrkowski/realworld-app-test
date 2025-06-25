import { SignInRequest, SignUpRequest } from '../typess/rest/request/RestUserRequest'

export class ModelMapper {
  static mapSignUpToSignInRequest(signUpRequest: SignUpRequest): SignInRequest {
    return {
      type: 'LOGIN',
      username: signUpRequest.username,
      password: signUpRequest.password,
    }
  }
}
