import { expect, test } from "@playwright/test";

test("login shows email validation when email is empty", async ({
  page,
}) => {
  await page.goto("/login");
  await page.fill('input[type="password"]', "123");
  await page.click('button[type="submit"]');

  await expect(page.locator('[data-testid="email-error"]')).toBeVisible();
  await expect(page.locator('[data-testid="password-error"]')).not.toBeVisible();
});
