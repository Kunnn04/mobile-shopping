import { expect, test } from "@playwright/test";
import { loginAsUser } from "../../helpers/auth";

test("searching resets pagination to page 1", async ({ page }) => {
  await loginAsUser(page);

  const nextBtn = page.locator('[data-testid="pagination-next"]');
  if (!(await nextBtn.isDisabled())) {
    await nextBtn.click();
    await expect(page.locator('[data-testid="current-page-display"]')).toHaveText(
      "2",
    );

    await page.fill('[data-testid="search-input"]', "samsung");
    await expect(page.locator('[data-testid="current-page-display"]')).toHaveText(
      "1",
    );
  }
});
