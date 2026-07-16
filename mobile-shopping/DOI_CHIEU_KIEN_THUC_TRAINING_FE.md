# ĐỐI CHIẾU KIẾN THỨC TRAINING FRONTEND VỚI DỰ ÁN MOBILE SHOPPING

**Phạm vi:** `mobile-shopping`  
**Mục tiêu:** Xác định nội dung trong danh sách training đã được áp dụng, chưa áp dụng, và những kiến thức dự án có sử dụng nhưng danh sách còn thiếu.

## 1. Quy ước đánh giá

- ✅ **Đã áp dụng:** Thể hiện rõ trong source code.
- 🟡 **Áp dụng một phần:** Có liên quan nhưng chưa đầy đủ hoặc chỉ đang mô phỏng.
- ❌ **Chưa áp dụng:** Không có trong dự án.
- ➖ **Không thể hiện qua source:** Có thể đã dùng trong quá trình làm việc nhưng source code không chứng minh được.

## 2. Đối chiếu danh sách training ban đầu

| STT | Kiến thức | Trạng thái | Dự án đang áp dụng như thế nào? |
|---:|---|:---:|---|
| 1 | Git | ➖ | Workspace là Git repository, nhưng branch, commit, merge, rebase và workflow không thể hiện trong source code. |
| 2 | SSH | ❌ | Không có SSH key, Git remote SSH, kết nối server hoặc deploy qua SSH. |
| 3 | JavaScript basic syntax & construct | ✅ | Biến, hàm, object, array, điều kiện, event handler, module import/export được dùng xuyên suốt. |
| 4 | Hoisting, prototype, closure, scope | 🟡 | Scope và closure được dùng nhiều; hoisting/prototype không được minh họa rõ. |
| 5 | DOM manipulation | 🟡 | Chủ yếu dùng React Virtual DOM; có `document.addEventListener`, `window.scrollTo` và ref. |
| 6 | AJAX | 🟡 | Có Service và luồng bất đồng bộ, nhưng hiện dùng mock Observable, chưa gọi API HTTP thật. |
| 7 | HTML | ✅ | JSX/TSX tạo form, input, label, button, image, list và cấu trúc trang. |
| 8 | CSS | ✅ | Dùng CSS, SCSS, CSS Modules, responsive layout, skeleton và loading animation. |
| 9 | Server-Side Rendering/Client-Side Rendering | 🟡 | Dự án dùng CSR; chưa dùng SSR. |
| 10 | Single Page Application | ✅ | React Router chuyển trang phía client mà không reload toàn bộ website. |
| 11 | Local Storage, Session, Cookie | 🟡 | Có `localStorage`; chưa có `sessionStorage`, server session hay cookie authentication. |
| 12 | HTTP/HTTPS | 🟡 | Chưa có request API thật; có tải tài nguyên HTTPS như hình VietQR. |
| 13 | RESTful API | 🟡 | Service layer được thiết kế để thay bằng REST API nhưng hiện chỉ dùng mock. |
| 14 | Reactive Programming/Two-way binding | ✅/🟡 | Reactive Programming được áp dụng mạnh bằng RxJS. React dùng controlled input và data flow một chiều, không có two-way binding tự động. |
| 15 | Vue Lifecycle | ❌ | Dự án không dùng Vue; lifecycle được xử lý bằng React Hooks. |
| 16 | Router | ✅ | Dùng React Router với route parameter, redirect, protected route và deep link. |
| 17 | Vue basic concepts | ❌ | Không dùng Vue; có các khái niệm tương đương trong React: state, props, event và component. |
| 18 | Vue/Vuex Lifecycle | ❌ | Không dùng Vue/Vuex; dự án dùng React lifecycle, Redux Toolkit và Redux-Observable. |

> **Lưu ý:** Danh sách ban đầu ghi `ReactJS` nhưng các chi tiết phía dưới lại là Vue.js. Nếu training theo dự án này, cần thay Vue Lifecycle, Vue concepts và Vuex bằng React Hooks, React Router, Redux Toolkit, Redux-Observable và RxJS.

## 3. Phân tích chi tiết các nội dung trong danh sách

### 3.1. Git

Dự án đang nằm trong Git repository và có thể sử dụng:

```powershell
git status
git diff
git add
git commit
git branch
```

Tuy nhiên source code không chứng minh người học đã nắm:

