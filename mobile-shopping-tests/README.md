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
