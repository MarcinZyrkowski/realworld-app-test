import { expect, test } from "@playwright/test";
import { SignInPage } from "../page/SignInPage";
import { SignUpPage } from "../page/SignUpPage";

test.describe("register new user", () => {
  let signInPage: SignInPage;

  test.beforeEach(async ({ page }) => {
    signInPage = new SignInPage(page);
  });

  test("register new user", async ({ page }) => {
    await signInPage.open();
    await expect(page).toHaveURL(SignInPage.url);

    // bug: Bugs.SIGN_UP_BUTTON
    await signInPage.signUpButton.click();

    await signInPage.signUpButton.click();
    await expect(page).toHaveURL(SignUpPage.url);
  });
});
