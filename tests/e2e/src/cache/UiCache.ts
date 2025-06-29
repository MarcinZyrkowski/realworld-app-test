import { Page } from '@playwright/test'
import { TypeMapper } from '../mapper/TypeMapper'
import { SignInData } from '../types/page/SignInTypes'
import { SignUpData } from '../types/page/SignUpTypes'
import * as fs from 'fs'
import * as path from 'path'
import * as lockfile from 'proper-lockfile'

export class UiCache {
  private static userPath = '../../../../playwright/ui/user'
  private static authPath = '../../../../playwright/ui/.auth'
  private static authFile = 'user.json'
  private static signUpDataFile = 'signUpData.json'

  static async cacheStorageState(page: Page) {
    const authDir = path.resolve(__dirname, UiCache.authPath)
    const authFile = path.join(authDir, UiCache.authFile)
    await page.context().storageState({ path: authFile })
  }

  static async cacheSignUpData(signUpData: SignUpData): Promise<void> {
    const userDir = path.resolve(__dirname, UiCache.userPath)
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true })
    }
    const release = await lockfile.lock(userDir)
    try {
      fs.writeFileSync(
        path.join(userDir, UiCache.signUpDataFile),
        JSON.stringify(signUpData, null, 2),
      )
    } finally {
      await release()
    }
  }

  static async retrieveSignUpData(): Promise<SignUpData> {
    const userDir = path.resolve(__dirname, UiCache.userPath)
    const filePath = path.join(userDir, UiCache.signUpDataFile)
    const release = await lockfile.lock(userDir)
    try {
      if (!fs.existsSync(filePath)) {
        throw new Error('SignUp data is not cached')
      }
      const signUpDataRaw = fs.readFileSync(filePath, 'utf-8')
      return JSON.parse(signUpDataRaw)
    } finally {
      await release()
    }
  }

  static async retrieveSignInData(): Promise<SignInData> {
    const signUpData = await this.retrieveSignUpData()
    return TypeMapper.mapSignUpDataToSignInData(signUpData)
  }

  static async retrieveDisplayName(): Promise<string> {
    const signUpData = await this.retrieveSignUpData()
    if (!signUpData.firstName || !signUpData.lastName) {
      throw new Error('SignUp data does not contain first or last name')
    }
    return signUpData.firstName + ' ' + signUpData.lastName[0].toUpperCase()
  }

  static async retrieveUsername(): Promise<string> {
    const signUpData = await this.retrieveSignUpData()
    if (!signUpData.userName) {
      throw new Error('SignUp data does not contain username')
    }
    return signUpData.userName
  }
}
