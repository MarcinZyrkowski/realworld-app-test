import test, { expect } from "@playwright/test";
import { LoginCache } from "../src/cache/LoginCache";
import { HomePage } from "../src/page/HomePage";
import { SignInPage } from "../src/page/SignInPage";
import { SignInAssertion } from "../src/assertion/SignInAssertion";

test.describe("Login Tests", () => {
  let signInPage: SignInPage;
  let signInAssertion: SignInAssertion;

  test.beforeEach(async ({ page }) => {
    signInPage = new SignInPage(page);
    signInAssertion = new SignInAssertion(signInPage);
  });

  test("login with existing user", async ({ page }) => {
    await signInPage.open();
    await expect(page).toHaveURL(SignInPage.url);

    const signInData = LoginCache.retrieveSignInData();
    await signInPage.fillForm(signInData);
    await signInPage.signInButton.click();

    await expect(page).toHaveURL(HomePage.url);
  });

  test("verify sign in form", async ({ page }) => {
    await signInPage.open();
    await expect(page).toHaveURL(SignInPage.url);

    await signInAssertion.assertSignInFormVisible();
  });
});
