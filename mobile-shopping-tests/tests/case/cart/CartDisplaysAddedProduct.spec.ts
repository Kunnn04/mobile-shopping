import { expect, test } from "@playwright/test";
import { addFirstProductToCart } from "../../helpers/cart";

test("cart displays product added from product detail", async ({ page }) => {
  const productName = await addFirstProductToCart(page);

  await expect(page.locator('[data-testid="cart-page"]')).toBeVisible();
  await expect(page.locator('[data-testid="cart-list"]')).toBeVisible();
  await expect(page.getByText(productName)).toBeVisible();
  await expect(page.locator('[data-testid^="cart-quantity-"]')).toHaveText("1");
});
