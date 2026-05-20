import { expect, test } from "@playwright/test";

test("authenticated user stays on shop after reload", async ({ page }) => {
  await page.goto("/login");
  await page.fill('input[type="email"]', "user@gmail.com");
  await page.fill('input[type="password"]', "123");
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/\/shop/);

  await page.reload();
  await expect(page).toHaveURL(/\/shop/);
});
