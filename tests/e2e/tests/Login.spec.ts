import test, { expect } from "@playwright/test";
import { LoginCache } from "../cache/LoginCache";
import { HomePage } from "../page/HomePage";
import { SignInPage } from "../page/SignInPage";
import { SignInAssertion } from "../assertion/SignInAssertion";

test("login with existing user", async ({ page }) => {
  const signInPage = new SignInPage(page);
  const signInAssertion = new SignInAssertion(signInPage);

  await signInPage.open();
  await expect(page).toHaveURL(SignInPage.url);
  await signInAssertion.assertSignInFormVisible();

  const signInData = LoginCache.retrieveSignInData();
  await signInPage.fillForm(signInData);
  await signInPage.signInButton.click();

  await expect(page).toHaveURL(HomePage.url);
});
