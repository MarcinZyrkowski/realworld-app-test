import { SignInPage } from "../src/page/SignInPage";
import { LoginCache } from "../src/cache/LoginCache";
import { HomeAssertion } from "../src/assertion/HomeAssertion";
import { HomePageGenerator } from "../src/generator/HomePageGenerator";
import { expect, test } from "@playwright/test";
import { HomePage } from "../src/page/HomePage";

test("setup login new user for first time", async ({ page }) => {
  const signInPage = new SignInPage(page);
  const homePage = new HomePage(page);
  const homeAssertion = new HomeAssertion(homePage);

  await signInPage.open();
  await expect(page).toHaveURL(SignInPage.url);

  const signInData = LoginCache.retrieveSignInData();
  await signInPage.fillForm(signInData);
  await signInPage.signInButton.click();
  await expect(page).toHaveURL(HomePage.url);

  await homeAssertion.assertGetStartedDialogVisible();
  await homePage.getStartedDialog.nextButton.click();

  await homeAssertion.assertCreateBankAccountDialogVisible();
  const bankDetails = HomePageGenerator.generateRandomBankDetails();
  await homePage.createBankAccountDialog.fillBankAccountForm(bankDetails);
  await homePage.createBankAccountDialog.saveButton.click();

  await homeAssertion.assertFinishedDialogVisible();
  await homePage.finishedDialog.doneButton.click();

  await homeAssertion.assertNoDialogIsVisible();
});
