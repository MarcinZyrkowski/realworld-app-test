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
    const signUpData: SignUpData = this.retrieveSignUpData()
    return TypeMapper.mapSignUpDataToSignInData(signUpData)
  }

  static retrieveSignUpData(): SignUpData {
    const userDir = path.resolve(__dirname, LoginCache.userPath)
    const filePath = path.join(userDir, LoginCache.signUpDataFile)
    if (!fs.existsSync(filePath)) {
      throw new Error('SignUp data is not cached')
    }
    const signUpDataRaw = fs.readFileSync(filePath, 'utf-8')
    const signUpData: SignUpData = JSON.parse(signUpDataRaw)
    return signUpData
  }

  static retrieveDisplayName(): string {
    const signUpData: SignUpData = this.retrieveSignUpData()
    if (!signUpData.firstName || !signUpData.lastName) {
      throw new Error('SignUp data does not contain first or last name')
    }
    return signUpData.firstName + ' ' + signUpData.lastName[0].toUpperCase()
  }

  static retrieveUsername(): string {
    const signUpData: SignUpData = this.retrieveSignUpData()
    if (!signUpData.userName) {
      throw new Error('SignUp data does not contain username')
    }
    return signUpData.userName
  }
}
