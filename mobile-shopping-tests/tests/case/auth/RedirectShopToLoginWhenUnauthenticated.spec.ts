import { expect, test } from "@playwright/test";

test("unauthenticated user is redirected from shop to login", async ({
  page,
}) => {
  await page.goto("/shop");

  await expect(page).toHaveURL(/\/login/);
});
