import { SignInData } from "../types/page/SignInTypes";
import { SignUpData } from "../types/page/SignUpTypes";


export class SignInDataGenerator {
  static of(signUpData: SignUpData): SignInData {
    return {
      userName: signUpData.userName,
      password: signUpData.password,
    };
  }
}
