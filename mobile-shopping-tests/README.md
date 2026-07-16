# Automation Framework

## Overview

`mobile-shopping-tests` la automation framework dung Playwright de kiem thu e2e cho frontend application `mobile-shopping`.

## Testing Strategy

Bo test tap trung vao cac workflow nguoi dung chinh:

- Authentication.
- Shop product list, search, filter va pagination.
- Product detail.
- Cart.
- Checkout.
- Order submission.

Test chay tren browser Chromium va su dung app local tai `http://localhost:3000`.

## Framework Architecture

Kien truc framework:

- `playwright.config.js`: cau hinh Playwright.
- `tests/case`: test cases theo tung domain.
- `tests/helpers`: helper dung lai cho login, cart va setup du lieu.
- `playwright-report`: HTML report sau khi chay test.
- `test-results`: ket qua raw va trace khi test chay.

## Folder Structure

```text
mobile-shopping-tests/
  tests/
    case/
      auth/
      cart/
      checkout/
      order/
      shop/
    helpers/
  playwright.config.js
  package.json
  README.md
```

## Supported Test Types

Hien tai framework ho tro:

- E2E UI test.
- Regression test cho workflow chinh.
- Negative test cho validation login va checkout.

Chua co API test rieng.

## Environment Setup

Can cai dat:

- Node.js
- NPM
- Playwright browsers
- Frontend app dang chay tai `http://localhost:3000`

## Installation

```powershell
cd mobile-shopping-tests
npm install
npx playwright install
```

## Run Tests

Chay frontend app truoc:

```powershell
cd ..\mobile-shopping
npm start
```

Chay all tests:

```powershell
cd ..\mobile-shopping-tests
npx playwright test
```

Chay test co giao dien browser:

```powershell
npx playwright test --headed
```

## Run Specific Tags

Framework hien chua cau hinh tag rieng. Co the chay theo file hoac folder.

Chay theo file:

```powershell
npx playwright test tests/case/shop/PaginationNextMovesToSecondPage.spec.ts
```

Chay theo folder:

```powershell
npx playwright test tests/case/shop
```

## Generate Reports

Playwright HTML report duoc bat trong `playwright.config.js`.

Xem report:

```powershell
npx playwright show-report
```

Report nam tai:

```text
playwright-report/
```

## AI Workflow

Khi dung AI ho tro viet test:

- Mo ta user flow can test.
- Yeu cau tao test theo style hien co trong `tests/case`.
- Kiem tra locator va assertion truoc khi commit.
- Chay lai test lien quan sau khi sinh code.

## Codegen Workflow

Dung Playwright codegen de lay locator nhanh:

```powershell
npx playwright codegen http://localhost:3000
```

Sau khi codegen, can clean lai code de dung helper va convention cua project.

## Locator Strategy

Uu tien locator theo thu tu:

1. Role locator: `getByRole`.
2. Label/text locator khi text on dinh.
3. `data-testid` cho element kho chon bang role.
4. CSS locator chi dung khi that su can.

Tranh locator phu thuoc qua nhieu vao class name vi CSS module co the thay doi.

## data-testid Convention

Neu can them `data-testid` o frontend, dung format:

```text
page-section-action
```

Vi du:

```text
login-submit-button
shop-search-input
cart-checkout-button
```

## Test Data Management

Du lieu hien tai den tu app mock data. Test nen dung du lieu on dinh co san trong app.

Neu them test moi:

- Tranh phu thuoc vao thu tu san pham neu khong can.
- Dung helper trong `tests/helpers` cho thao tac lap lai.
- Reset trang thai test qua navigation/login flow khi can.

## Retry Strategy

Trong `playwright.config.js`, trace duoc bat voi:

```text
trace: on-first-retry
```

Retry count hien chua duoc cau hinh. Neu can CI on dinh hon, co the them `retries` rieng cho CI.

## Fixtures

Framework hien chua co custom Playwright fixtures rieng. Cac thao tac dung lai dang nam trong:

```text
tests/helpers/
```

## Multi-language Report

Framework hien chi dung Playwright HTML report mac dinh. Chua co report da ngon ngu rieng.

## CI/CD Integration

Chua co GitHub Actions cho automation test. Khi tich hop CI, pipeline nen:

1. Install dependencies cho frontend.
2. Start frontend server.
3. Install dependencies cho automation.
4. Install Playwright browsers.
5. Run `npx playwright test`.
6. Upload `playwright-report` khi fail.

## Debugging

Chay debug mode:

```powershell
npx playwright test --debug
```

Chay headed mode:

```powershell
npx playwright test --headed
```

Xem trace/report:

