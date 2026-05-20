# Frontend Application

## Overview

`mobile-shopping` la frontend application cho mobile shopping. App duoc xay bang React va TypeScript, gom cac man hinh login, shop, product detail, cart, checkout va profile.

## Features

- Dang nhap va bao ve route can authentication.
- Hien thi danh sach san pham.
- Tim kiem, loc va phan trang san pham.
- Xem chi tiet san pham.
- Them san pham vao gio hang.
- Cap nhat va xoa san pham trong gio hang.
- Checkout va hien thi thong tin thanh toan.
- Ho tro da ngon ngu qua i18next.
- Toast notification cho cac thao tac nguoi dung.

## Tech Stack

- React 19
- TypeScript
- Create React App
- React Router
- Redux Toolkit
- React Redux
- Redux Observable
- RxJS
- Sass modules
- i18next / react-i18next
- React Toastify
- Font Awesome / React Icons

## Folder Structure

```text
src/
  assets/
  i18n/
  layouts/
  mocks/
  modules/
    auth/
    cart/
    order/
    product/
  pages/
  routes/
  services/
  store/
  styles/
  App.tsx
  index.tsx
```

## Routing Structure

Routes chinh:

```text
/login
/
/shop
/product/:id
/cart
/checkout
/profile
```

Tat ca routes ngoai `/login` duoc bao ve bang `ProtectedRoute`.

## State Management

State duoc quan ly bang Redux Toolkit. Cac module state chinh:

- `auth`: thong tin dang nhap va loading.
- `product`: danh sach san pham va thao tac shop.
- `cart`: san pham trong gio hang.
- `order`: thong tin dat hang va checkout.

Store duoc cau hinh tai:

```text
src/store/store.ts
```

## Permission System

Permission system hien tai la route protection theo trang thai dang nhap:

- Chua dang nhap: redirect ve `/login`.
- Da dang nhap: cho phep truy cap shop, cart, checkout, profile va product detail.

Chua co role-based permission.

## UI Design System

UI hien tai duoc chia theo:

- Layout components trong `src/layouts`.
- Page styles bang Sass modules trong `src/pages`.
- Shared styles trong `src/styles`.
- Assets trong `src/assets`.

Chua co design system package rieng.

## API Integration

App hien tai dung service layer trong:

```text
src/services/
```

Mock data nam trong:

```text
src/mocks/
```

Neu tich hop backend that, can thay logic trong service layer bang HTTP client.

## Environment Variables

Chua co bien moi truong bat buoc. Neu can them API endpoint, nen dung prefix cua Create React App:

```text
REACT_APP_API_URL=
```

## Installation

```powershell
cd mobile-shopping
npm install
```

## Run Development

```powershell
npm start
```

App chay tai:

```text
http://localhost:3000
```

## Build Project

```powershell
npm run build
```

Output:

```text
build/
```

## Coding Convention

- Dung TypeScript cho component va module logic.
- Dat component theo PascalCase.
- Dat file style theo dang `ComponentName.module.scss`.
- Giu logic domain trong `modules` va `services`.
- Khong commit generated files nhu `build`.

## Component Convention

- Page components dat trong `src/pages`.
- Layout components dat trong `src/layouts`.
- Route guard dat trong `src/routes`.
- Component nen tach style rieng bang Sass module khi can.

## data-testid Convention

Automation test nen uu tien locator on dinh. Khi them `data-testid`, dung format de doc:

```text
page-section-action
```

Vi du:

```text
shop-search-input
cart-checkout-button
login-submit-button
```

## Testing

Unit test cua Create React App co the chay bang:

```powershell
npm test
```

E2E test nam trong `../mobile-shopping-tests` va duoc chay bang Playwright.

## Performance Optimization

- Build production bang `npm run build`.
- Giu assets anh o dung dinh dang va kich thuoc hop ly.
- Tranh render lai khong can thiet trong cac page co danh sach san pham.
- Co the dung lazy loading neu so luong route/component tang len.

## Troubleshooting

Neu app khong chay, kiem tra dependencies:

```powershell
npm install
```

Neu build fail tren PowerShell do execution policy, dung:

```powershell
npm.cmd run build
```

Neu deploy Vercel fail, kiem tra `Root Directory` trong Vercel phai la:

```text
mobile-shopping
```
