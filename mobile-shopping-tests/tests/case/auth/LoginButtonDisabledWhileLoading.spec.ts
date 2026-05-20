import { expect, test } from "@playwright/test";

test("login button is disabled while login request is loading", async ({
  page,
}) => {
  await page.goto("/login");
  await page.fill('input[type="email"]', "user@gmail.com");
  await page.fill('input[type="password"]', "123");

  await Promise.all([
    page.click('button[type="submit"]'),
    expect(page.locator('button[type="submit"]')).toBeDisabled(),
  ]);
});