- Branching.
- Merge và conflict.
- Rebase.
- Cherry-pick.
- Stash.
- Reset và revert.
- Pull request.
- Git workflow.

Git vẫn cần được training riêng.

### 3.2. SSH

Dự án không có:

- SSH key.
- SSH config.
- Git remote SSH.
- Deploy qua SSH.
- SCP/SFTP.
- Kết nối máy chủ Linux.

SSH chưa được áp dụng trong source hiện tại.

### 3.3. JavaScript cơ bản

Dự án sử dụng:

#### Biến và hằng

```ts
const totalAmount = useSelector(selectCartTotal);
let mockCart = [...MOCK_CART_ITEMS];
```

#### Function và arrow function

```ts
const handleSubmit = (event) => {
  // Xử lý submit
};
```

#### Object và spread

```ts
const updatedUser = {
  ...user,
  ...changes,
};
```

#### Array methods

```ts
products.filter(...);
items.map(...);
items.find(...);
items.reduce(...);
```

#### Module

```ts
import { fetchProducts } from "./product.slice";
export const productService = {};
```

### 3.4. JavaScript nâng cao

#### Scope

Biến trong Component, function và module có phạm vi khác nhau. Ví dụ `mockCart` là state trong phạm vi module Service.

#### Closure

Selector nhận tham số là một ví dụ closure:

```ts
export const selectProductById =
  (id: string) =>
  (state: RootState) =>
    state.product.products.find((product) => product.id === id);
```

Hàm bên trong vẫn ghi nhớ `id` của hàm bên ngoài.

#### Hoisting và prototype

Dự án không được thiết kế để minh họa hoisting hoặc custom prototype. Code chủ yếu dùng functional programming, plain object và interface TypeScript.

### 3.5. DOM manipulation

React không khuyến khích sửa DOM thủ công. Dự án thay state và để React cập nhật DOM:

```tsx
const [showDropdown, setShowDropdown] = useState(false);

{showDropdown && <div>...</div>}
```

Dự án vẫn dùng một số Browser/DOM API:

```ts
document.addEventListener("mousedown", handleClickOutside);
window.scrollTo(...);
```

và React ref:

```ts
const dropdownRef = useRef<HTMLDivElement>(null);
```

### 3.6. AJAX và REST API

Kiến trúc hiện có:

```text
Component
→ Action
→ Epic
→ Service
→ Success/Failure
```

Service có giao diện gần với lớp gọi API:

```ts
productService.getProducts();
productService.getProductDetail(id);
authService.login(credentials);
cartService.addToCart(item);
orderService.placeOrder(payload);
```

Tuy nhiên Service hiện dùng:

```ts
of(data).pipe(delay(500));
```

Chưa có:

```ts
fetch(...);
axios.get(...);
ajax.getJSON(...);
XMLHttpRequest;
```

Do đó dự án đã có tư duy Service/API layer, request lifecycle và success/failure flow, nhưng chưa có HTTP request, status code, header, CORS, timeout hoặc retry thật.

### 3.7. HTML

Dự án dùng JSX/TSX, nhưng kết quả render vẫn là HTML DOM:

```tsx
<form onSubmit={handleSubmit}>
  <label htmlFor="email">Email</label>
  <input id="email" type="email" />
  <button type="submit">Login</button>
</form>
```

Đã áp dụng:

- Form, input, button, label.
- Image, heading và list.
- `required` và `disabled`.
- Email, telephone, radio và textarea input.

Cần học thêm semantic HTML, ARIA, accessibility, keyboard navigation và SEO markup.

### 3.8. CSS và SCSS

Dự án áp dụng:

- CSS cơ bản.
- SCSS.
- CSS Modules.
- Dynamic class.
- Layout và responsive.
- Loading skeleton/spinner.
- Style theo Component.

```ts
import styles from "./Shop.module.scss";
const cx = classNames.bind(styles);
```

```tsx
className={cx("button", { disabled: loading })}
```

### 3.9. CSR và SSR

Dự án hiện dùng Client-Side Rendering:

```text
Browser tải JavaScript
→ React khởi tạo
→ React render giao diện
→ React Router điều hướng
```

Chưa có Next.js, Server Component, HTML render theo request hay hydration từ HTML do server tạo.

