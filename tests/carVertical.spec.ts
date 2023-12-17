import { expect, test } from "@playwright/test";
import { login } from "../utils/login";

// @ts-check

test("Final price validation test", async ({ page }) => {
  await login(page);
  await page
    .locator("input[name='identifier']")
    //using first() since webpage has more than 1 element with the same name
    .first()
    .fill("SALLAAA146A396339");

  await page.locator("button[type='submit']").first().click();

  const surveyVisible = await page.getByText("Checking my car").isVisible();
  if (surveyVisible) {
    await page.getByText("Checking my car").click();
    await page.locator("button[type='submit']").first().click();
  }

  await page.locator("#package-special + div").click();
  await page.getByText("Get report").click();
  await page.getByText("Switch to Lithuania").click();
  await page.getByText("Lietuvių").click();
  await page.getByText("Pridėti").click();
  await page.locator("#coupon").fill("qahomework");
  await page.getByText("Pritaikyti").click();
  await expect(page.getByTestId("Checkout-TotalAmount")).toHaveText("35.61 €");
});
