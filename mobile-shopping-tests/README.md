# Mobile Shopping Tests

Bo test e2e cho ung dung `mobile-shopping`, su dung Playwright.

## Yeu cau

- Node.js
- NPM
- Ung dung `mobile-shopping` dang chay tai `http://localhost:3000`

## Cai dependencies

```powershell
cd mobile-shopping-tests
npm install
```

Neu Playwright chua co browser:

```powershell
npx playwright install
```

## Chay test

Truoc tien chay app o terminal rieng:

```powershell
cd ..\mobile-shopping
npm start
```

Sau do chay test:

```powershell
cd ..\mobile-shopping-tests
npx playwright test
```

## Chay test theo file

Vi du chay test pagination:

```powershell
npx playwright test tests/case/shop/PaginationNextMovesToSecondPage.spec.ts
```

## Xem report

```powershell
npx playwright show-report
```

Report HTML duoc tao trong:

```text
playwright-report/
```

## Cau truc test

```text
tests/
  case/
    auth/
    cart/
    checkout/
    order/
    shop/
  helpers/
```

## Cau hinh

File cau hinh chinh:

```text
playwright.config.js
```

Gia tri `baseURL` hien tai:

```text
http://localhost:3000
```

Neu app chay o port khac, cap nhat `baseURL` trong `playwright.config.js` truoc khi chay test.
