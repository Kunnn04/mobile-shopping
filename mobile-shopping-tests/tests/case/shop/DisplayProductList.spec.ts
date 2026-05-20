import { expect, test } from "@playwright/test";
import { loginAsUser } from "../../helpers/auth";

test("shop displays product list after load", async ({ page }) => {
  await loginAsUser(page);

  await expect(page.locator('[data-testid="product-list"]')).toBeVisible();
  await expect(page.locator('[data-testid^="product-item-"]')).not.toHaveCount(0);
});
