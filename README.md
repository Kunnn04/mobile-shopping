# Mobile Shopping

Repository nay gom 2 phan:

- `mobile-shopping`: ung dung web React/TypeScript cho mobile shopping.
- `mobile-shopping-tests`: bo test e2e bang Playwright.

## Cau truc thu muc

```text
Mobile_Shopping_Chuan/
  mobile-shopping/
    public/
    src/
    package.json
  mobile-shopping-tests/
    tests/
    playwright.config.js
    package.json
```

## Chay ung dung

```powershell
cd mobile-shopping
npm install
npm start
```

Ung dung chay mac dinh tai:

```text
http://localhost:3000
```

## Build ung dung

```powershell
cd mobile-shopping
npm run build
```

Thu muc output sau khi build:

```text
mobile-shopping/build
```

## Chay test e2e

Mo terminal 1 de chay app:

```powershell
cd mobile-shopping
npm start
```

Mo terminal 2 de chay Playwright test:

```powershell
cd mobile-shopping-tests
npm install
npx playwright test
```

Xem report test:

```powershell
npx playwright show-report
```

## Deploy Vercel

Vi app React nam trong thu muc con, khi cau hinh Vercel can dat:

```text
Root Directory: mobile-shopping
Framework Preset: Create React App
Build Command: npm run build
Output Directory: build
Install Command: npm install
```

Neu deploy tu root repository ma khong set `Root Directory`, Vercel se khong tim thay `package.json` cua app.

## Ghi chu

- Khong commit `node_modules`, `build`, `test-results`, hoac `playwright-report`.
- Thu muc `mobile-shopping-tests` phu thuoc vao app dang chay o `http://localhost:3000`.
