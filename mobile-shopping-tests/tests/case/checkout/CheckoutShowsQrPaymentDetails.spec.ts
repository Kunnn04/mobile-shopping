import { expect, test } from "@playwright/test";
import { openCheckoutWithFirstProduct } from "../../helpers/cart";

test("checkout shows QR payment details when QR method is selected", async ({
  page,
}) => {
  await openCheckoutWithFirstProduct(page);

  await page.locator("#checkout-qr-radio").check();

  await expect(page.locator('[data-testid="qr-container"]')).toBeVisible();
  await expect(page.locator('[data-testid="qr-image"]')).toBeVisible();
  await expect(page.locator('[data-testid="qr-alert"]')).toBeVisible();
});