```powershell
npx playwright show-report
```

## Best Practices

- Moi test nen kiem tra mot hanh vi ro rang.
- Dung helper cho cac flow lap lai nhu login va add to cart.
- Uu tien assertion nguoi dung co the quan sat duoc.
- Khong phu thuoc vao timeout co dinh neu co the dung auto-wait cua Playwright.
- Giu ten file test mo ta dung expected behavior.

## Playwright Knowledge Learned

Sau khi xay dung bo automation test cho du an `mobile-shopping`, cac kien thuc Playwright da su dung bao gom:

### 1. Hieu ban chat cua E2E test

Playwright duoc dung de viet end-to-end UI test, tuc la test ung dung tu goc nhin cua nguoi dung that.

Mot test E2E khong kiem tra truc tiep function ben trong code React, ma kiem tra:

- Nguoi dung vao trang nao.
- Nguoi dung thao tac gi.
- Giao dien hoac URL phai thay doi nhu the nao.

Vi du:

```ts
await page.goto("/login");
await page.fill('input[type="email"]', "user@gmail.com");
await page.click('button[type="submit"]');
await expect(page.locator('[data-testid="password-error"]')).toBeVisible();
```

Doan tren mo ta hanh vi:

- Vao trang login.
- Nhap email.
- Khong nhap password.
- Bam submit.
- Kiem tra loi password duoc hien thi.

### 2. Cau truc mot test case

Moi test case duoc khai bao bang `test` tu package `@playwright/test`.

```ts
import { expect, test } from "@playwright/test";

test("login succeeds with valid credentials", async ({ page }) => {
  await page.goto("/login");
  await page.fill('input[type="email"]', "user@gmail.com");
  await page.fill('input[type="password"]', "123");
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL(/\/shop/);
});
```

Cau truc co ban gom 3 phan:

- Arrange: dua app ve trang thai can test, vi du vao `/login`.
- Act: thao tac nhu nguoi dung, vi du nhap email, password va bam submit.
- Assert: kiem tra ket qua, vi du URL chuyen sang `/shop`.

### 3. Su dung fixture `page`

`page` la mot browser tab do Playwright tao san cho moi test.

Trong du an nay, `page` duoc dung de:

- Dieu huong trang bang `page.goto()`.
- Nhap du lieu bang `page.fill()`.
- Click button bang `page.click()` hoac `locator.click()`.
- Tim element bang `page.locator()`.
- Reload trang bang `page.reload()`.
- Kiem tra URL bang `expect(page).toHaveURL()`.

Vi du:

```ts
await page.goto("/shop");
await page.reload();
await expect(page).toHaveURL(/\/shop/);
```

### 4. Dieu huong voi `page.goto`

`page.goto()` duoc dung de mo mot route trong ung dung.

```ts
await page.goto("/login");
await page.goto("/shop");
```

Trong `playwright.config.js`, du an da cau hinh:

```js
baseURL: "http://localhost:3000"
```

Vi vay khi viet:

```ts
await page.goto("/login");
```

Playwright se mo:

```text
http://localhost:3000/login
```

### 5. Thao tac voi form

Du an su dung `page.fill()` va `locator.fill()` de nhap du lieu vao input hoac textarea.

```ts
await page.fill('input[type="email"]', "user@gmail.com");
await page.fill('input[type="password"]', "123");
await page.locator("#checkout-name-input").fill("Nguyen Van A");
```

Kien thuc da ap dung:

- Test login thanh cong.
- Test login thieu email.
- Test login thieu password.
- Test checkout thieu thong tin.
- Test dien form checkout thanh cong.

### 6. Click va thao tac nguoi dung

Click duoc dung de mo dropdown, submit form, them gio hang, tang so luong, xoa san pham va chuyen trang.

```ts
await page.click('button[type="submit"]');
await page.locator('[data-testid="checkout-btn"]').click();
await page.locator('[data-testid^="cart-remove-"]').click();
```

Kien thuc da ap dung:

- Click submit login.
- Click filter button.
- Click san pham dau tien.
- Click nut mua ngay.
- Click nut checkout.
- Click nut xoa san pham khoi cart.

### 7. Locator va cach tim element

Locator la cach Playwright tim element tren UI.

Du an da su dung nhieu loai locator:

```ts
page.locator('[data-testid="password-error"]');
page.locator('[data-testid^="product-item-"]');
page.locator("#checkout-name-input");
page.locator('input[type="email"]');
page.getByText(productName);
```

Y nghia:

