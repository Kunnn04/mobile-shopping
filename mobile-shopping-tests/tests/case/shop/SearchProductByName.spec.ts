import { expect, test } from "@playwright/test";
import { loginAsUser } from "../../helpers/auth";

test("search products by name", async ({ page }) => {
  await loginAsUser(page);

  await page.fill('[data-testid="search-input"]', "samsung");

  const count = await page.locator('[data-testid^="product-item-"]').count();
  expect(count).toBeGreaterThan(0);
});
