import { Locator, Page } from "playwright-core";

export class SignInPage {
  static readonly url = "/signin";
  readonly page: Page;
  readonly signUpButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signUpButton = this.page.getByText("Don't have an account? Sign Up");
  }

  async open() {
    await this.page.goto(SignInPage.url);
  }
}