- `[data-testid="password-error"]`: tim dung element co test id nay.
- `[data-testid^="product-item-"]`: tim cac element co test id bat dau bang `product-item-`.
- `#checkout-name-input`: tim element theo id.
- `input[type="email"]`: tim input theo attribute.
- `getByText(productName)`: tim element theo noi dung text.

Kinh nghiem rut ra:

- Uu tien locator on dinh.
- Nen dung `data-testid` cho element quan trong trong test.
- Han che phu thuoc vao class CSS vi class co the thay doi khi sua giao dien.

### 8. Kiem tra ket qua bang assertion

Assertion la phan xac nhan app co hoat dong dung hay khong.

Du an da su dung cac assertion sau:

```ts
await expect(page).toHaveURL(/\/shop/);
await expect(locator).toBeVisible();
await expect(locator).not.toBeVisible();
await expect(locator).toHaveText("1");
await expect(locator).toContainText("VND");
await expect(locator).toHaveCount(0);
await expect(locator).toBeDisabled();
await expect(locator).not.toBeEmpty();
```

Y nghia:

- `toHaveURL`: kiem tra URL hien tai.
- `toBeVisible`: element phai hien thi.
- `not.toBeVisible`: element khong duoc hien thi.
- `toHaveText`: text phai dung chinh xac.
- `toContainText`: text chi can chua mot phan noi dung.
- `toHaveCount`: so luong element phai dung.
- `toBeDisabled`: button/input phai bi disabled.
- `not.toBeEmpty`: element phai co noi dung.

### 9. Kiem tra URL va redirect

Nhieu workflow trong du an can kiem tra dieu huong.

Vi du login thanh cong:

```ts
await expect(page).toHaveURL(/\/shop/);
```

Vi du user chua dang nhap bi day ve login:

```ts
await page.goto("/shop");
await expect(page).toHaveURL(/\/login/);
```

Vi du login sai khong duoc vao shop:

```ts
await expect(page).not.toHaveURL(/\/shop/);
```

Kien thuc da ap dung:

- Login thanh cong redirect sang shop.
- Chua dang nhap vao shop thi redirect ve login.
- Dat hang thanh cong redirect ve shop.
- Checkout phai giu user o trang checkout khi thieu thong tin.

### 10. Kiem tra hien thi UI

Du an su dung `toBeVisible()` de kiem tra cac thanh phan giao dien quan trong.

```ts
await expect(page.locator('[data-testid="form"]')).toBeVisible();
await expect(page.locator('[data-testid="cart-page"]')).toBeVisible();
await expect(page.locator('[data-testid="qr-container"]')).toBeVisible();
```

Kien thuc da ap dung:

- Form checkout phai hien thi.
- Cart page phai hien thi.
- QR payment details phai hien thi khi chon thanh toan QR.
- Loading overlay phai hien thi khi dang submit order.

### 11. Kiem tra danh sach va so luong element

Du an co test danh sach san pham, search va cart.

```ts
const count = await page.locator('[data-testid^="product-item-"]').count();
expect(count).toBeGreaterThan(0);
```

Va:

```ts
await expect(page.locator('[data-testid^="product-item-"]')).toHaveCount(0);
```

Kien thuc da ap dung:

- Search co ket qua thi so luong san pham phai lon hon 0.
- Search keyword khong ton tai thi khong co san pham nao.
- Product list sau khi load khong duoc rong.

### 12. Lam viec voi nhieu element

Khi co nhieu san pham, test dung `.first()` de chon san pham dau tien.

```ts
await page.locator('[data-testid^="product-item-"]').first().click();
```

Kien thuc da ap dung:

- Mo chi tiet san pham dau tien.
- Lay ten san pham dau tien.
- Them san pham dau tien vao gio hang.

### 13. Lay du lieu tu UI

Dung `innerText()` de lay text hien thi tren giao dien.

```ts
const productName = await page.locator('[data-testid="title"]').innerText();
```

Sau do dung ten san pham nay de verify trong cart:

```ts
await expect(page.getByText(productName)).toBeVisible();
```

Kien thuc da ap dung:

- Lay ten san pham tu trang detail.
- Dung du lieu do de kiem tra cart hien dung san pham vua them.

### 14. Radio button va checkbox

Du an su dung `check()` de chon radio button thanh toan QR.

```ts
await page.locator("#checkout-qr-radio").check();
```

Sau khi chon, test verify cac thong tin QR hien thi:

```ts
await expect(page.locator('[data-testid="qr-container"]')).toBeVisible();
await expect(page.locator('[data-testid="qr-image"]')).toBeVisible();
await expect(page.locator('[data-testid="qr-alert"]')).toBeVisible();
```

### 15. Xu ly trang thai disabled

