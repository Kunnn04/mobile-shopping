import { expect, test } from "@playwright/test";
import { loginAsUser } from "../../helpers/auth";

test("clicking filter button opens filter dropdown", async ({ page }) => {
  await loginAsUser(page);

  await page.click('[data-testid="filter-btn"]');
  await expect(page.locator('[data-testid="filter-dropdown"]')).toBeVisible();
});
