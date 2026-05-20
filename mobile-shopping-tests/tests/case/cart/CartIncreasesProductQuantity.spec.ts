import { expect, test } from "@playwright/test";
import { addFirstProductToCart } from "../../helpers/cart";

test("cart increases product quantity", async ({ page }) => {
  await addFirstProductToCart(page);

  await page.locator('[data-testid^="cart-increase-"]').click();

  await expect(page.locator('[data-testid^="cart-quantity-"]')).toHaveText("2");
});