| CSR | SSR |
|---|---|
| UI render chủ yếu trên browser | HTML được render từ server |
| Phù hợp SPA | Thường thuận lợi hơn cho SEO/first content |
| Dự án hiện tại đang dùng | Chưa áp dụng |

### 3.10. Single Page Application

Dự án là SPA vì:

- Có một `index.html` chính.
- React Router thay Component theo URL.
- Chuyển trang nội bộ không reload toàn bộ website.
- Redux state được giữ khi navigation nội bộ.

Đã áp dụng client-side routing, route parameter, protected route, redirect, deep link và layout dùng chung. Chưa có trang 404 rõ ràng.

### 3.11. Local Storage, Session và Cookie

`localStorage` được dùng để lưu User và language. Auth storage được tách thành Service, có:

- `JSON.parse`.
- `try/catch`.
- Runtime validation.
- Xóa dữ liệu hỏng.

Chưa có:

- `sessionStorage`.
- `document.cookie`.
- HttpOnly/Secure/SameSite cookie.
- Server session.

### 3.12. Reactive Programming

Dự án áp dụng khá rõ:

- Observable.
- Stream.
- `ofType`.
- `map`.
- `catchError`.
- `switchMap`.
- `concatMap`.
- Epic middleware.
- Dependency injection.

Luồng tư duy:

```text
Action xuất hiện trong action stream
→ Epic lọc action
→ chuyển sang Service Observable
→ Observable phát response
→ response được chuyển thành action mới
```

### 3.13. Two-way binding

React không có two-way binding tự động. Dự án dùng controlled input:

```tsx
<input
  value={email}
  onChange={(event) => setEmail(event.target.value)}
/>
```

Luồng thực tế:

```text
State → value của input
Input event → setState
setState → render
State mới → value mới
```

Bản chất vẫn là one-way data flow của React.

### 3.14. Router

Dự án đã sử dụng:

- `BrowserRouter`.
- `Routes` và `Route`.
- `useNavigate`.
- `useLocation`.
- `useParams`.
- `Navigate`.
- Dynamic route `/product/:id`.
- Protected route.
- Redirect sau login.
- Deep link.

Chưa có route-level lazy loading, `Outlet` nested route, error route, 404 fallback, search params hoặc navigation blocking.

### 3.15. Vue Lifecycle và Vuex

Dự án không dùng Vue. Các khái niệm tương đương là:

| Vue | React trong dự án |
|---|---|
| `data` | `useState` |
| `computed` | Selector hoặc giá trị tính trong render |
| `props` | React props |
| `methods` | Function/event handler |
| `mounted` | `useEffect(..., [])` |
| `watch` | `useEffect` có dependency |
| `beforeUnmount` | Cleanup function của `useEffect` |
| Vue Router | React Router |
| Vuex | Redux Toolkit |
| Vue Component | React Function Component |
| Scoped CSS | CSS Modules |

## 4. Kiến thức dự án đã áp dụng nhưng danh sách training còn thiếu

### 4.1. TypeScript

Dự án dùng TypeScript xuyên suốt:

- Interface và type.
- Union type.
- Literal type.
- Generic.
- `Partial<T>`.
- Optional property.
- Type guard.
- `unknown` và `any`.
- Type inference.
- Typed Redux state, action và dispatch.
- Typed React event.
- Typed route parameter.
- `tsconfig.json`.

TypeScript nên là một phần training riêng, không nên gộp hoàn toàn vào JavaScript.

### 4.2. React Hooks

Dự án sử dụng:

- `useState`.
- `useEffect`.
- `useRef`.
- `useSelector`.
- `useDispatch`.
- `useNavigate`.
- `useLocation`.
- `useParams`.
- `useTranslation`.

Cần training React lifecycle qua Hooks thay vì Vue Lifecycle.

### 4.3. Redux Toolkit

Dự án áp dụng:

- Store.
- Root reducer.
- `configureStore`.
- `combineReducers`.
- `createSlice`.
- `PayloadAction`.
- Initial state.
- Trigger/success/failure action.
- Immer và immutable update.
- Typed `RootState`.
- Typed `AppDispatch`.
- Redux DevTools.

Đây là một trong các kiến thức trung tâm của dự án nhưng chưa có trong danh sách ban đầu.

### 4.4. Redux-Observable

Đã áp dụng:

- Epic middleware.
- Root Epic.
- Feature Epic.
- Action stream.
- State stream.
- Dependency injection.
- Epic typing.
- Success/failure action output.

