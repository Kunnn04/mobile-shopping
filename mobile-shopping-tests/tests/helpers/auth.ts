import { expect, type Page } from "@playwright/test";

export async function loginAsUser(page: Page): Promise<void> {
  await page.goto("/login");
  await page.fill('input[type="email"]', "user@gmail.com");
  await page.fill('input[type="password"]', "123");
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/\/shop/, { timeout: 10000 });
}
