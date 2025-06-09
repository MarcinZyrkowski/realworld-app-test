import { TypeMapper } from '../mapper/TypeMapper'
import { SignInData } from '../types/page/SignInTypes'
import { SignUpData } from '../types/page/SignUpTypes'
import * as fs from 'fs'
import * as path from 'path'

export class LoginCache {
  private static userPath = '../../../../playwright/user'
  private static signUpDataFile = 'signUpData.json'

  static cacheSignUpData(signUpData: SignUpData): void {
    const userDir = path.resolve(__dirname, LoginCache.userPath)
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true })
    }
    fs.writeFileSync(
      path.join(userDir, LoginCache.signUpDataFile),
      JSON.stringify(signUpData, null, 2),
    )
  }

  static retrieveSignInData(): SignInData {
    const userDir = path.resolve(__dirname, LoginCache.userPath)
    const filePath = path.join(userDir, LoginCache.signUpDataFile)
    if (!fs.existsSync(filePath)) {
      throw new Error('SignUp data is not cached')
    }
    const signUpDataRaw = fs.readFileSync(filePath, 'utf-8')
    const signUpData: SignUpData = JSON.parse(signUpDataRaw)
    return TypeMapper.mapSignUpDataToSignInData(signUpData)
  }
}
