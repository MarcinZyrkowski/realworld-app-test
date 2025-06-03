import { Locator, Page } from "@playwright/test";
import { SignUpData } from "../types/page/SignUpTypes";

export class SignUpPage {
  static readonly url = "/signup";
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly signUpButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = this.page.locator('input[name="firstName"]');
    this.lastNameInput = this.page.locator('input[name="lastName"]');
    this.userNameInput = this.page.locator('input[name="username"]');
    this.passwordInput = this.page.locator('input[name="password"]');
    this.confirmPasswordInput = this.page.locator(
      'input[name="confirmPassword"]'
    );
    this.signUpButton = this.page.getByRole("button", {
      exact: true,
      name: "Sign Up",
    });
  }

  async fillForm(data: SignUpData) {
    if (data.firstName) {
      await this.firstNameInput.fill(data.firstName);
    }
    if (data.lastName) {
      await this.lastNameInput.fill(data.lastName);
    }
    if (data.userName) {
      await this.userNameInput.fill(data.userName);
    }
    if (data.password) {
      await this.passwordInput.fill(data.password);
    }
    if (data.confirmPassword) {
      await this.confirmPasswordInput.fill(data.confirmPassword);
    }
  }
}