Du an kiem tra button bi disabled trong cac truong hop:

```ts
await expect(page.locator('[data-testid="pagination-prev"]')).toBeDisabled();
```

Va:

```ts
await expect(page.locator('button[type="submit"]')).toBeDisabled();
```

Kien thuc da ap dung:

- Nut previous pagination phai disabled o page dau tien.
- Nut login phai disabled trong luc request dang loading.

### 16. Re nhanh theo trang thai UI

Dung `isDisabled()` de lay boolean va quyet dinh co click hay khong.

```ts
const nextBtn = page.locator('[data-testid="pagination-next"]');
if (!(await nextBtn.isDisabled())) {
  await nextBtn.click();
  await expect(page.locator('[data-testid="current-page-display"]')).toHaveText("2");
}
```

Kien thuc da ap dung:

- Chi click next pagination neu nut next dang enabled.
- Tranh test fail khi du lieu qua it va khong co page 2.

### 17. Auto-wait va explicit wait

Playwright co auto-wait, tuc la no tu cho element san sang truoc khi click, fill hoac assert.

Vi du:

```ts
await expect(page.locator('[data-testid="form"]')).toBeVisible();
```

Playwright se cho trong mot khoang thoi gian mac dinh de form hien ra.

Du an cung co dung explicit wait:

```ts
await page.waitForSelector('[data-testid^="product-item-"]');
await page.waitForTimeout(300);
```

Kinh nghiem:

- Nen uu tien auto-wait thong qua `expect`.
- Chi dung `waitForSelector` khi can cho element xuat hien truoc khi thao tac.
- Han che `waitForTimeout` vi co the lam test cham va khong on dinh.

### 18. Timeout rieng cho assertion

Mot so flow can thoi gian lau hon, vi du login hoac submit order.

```ts
await expect(page).toHaveURL(/\/shop/, { timeout: 10000 });
```

Y nghia:

- Cho toi da 10 giay de URL chuyen sang `/shop`.
- Neu qua 10 giay van khong dung thi test fail.

### 19. Bat trang thai loading nhanh voi `Promise.all`

Trang thai loading co the xuat hien rat nhanh. Du an dung `Promise.all` de click submit va kiem tra disabled gan nhu dong thoi.

```ts
await Promise.all([
  page.click('button[type="submit"]'),
  expect(page.locator('button[type="submit"]')).toBeDisabled(),
]);
```

Kien thuc da ap dung:

- Test trang thai loading cua login button.
- Hieu rang mot so UI state chi ton tai trong thoi gian ngan.

### 20. Helper de tai su dung flow

Du an tach cac flow lap lai vao `tests/helpers`.

Vi du helper login:

```ts
export async function loginAsUser(page: Page): Promise<void> {
  await page.goto("/login");
  await page.fill('input[type="email"]', "user@gmail.com");
  await page.fill('input[type="password"]', "123");
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/\/shop/, { timeout: 10000 });
}
```

Helper cart:

```ts
export async function addFirstProductToCart(page: Page): Promise<string> {
  const productName = await openFirstProductDetail(page);
  await page.locator('[data-testid="btn-buy"]').click();
  await expect(page).toHaveURL(/\/cart/);
  return productName;
}
```

Kien thuc da ap dung:

- Dung helper de tranh lap code.
- Test case chinh ngan gon hon.
- Flow dang nhap va them gio hang duoc tai su dung o nhieu test.

### 21. TypeScript type `Page`

Helper co su dung type `Page`:

```ts
import { expect, type Page } from "@playwright/test";
```

Va:

```ts
export async function loginAsUser(page: Page): Promise<void>
```

Y nghia:

- Function nhan vao mot Playwright page.
- TypeScript ho tro goi y API va bat loi khi viet sai.

### 22. Cau hinh Playwright

File `playwright.config.js` cau hinh cach test duoc chay.

```js
module.exports = defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
```

Kien thuc da ap dung:

- `testDir`: noi chua test.
- `fullyParallel`: cho phep chay test song song.
- `reporter: "html"`: tao HTML report.
- `baseURL`: rut gon URL trong test.
- `trace: "on-first-retry"`: ghi trace khi retry lan dau.
- `projects`: cau hinh browser Chromium Desktop Chrome.

### 23. Chay test bang command line

Da su dung cac lenh Playwright co ban:

```powershell
npx playwright test
```

Chay toan bo test.

```powershell
npx playwright test --headed
```

Chay test co hien browser.

```powershell
npx playwright test tests/case/shop
```

Chay test theo folder.

```powershell
npx playwright test tests/case/auth/LoginSuccess.spec.ts
```

Chay mot file test cu the.

