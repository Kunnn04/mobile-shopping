import { expect, test } from "@playwright/test";
import { loginAsUser } from "../../helpers/auth";

test("previous pagination button is disabled on first page", async ({
  page,
}) => {
  await loginAsUser(page);

  await expect(page.locator('[data-testid="pagination-prev"]')).toBeDisabled();
});
