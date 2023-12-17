import { Page } from "@playwright/test";

//@ts-check

export const login = async (page: Page) => {
  if (!process.env.LOGIN || !process.env.PASSWORD) {
    throw new Error("LOGIN and/or PASSWORD are not provided in .env file");
  }
  await page.goto("https://www.carvertical.com/auth");
  await page.locator("#email").fill(process.env.LOGIN);
  await page.locator("#password").fill(process.env.PASSWORD);
  await page.locator("form").getByText("Log In").click();
  await page.locator("#bisquit-banner-accept-all").click();
};
