import { expect, test } from "@playwright/test";
import { addFirstProductToCart } from "../../helpers/cart";

test("cart navigates to checkout", async ({ page }) => {
  await addFirstProductToCart(page);

  await page.locator('[data-testid="checkout-btn"]').click();

  await expect(page).toHaveURL(/\/checkout/);
  await expect(page.locator('[data-testid="form"]')).toBeVisible();
});