```powershell
npx playwright show-report
```

Mo HTML report.

```powershell
npx playwright test --debug
```

Chay debug mode.

### 24. Playwright codegen

Du an co de cap codegen:

```powershell
npx playwright codegen http://localhost:3000
```

Codegen giup:

- Mo browser de thao tac truc tiep.
- Playwright tu sinh code thao tac va locator.
- Lay locator nhanh khi chua biet chon element the nao.

Sau khi dung codegen, can clean lai code de phu hop style cua project.

### 25. Cac nhom test da thuc hien

#### Authentication

Da test:

- Login thanh cong.
- Login sai email.
- Login sai password.
- Login thieu email.
- Login thieu password.
- Login thieu ca email va password.
- Button login disabled khi loading.
- User chua dang nhap bi redirect ve login.
- User da dang nhap reload van o shop.

Kien thuc Playwright ap dung:

- `goto`
- `fill`
- `click`
- `toHaveURL`
- `toBeVisible`
- `not.toBeVisible`
- `toBeDisabled`
- `reload`

#### Shop

Da test:

- Hien danh sach san pham.
- Moi san pham co ten va gia.
- Mo chi tiet san pham.
- Mo/dong filter dropdown.
- Search theo ten san pham.
- Search khong co ket qua.
- Clear search khoi phuc danh sach.
- Pagination next sang page 2.
- Previous disabled o page 1.
- Search reset pagination ve page 1.

Kien thuc Playwright ap dung:

- Locator theo `data-testid`.
- `count`
- `toHaveCount`
- `toHaveText`
- `not.toBeEmpty`
- `first`
- `isDisabled`
- `waitForTimeout`

#### Cart

Da test:

- Them san pham vao cart.
- Cart hien dung san pham vua them.
- Tang so luong san pham.
- Xoa san pham va hien empty state.
- Dieu huong tu cart sang checkout.

Kien thuc Playwright ap dung:

- Helper flow.
- Lay text san pham bang `innerText`.
- Verify san pham bang `getByText`.
- Click button theo `data-testid`.
- Kiem tra quantity bang `toHaveText`.

#### Checkout

Da test:

- Checkout hien form va order summary.
- Required fields khong duoc bo trong.
- Chon QR payment thi hien thong tin QR.

Kien thuc Playwright ap dung:

- `locator.fill`
- `locator.check`
- `toContainText`
- `toBeVisible`
- `toHaveURL`

#### Order

Da test:

- Submit order thanh cong redirect ve shop.
- Hien loading overlay khi dang submit order.

Kien thuc Playwright ap dung:

- Submit form.
- Timeout cho redirect.
- Verify loading overlay va spinner.

### 26. Tu duy viet test rut ra

Khi viet test moi, nen bat dau bang mo ta hanh vi:

```text
Khi nguoi dung lam X, he thong phai hien thi Y.
```

Sau do chuyen thanh 3 phan:

```text
Arrange: dua app ve trang thai can test.
Act: thao tac nhu nguoi dung.
Assert: kiem tra ket qua.
```

Vi du:

```text
Khi nguoi dung xoa san pham khoi gio hang, gio hang phai hien empty state.
```

Chuyen thanh test:

```ts
test("cart removes product and shows empty state", async ({ page }) => {
  await addFirstProductToCart(page);

  await page.locator('[data-testid^="cart-remove-"]').click();

  await expect(page.locator('[data-testid="empty-cart"]')).toBeVisible();
  await expect(page.locator('[data-testid="empty-cart-message"]')).toHaveText(
    "Your cart is currently empty",
  );
});
```

### 27. Ket luan kien thuc dat duoc

Sau khi test du an nay, co the nam duoc cac kien thuc Playwright co ban va can thiet de test mot web app:

- Hieu E2E test la gi va test tu goc nhin nguoi dung.
- Biet viet test case bang `test`.
- Biet dung `page` de dieu khien browser.
- Biet dung locator de tim element.
- Biet thao tac voi input, button, radio va route.
- Biet viet assertion de kiem tra UI, URL, text, so luong va trang thai disabled.
- Biet tach helper cho flow lap lai.
- Biet cau hinh Playwright bang `playwright.config.js`.
- Biet chay test, debug test, xem report va dung codegen.
- Biet ap dung test vao cac workflow thuc te: login, shop, cart, checkout va order.

## Troubleshooting

Neu test fail vi khong mo duoc page, kiem tra app dang chay:

```text
http://localhost:3000
```

Neu browser Playwright chua cai:

```powershell
npx playwright install
```

Neu report khong mo, chay lai:

```powershell
npx playwright show-report
```
