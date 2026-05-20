import { expect, test } from "@playwright/test";

test("login fails with wrong password", async ({ page }) => {
  await page.goto("/login");
  await page.fill('input[type="email"]', "user@gmail.com");
  await page.fill('input[type="password"]', "sai_mat_khau");
  await page.click('button[type="submit"]');

  await expect(page.locator('[data-testid="auth-error"]')).toBeVisible();
  await expect(page).not.toHaveURL(/\/shop/);
});
