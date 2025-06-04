import test, { expect } from "@playwright/test";
import { SignInPage } from "../page/SignInPage";
import { SignUpPage } from "../page/SignUpPage";
import { HomePage } from "../page/HomePage";
import { LoginCache } from "../cache/LoginCache";

test.describe("login new user", () => {
  let signInPage: SignInPage;
  let signUpPage: SignUpPage;

  test.beforeEach(async ({ page }) => {
    signInPage = new SignInPage(page);
    signUpPage = new SignUpPage(page);
  });

  test("login new user for first time", async ({ page }) => {
    await signInPage.open();
    await expect(page).toHaveURL(SignInPage.url);

    const signInData = LoginCache.retrieveSignInData();
    await signInPage.fillForm(signInData);
    await signInPage.signInButton.click();

    await expect(page).toHaveURL(HomePage.url);
  });
});
