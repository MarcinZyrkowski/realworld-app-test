import { APIRequestContext } from '@playwright/test'

export class Client {
  protected static baseUrl = process.env.base_url_be
  protected request: APIRequestContext

  constructor(request: APIRequestContext) {
    this.request = request
  }
}
