import * as fs from 'fs'
import * as path from 'path'
import { SignUpRequest } from '../types/rest/request/RestUserRequest'

export class ApiCache {
  private static cookiePath = '../../../../playwright/api/cookie'
  private static userPath = '../../../../playwright/api/user'
  private static cookieFile = 'cookie.txt'
  private static userIdFile = 'userId.txt'
  private static userDataFile = 'userData.json'

  private static cache(object: object | string, dir: string, file: string) {
    const userDir = path.resolve(__dirname, dir)
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true })
    }
    if (typeof object === 'object') {
      const objToSave = JSON.stringify(object, null, 2)
      fs.writeFileSync(path.join(userDir, file), objToSave)
    } else {
      fs.writeFileSync(path.join(userDir, file), object)
    }
  }

  private static retrieveCache(dir: string, file: string, asJson: boolean) {
    const userDir = path.resolve(__dirname, dir)
    const filePath = path.join(userDir, file)
    if (!fs.existsSync(filePath)) {
      throw new Error('cache cannot be retrieved')
    }
    const object = fs.readFileSync(filePath, 'utf-8')
    if (asJson) {
      return JSON.parse(object)
    }
    return object
  }

  static cacheCookie(cookie: string): void {
    this.cache(cookie, ApiCache.cookiePath, ApiCache.cookieFile)
  }

  static retrieveCookie(): string {
    const cookieString = this.retrieveCache(
      ApiCache.cookiePath,
      ApiCache.cookieFile,
      false,
    )
    return cookieString.split(';')[0].trim()
  }

  static cacheUserId(id: string): void {
    this.cache(id, ApiCache.userPath, ApiCache.userIdFile)
  }

  static retrieveUserId(): string {
    return this.retrieveCache(ApiCache.userPath, ApiCache.userIdFile, false)
  }

  static cacheUserData(userData: SignUpRequest): void {
    this.cache(userData, ApiCache.userPath, ApiCache.userDataFile)
  }

  static retriveUserData(): SignUpRequest {
    return this.retrieveCache(ApiCache.userPath, ApiCache.userDataFile, true)
  }
}
