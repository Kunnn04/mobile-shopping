import { expect, test } from "@playwright/test";
import { openCheckoutWithFirstProduct } from "../../helpers/cart";

test("checkout displays form and order summary", async ({ page }) => {
  await openCheckoutWithFirstProduct(page);

  await expect(page.locator('[data-testid="form"]')).toBeVisible();
  await expect(page.locator("#checkout-name-input")).toBeVisible();
  await expect(page.locator("#checkout-phone-input")).toBeVisible();
  await expect(page.locator("#checkout-address-textarea")).toBeVisible();
  await expect(page.locator('[data-testid="summary"]')).toContainText("VND");
});
