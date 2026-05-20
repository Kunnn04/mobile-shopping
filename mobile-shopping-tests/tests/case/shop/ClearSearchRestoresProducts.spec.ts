import { expect, test } from "@playwright/test";
import { loginAsUser } from "../../helpers/auth";

test("clearing search restores full product list", async ({ page }) => {
  await loginAsUser(page);

  await page.waitForSelector('[data-testid^="product-item-"]');
  const initialCount = await page.locator('[data-testid^="product-item-"]').count();

  await page.fill('[data-testid="search-input"]', "samsung");
  await page.fill('[data-testid="search-input"]', "");
  await page.waitForTimeout(300);

  const afterCount = await page.locator('[data-testid^="product-item-"]').count();
  expect(afterCount).toBe(initialCount);
});
