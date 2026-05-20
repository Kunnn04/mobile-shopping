import { expect, test } from "@playwright/test";
import { addFirstProductToCart } from "../../helpers/cart";

test("cart removes product and shows empty state", async ({ page }) => {
  await addFirstProductToCart(page);

  await page.locator('[data-testid^="cart-remove-"]').click();

  await expect(page.locator('[data-testid="empty-cart"]')).toBeVisible();
  await expect(page.locator('[data-testid="empty-cart-message"]')).toHaveText(
    "Your cart is currently empty",
  );
});
