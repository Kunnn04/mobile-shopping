import { expect, test } from "@playwright/test";

test("login shows validation errors when email and password are empty", async ({
  page,
}) => {
  await page.goto("/login");
  await page.click('button[type="submit"]');

  await expect(page.locator('[data-testid="email-error"]')).toBeVisible();
  await expect(page.locator('[data-testid="password-error"]')).toBeVisible();
});
