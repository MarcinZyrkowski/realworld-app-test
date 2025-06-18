import * as fs from 'fs'
import * as path from 'path'

export class ApiCache {
  private static cookiePath = '../../../../playwright/api/cookie'
  private static userIdPath = '../../../../playwright/api/id'
  private static cookieFile = 'cookie.txt'
  private static userIdFile = 'userId.txt'

  private static cache(object: string, dir: string, file: string, stringify: boolean) {
    const userDir = path.resolve(__dirname, dir)
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true })
    }
    let objToSave
    if (stringify) {
      objToSave = JSON.stringify(object, null, 2)
    } else {
      objToSave = object
    }
    fs.writeFileSync(path.join(userDir, file), objToSave)
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
    this.cache(cookie, ApiCache.cookiePath, ApiCache.cookieFile, false)
  }

  static retrieveCookie(): string {
    const cookieString = this.retrieveCache(ApiCache.cookiePath, ApiCache.cookieFile, false)
    return cookieString.split(';')[0].trim()
  }

  static cacheUserId(id: string): void {
    this.cache(id, ApiCache.userIdPath, ApiCache.userIdFile, false)
  }

  static retrieveUserId(): string {
    return this.retrieveCache(ApiCache.userIdPath, ApiCache.userIdFile, false)
  }
}
