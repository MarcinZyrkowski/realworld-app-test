import { expect, test } from "@playwright/test";
import { SignInPage } from "../page/SignInPage";
import { SignUpPage } from "../page/SignUpPage";
import { SignUpDataGenerator } from "../generator/SignUpDataGenerator";
import { SignInDataGenerator } from "../generator/SignInDataGenerator";
import { HomePage } from "../page/HomePage";

test.describe("register and login new user", () => {
  let signInPage: SignInPage;
  let signUpPage: SignUpPage;

  test.beforeEach(async ({ page }) => {
    signInPage = new SignInPage(page);
    signUpPage = new SignUpPage(page);
  });

  test("register and login new user", async ({ page }) => {
    await signInPage.open();
    await expect(page).toHaveURL(SignInPage.url);

    // bug: Bugs.SIGN_UP_BUTTON
    await signInPage.signUpButton.click();
    await signInPage.signUpButton.click();
    await expect(page).toHaveURL(SignUpPage.url);

    const signUpData = SignUpDataGenerator.generateRandomSignUpData();
    await signUpPage.fillForm(signUpData);

    await signUpPage.signUpButton.click();
    await expect(page).toHaveURL(SignInPage.url);

    const signInData = SignInDataGenerator.of(signUpData);
    await signInPage.fillForm(signInData);
    await signInPage.signInButton.click();

    await expect(page).toHaveURL(HomePage.url);
  });
});
