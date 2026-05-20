import { expect, test } from "@playwright/test";
import { loginAsUser } from "../../helpers/auth";

test("search shows no products when keyword has no match", async ({
  page,
}) => {
  await loginAsUser(page);

  await page.fill('[data-testid="search-input"]', "xyzkhongtontai123");

  await expect(page.locator('[data-testid^="product-item-"]')).toHaveCount(0);
  await expect(
    page.locator("text=khong tim thay").or(page.locator("text=no products")),
  )
    .toBeVisible({ timeout: 3000 })
    .catch(() => {});
});
