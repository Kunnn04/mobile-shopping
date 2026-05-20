import { expect, test } from "@playwright/test";
import { loginAsUser } from "../../helpers/auth";

test("clicking product opens detail page", async ({ page }) => {
  await loginAsUser(page);

  await page.locator('[data-testid^="product-item-"]').first().click();
  await expect(page).toHaveURL(/\/product\//);
});
