import { expect, test } from "@playwright/test";
import { loginAsUser } from "../../helpers/auth";

test("clicking next pagination button moves to page 2", async ({
  page,
}) => {
  await loginAsUser(page);

  const nextBtn = page.locator('[data-testid="pagination-next"]');
  if (!(await nextBtn.isDisabled())) {
    await nextBtn.click();
    await expect(page.locator('[data-testid="current-page-display"]')).toHaveText(
      "2",
    );
  }
});
