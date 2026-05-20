import { expect, test } from "@playwright/test";
import {
  fillCheckoutForm,
  openCheckoutWithFirstProduct,
} from "../../helpers/cart";

test("order shows loading overlay while submitting", async ({ page }) => {
  await openCheckoutWithFirstProduct(page);
  await fillCheckoutForm(page);

  await page.locator('[data-testid="submit-btn"]').click();

  await expect(page.locator('[data-testid="loading-overlay"]')).toBeVisible();
  await expect(page.locator('[data-testid="spinner"]')).toBeVisible();
});