### 4.5. RxJS

Dự án sử dụng:

- Observable.
- `of`.
- `throwError`.
- `pipe`.
- `delay`.
- `map`.
- `catchError`.
- `switchMap`.
- `concatMap`.
- Error stream.
- Cancellation.
- Concurrency semantics.

Danh sách chỉ ghi Reactive Programming là chưa đủ để hiểu source code hiện tại.

### 4.6. Kiến trúc frontend nhiều lớp

Dự án chia thành:

```text
Presentation/UI layer
State/Action layer
Side-effect layer
Service/Data-access layer
Selector/Data-access layer
```

Các nguyên tắc đang áp dụng:

- Separation of concerns.
- Single responsibility.
- One-way data flow.
- Pure reducer.
- Dependency injection.
- Feature-based organization.
- Single source of truth.

### 4.7. State management

Cần phân biệt:

- Local Component state.
- Global Redux state.
- Derived state.
- Server-like state.
- Persistent state.
- Loading/error/status state.
- Form state.

### 4.8. Bất đồng bộ và concurrency

Dự án có:

- Request lifecycle.
- Trigger/success/failure.
- Cancellation.
- Queue.
- Latest-wins.
- Sequential processing.
- Stale response.
- Race condition.
- Error recovery.

Ví dụ:

- Fetch Product Detail dùng `switchMap`.
- Cart mutation dùng `concatMap`.

### 4.9. Dependency Injection

Service được truyền vào Epic qua middleware:

```ts
createEpicMiddleware({
  dependencies: epicDependencies,
});
```

Kiến thức liên quan:

- Loose coupling.
- Testability.
- Dependency inversion.
- Fake/mocked dependency.

### 4.10. Testing

Dự án đã có:

- Jest.
- Reducer unit test.
- Regression test.
- Arrange–Act–Assert.

Package còn có Testing Library và Playwright, nhưng chưa được khai thác đầy đủ. Nên training thêm:

- Selector test.
- Service test.
- Epic/marble test.
- Component test.
- Integration test.
- E2E test.

### 4.11. Runtime validation

TypeScript không kiểm tra dữ liệu khi chương trình đang chạy. Dự án áp dụng runtime validation cho User trong Local Storage:

```text
JSON string
→ parse thành unknown
→ type guard kiểm tra
→ sử dụng hoặc loại bỏ
```

### 4.12. Authentication và authorization phía frontend

Đã có ở mức mô phỏng:

- Login.
- Logout.
- Auth state.
- Protected route.
- Redirect về trang ban đầu.
- Lưu User.
- Xử lý logout failure.

Chưa có:

- JWT thật.
- Refresh token.
- Token expiration.
- HTTP 401 handling.
- Role/permission.
- Cookie bảo mật.

### 4.13. Internationalization

Dự án dùng:

- `i18next`.
- `react-i18next`.
- Translation key.
- Locale JSON.
- Thay đổi ngôn ngữ runtime.
- Fallback language.

### 4.14. CSS Modules và SCSS

Ngoài CSS cơ bản, dự án còn dùng:

- Sass/SCSS.
- CSS Modules.
- Scoped class name.
- `classnames/bind`.
- Shared styles.
- Component-specific styles.

### 4.15. Form handling và validation

Dự án áp dụng:

- Controlled input.
- Form submit.
- Required validation.
- Custom error state.
- Disabled state khi loading.
- Radio input.
- Textarea.
- Typed event.

Chưa dùng React Hook Form hoặc schema validation library.

### 4.16. Client-side security và data integrity

Dự án đã chạm tới:

- Không tin `totalAmount` do Component gửi.
- Storage validation.
- Session consistency.
- Protected route.

Cần học thêm:

- XSS.
- CSRF.
- Token storage.
- Input validation.
- Không tin dữ liệu client.
- Backend authorization.

### 4.17. Build và package management

Dự án sử dụng:

- npm.
- `package.json`.
- `package-lock.json`.
- Dependencies/devDependencies.
- npm scripts.
- Create React App.
- TypeScript build.
- Production build.
- Browserslist.
- Development/production environment.

### 4.18. Debugging

Các công cụ và kỹ năng liên quan:

- Redux DevTools.
- React DevTools.
- Browser Console.
- Application/Local Storage.
- Network panel.
- Action/state diff.
- TypeScript compiler.
- Jest output.
- `git diff --check`.

## 5. Chương trình training đề xuất cho dự án

### Phần 1 – Nền tảng web

1. Git cơ bản.
2. HTML và semantic HTML.
3. CSS, Flexbox, Grid và responsive.
4. SCSS và CSS Modules.
5. JavaScript cơ bản.
6. JavaScript nâng cao: scope, closure, event loop và Promise.
7. DOM và Browser API.
8. HTTP/HTTPS, REST API và JSON.
9. LocalStorage, SessionStorage và Cookie.
10. CSR, SSR và SPA.

### Phần 2 – TypeScript

1. Kiểu cơ bản.
2. Interface và type.
3. Union và literal type.
4. Generic.
5. Utility types.
6. `unknown` và `any`.
7. Type guard.
8. Runtime validation.
9. TypeScript với React.

### Phần 3 – React

1. JSX và Function Component.
2. Props.
3. State.
4. Event.
5. Conditional/list rendering.
6. Controlled form.
7. `useState`.
8. `useEffect` và cleanup.
9. `useRef`.
10. React render lifecycle.
11. React Router.
12. Protected route và deep link.
13. Layout và Component composition.

### Phần 4 – Redux Toolkit

1. One-way data flow.
2. Store.
3. Action.
4. Reducer.
5. Slice.
6. Immer và immutability.
7. Provider.
8. `useDispatch`.
9. `useSelector`.
10. Selector và derived state.
11. Root reducer.
12. Redux DevTools.
13. Loading/error/status state.

### Phần 5 – RxJS và Redux-Observable

1. Reactive Programming.
2. Observable.
3. Subscription.
4. `pipe`.
5. `map`.
6. `catchError`.
7. `switchMap`.
8. `concatMap`.
9. `mergeMap`.
10. `exhaustMap`.
11. Cancellation và race condition.
12. Epic.
13. Root Epic.
14. Trigger/success/failure.
15. Service Observable.
16. Dependency injection.
17. Marble test.

### Phần 6 – Kiến trúc dự án

1. Feature-based structure.
2. UI layer.
3. State/action layer.
4. Side-effect layer.
5. Service/data-access layer.
6. Selector/data-access layer.
7. Separation of concerns.
8. Pure reducer.
9. Single source of truth.
10. DTO và domain model.
11. Client state và server state.
12. Error handling.

### Phần 7 – Testing và chất lượng

1. Jest.
2. Reducer test.
3. Selector test.
4. Epic test.
5. React Testing Library.
6. Integration test.
7. Playwright E2E.
8. Regression test.
9. Type checking.
10. Production build.

### Phần 8 – Nội dung bổ sung

1. Authentication.
2. Client-side security.
3. Internationalization.
4. Accessibility.
5. Performance.
6. API integration thật.
7. Environment variables.
8. Deployment.

## 6. Kết luận đánh giá

### Đã áp dụng tốt

- JavaScript và TypeScript.
- React Function Component và Hooks.
- CSR và SPA.
- React Router.
- Redux Toolkit.
- Redux-Observable và RxJS.
- Service layer.
- LocalStorage.
- CSS, SCSS và CSS Modules.
- Internationalization.
- Dependency injection.
- Unit/regression testing cơ bản.
- Kiến trúc luồng dữ liệu một chiều.

### Mới áp dụng một phần

- DOM manipulation.
- AJAX.
- HTTP/HTTPS.
- REST API.
- Authentication.
- Security.
- Testing toàn diện.

### Chưa áp dụng

- SSH.
- SSR.
- Backend thật.
- Database.
- Server session.
- Cookie authentication.
- Vue/Vuex.
- HTTP API thật.
- Epic/integration/E2E test đầy đủ.

### Khuyến nghị quan trọng

Danh sách training hiện tại cần được chỉnh lại vì phần ghi `ReactJS` nhưng chi tiết lại là Vue. Để phù hợp với dự án `mobile-shopping`, nên thay Vue Lifecycle, Vue concepts và Vuex bằng:

- React Function Component.
- React Hooks và lifecycle.
- Controlled form và one-way data flow.
- React Router.
- Redux Toolkit.
- Redux-Observable.
- RxJS.
- TypeScript.
- Testing và kiến trúc frontend nhiều lớp.
