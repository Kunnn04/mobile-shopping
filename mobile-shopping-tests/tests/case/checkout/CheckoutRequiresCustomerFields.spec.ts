import { expect, test } from "@playwright/test";
import { openCheckoutWithFirstProduct } from "../../helpers/cart";

test("checkout keeps user on page when required fields are empty", async ({
  page,
}) => {
  await openCheckoutWithFirstProduct(page);

  await page.locator('[data-testid="submit-btn"]').click();

  await expect(page).toHaveURL(/\/checkout/);
  await expect(page.locator('[data-testid="form"]')).toBeVisible();
});
