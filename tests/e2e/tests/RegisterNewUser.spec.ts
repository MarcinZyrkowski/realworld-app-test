import { expect, test } from "@playwright/test";
import { SignInPage } from "../page/SignInPage";
import { SignUpPage } from "../page/SignUpPage";

test.describe("register new user", () => {
  let signInPage: SignInPage;
  let signUpPage: SignUpPage;

  test.beforeEach(async ({ page }) => {
    signInPage = new SignInPage(page);
    signUpPage = new SignUpPage(page);
  });

  test("register new user", async ({ page }) => {
    await signInPage.open();
    await expect(page).toHaveURL(SignInPage.url);

    // bug: Bugs.SIGN_UP_BUTTON
    await signInPage.signUpButton.click();
    await signInPage.signUpButton.click();
    await expect(page).toHaveURL(SignUpPage.url);

    // TODO: generate random user data
    await signUpPage.fillForm({
      firstName: "John",
      lastName: "Doe",
      userName: "johndoe",
      password: "password123",
      confirmPassword: "password123",
    });

    await signUpPage.signUpButton.click();
    await expect(page).toHaveURL(SignInPage.url);
  });
});
