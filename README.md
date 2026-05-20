# Mobile Shopping

## Overview

Mobile Shopping la repository gom ung dung web ban hang va bo test automation e2e. Repository hien duoc to chuc theo 2 thu muc chinh: frontend app trong `mobile-shopping` va automation framework trong `mobile-shopping-tests`.

## System Architecture

Kien truc hien tai gom:

- Frontend React app chay tren browser.
- Redux store quan ly state cho auth, product, cart va order.
- Redux Observable xu ly side effects thong qua epics.
- Mock/local service layer trong `src/services` va `src/mocks`.
- Playwright e2e tests kiem thu cac workflow nguoi dung tren app.

## Tech Stack

- React 19
- TypeScript
- Create React App / react-scripts
- React Router
- Redux Toolkit
- Redux Observable
- RxJS
- Sass modules
- i18next / react-i18next
- Playwright
- Vercel

## Repository Structure

```text
Mobile_Shopping_Chuan/
  mobile-shopping/
    public/
    src/
    package.json
    README.md
  mobile-shopping-tests/
    tests/
    playwright.config.js
    package.json
    README.md
  README.md
```

## Applications

- `mobile-shopping`: frontend application cho shop, cart, checkout, profile va login.
- `mobile-shopping-tests`: automation framework chay Playwright test cho frontend application.

## Getting Started

Clone repository, cai dependencies rieng cho tung thu muc va chay app truoc khi chay automation test.

## Environment Setup

Can cai dat:

- Node.js
- NPM
- Git
- Playwright browsers, neu chua duoc cai dat

## Installation

Frontend:

```powershell
cd mobile-shopping
npm install
```

Automation:

```powershell
cd mobile-shopping-tests
npm install
npx playwright install
```

## Run All Services

Terminal 1:

```powershell
cd mobile-shopping
npm start
```

Terminal 2:

```powershell
cd mobile-shopping-tests
npx playwright test
```

App mac dinh chay tai:

```text
http://localhost:3000
```

## Project Workflows

Workflow phat trien co ban:

1. Cap nhat code trong `mobile-shopping`.
2. Chay app local bang `npm start`.
3. Chay e2e test trong `mobile-shopping-tests`.
4. Build frontend bang `npm run build`.
5. Commit va push len GitHub.
6. Vercel tu dong deploy frontend.

## CI/CD Pipeline

Hien tai deployment dung Vercel. Vi frontend nam trong thu muc con, Vercel can cau hinh:

```text
Root Directory: mobile-shopping
Framework Preset: Create React App
Build Command: npm run build
Output Directory: build
Install Command: npm install
```

GitHub Actions chua duoc cau hinh trong repository nay.

## Development Rules

- Khong commit `node_modules`, `build`, `test-results`, hoac `playwright-report`.
- Moi thay doi UI quan trong nen co Playwright test tuong ung.
- Giu code theo cau truc module hien co: `auth`, `product`, `cart`, `order`.
- Khong sua dong thoi frontend va automation theo cach lam hong test hien co.
- Chay build hoac test phu hop truoc khi push.

## Branch Strategy

Branch hien tai:

- `main`: branch chinh de deploy.

De phat trien tinh nang moi, nen tao branch rieng:

```text
feature/<feature-name>
fix/<bug-name>
test/<test-scope>
```

## Documentation

- Root documentation: `README.md`
- Frontend documentation: `mobile-shopping/README.md`
- Automation documentation: `mobile-shopping-tests/README.md`

## Reports

Playwright tao HTML report tai:

```text
mobile-shopping-tests/playwright-report/
```

Mo report:

```powershell
cd mobile-shopping-tests
npx playwright show-report
```

## Troubleshooting

Neu Vercel deploy fail, kiem tra `Root Directory` da la `mobile-shopping` chua.

Neu `npm` bi chan tren PowerShell, co the dung:

```powershell
npm.cmd run build
```

Neu Playwright test fail do khong truy cap duoc app, kiem tra app dang chay tai `http://localhost:3000`.

## Contributors

- Kunnn04
