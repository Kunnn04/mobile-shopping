import { expect, type Page } from "@playwright/test";
import { loginAsUser } from "./auth";

type AddToCartMode = "add" | "buyNow";

export async function openFirstProductDetail(page: Page): Promise<string> {
  await loginAsUser(page);
  await page.waitForSelector('[data-testid^="product-item-"]');
  await page.locator('[data-testid^="product-item-"]').first().click();
  await expect(page).toHaveURL(/\/product\//);

  const productName = await page.locator('[data-testid="title"]').innerText();
  return productName.trim();
}

export async function addFirstProductToCart(
  page: Page,
  mode: AddToCartMode = "buyNow",
): Promise<string> {
  const productName = await openFirstProductDetail(page);

  if (mode === "buyNow") {
    await page.locator('[data-testid="btn-buy"]').click();
    await expect(page).toHaveURL(/\/cart/);
  } else {
    await page.locator('[data-testid="btn-add"]').click();
    await expect(page.locator('[data-testid="badge"]')).toHaveText("1");
    await page.locator('[data-testid="cart-icon-box"]').click();
    await expect(page).toHaveURL(/\/cart/);
  }

  return productName;
}

export async function openCheckoutWithFirstProduct(
  page: Page,
): Promise<string> {
  const productName = await addFirstProductToCart(page);
  await page.locator('[data-testid="checkout-btn"]').click();
  await expect(page).toHaveURL(/\/checkout/);
  return productName;
}

export async function fillCheckoutForm(page: Page): Promise<void> {
  await page.locator("#checkout-name-input").fill("Nguyen Van A");
  await page.locator("#checkout-phone-input").fill("0901234567");
  await page.locator("#checkout-address-textarea").fill("123 Test Street");
}
