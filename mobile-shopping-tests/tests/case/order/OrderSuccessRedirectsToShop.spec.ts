import { expect, test } from "@playwright/test";
import {
  fillCheckoutForm,
  openCheckoutWithFirstProduct,
} from "../../helpers/cart";

test("order success redirects user back to shop", async ({ page }) => {
  await openCheckoutWithFirstProduct(page);
  await fillCheckoutForm(page);

  await page.locator('[data-testid="submit-btn"]').click();

  await expect(page).toHaveURL(/\/shop/, { timeout: 10000 });
  await expect(page.locator('[data-testid="shop-page"]')).toBeVisible();
});
