import { expect, test } from "@playwright/test";
import { SignInPage } from "../page/SignInPage";
import { SignUpPage } from "../page/SignUpPage";
import { SignUpDataGenerator } from "../generator/SignUpDataGenerator";
import { LoginCache } from "../cache/LoginCache";

test("setup new user", async ({ page }) => {
  const signInPage = new SignInPage(page);
  const signUpPage = new SignUpPage(page);

  await signInPage.open();
  await expect(page).toHaveURL(SignInPage.url);

  // bug: Bugs.SIGN_UP_BUTTON
  await signInPage.signUpButton.click();
  await signInPage.signUpButton.click();
  await expect(page).toHaveURL(SignUpPage.url);

  const signUpData = SignUpDataGenerator.generateRandomSignUpData();
  LoginCache.cacheSignUpData(signUpData);
  await signUpPage.fillForm(signUpData);

  await signUpPage.signUpButton.click();
  await expect(page).toHaveURL(SignInPage.url);
});
