import { expect, test } from "@playwright/test";

test("login shows password validation when password is empty", async ({
  page,
}) => {
  await page.goto("/login");
  await page.fill('input[type="email"]', "user@gmail.com");
  await page.click('button[type="submit"]');

  await expect(page.locator('[data-testid="email-error"]')).not.toBeVisible();
  await expect(page.locator('[data-testid="password-error"]')).toBeVisible();
});
