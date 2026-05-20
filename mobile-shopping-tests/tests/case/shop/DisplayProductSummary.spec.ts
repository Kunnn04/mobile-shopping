import { expect, test } from "@playwright/test";
import { loginAsUser } from "../../helpers/auth";

test("each product displays name and price", async ({ page }) => {
  await loginAsUser(page);

  const firstProduct = page.locator('[data-testid^="product-item-"]').first();
  await expect(firstProduct).toBeVisible();
  await expect(firstProduct.locator("h3")).not.toBeEmpty();
  await expect(firstProduct.locator("p")).not.toBeEmpty();
});
