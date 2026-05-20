import { expect, test } from "@playwright/test";

test("login fails with wrong email", async ({ page }) => {
  await page.goto("/login");
  await page.fill('input[type="email"]', "sai@gmail.com");
  await page.fill('input[type="password"]', "123");
  await page.click('button[type="submit"]');

  await expect(page.locator('[data-testid="auth-error"]')).toBeVisible();
});
