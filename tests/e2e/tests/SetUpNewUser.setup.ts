import { expect, test } from "@playwright/test";
import { LoginCache } from "../src/cache/LoginCache";
import { SignInPage } from "../src/page/SignInPage";
import { SignUpPage } from "../src/page/SignUpPage";
import { SignUpDataGenerator } from "../src/generator/SignUpDataGenerator";

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
