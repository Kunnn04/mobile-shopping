# GIÁO TRÌNH HIỂU TOÀN BỘ DỰ ÁN MOBILE SHOPPING

Tài liệu này giải thích dự án từ tổng quát đến chi tiết, dành cho người mới biết React/JavaScript cơ bản. Nên đọc theo thứ tự; đừng cố ghi nhớ tất cả trong lần đầu.

---

## 1. Bức tranh tổng quát

### 1.1. Dự án này là gì?

`mobile-shopping` là một ứng dụng mua sắm chạy trên trình duyệt. Người dùng có thể:

- Đăng nhập và đăng xuất.
- Xem, tìm kiếm, lọc và phân trang sản phẩm.
- Mở chi tiết sản phẩm.
- Thêm, xóa và thay đổi số lượng trong giỏ hàng.
- Nhập thông tin và tạo đơn hàng.
- Xem/cập nhật hồ sơ.
- Chuyển ngôn ngữ Anh/Việt.

Ứng dụng hiện **chưa có backend thật**. Các Service dùng dữ liệu mock và `delay(500)` để mô phỏng API. Vì vậy:

- React, Redux, Epic và Service đều là code frontend.
- Không có server, database hay API HTTP thật.
- Kiến trúc được chuẩn bị để sau này thay mock bằng API thật mà UI không phải thay đổi nhiều.

### 1.2. Ba loại trạng thái cần phân biệt

1. **UI state cục bộ:** Chỉ một Component cần, ví dụ dropdown đang mở hay đóng. Dùng `useState`.
2. **Application state dùng chung:** Nhiều trang cần, ví dụ user, products, cart, order. Dùng Redux.
3. **Dữ liệu bền vững:** Còn sau khi refresh, ví dụ session user. Demo này dùng `localStorage`; hệ thống thật thường còn có backend/database.

### 1.3. Luồng dữ liệu trung tâm

Mỗi thao tác bất đồng bộ nên đi theo một chiều:

```text
Người dùng
  ↓
Component dispatch Trigger Action
  ↓
Epic bắt Action bằng ofType
  ↓
Service thực hiện I/O và trả Observable
  ↓
Epic map kết quả thành Success hoặc Failure Action
  ↓
Reducer cập nhật Redux State
  ↓
Selector lấy phần State UI cần
  ↓
Component render lại
```

Nguyên tắc quan trọng: dữ liệu đi một chiều, mỗi lớp có một trách nhiệm.

---

## 2. Kiến thức nền cần nắm

### 2.1. HTML, CSS và JavaScript

Trước React, cần hiểu:

- HTML tạo cấu trúc: `div`, `form`, `input`, `button`, `img`.
- CSS/SCSS tạo giao diện, layout, responsive, loading animation.
- JavaScript xử lý dữ liệu, sự kiện và logic.
- Array methods: `map`, `filter`, `find`, `reduce`, `slice`.
- Object/array spread: `{ ...object }`, `[...array]`.
- Destructuring: `const { id } = product`.
- Module: `import` và `export`.
- Promise/bất đồng bộ là kiến thức nền trước khi học Observable.

Ví dụ `reduce` tính tổng giỏ:

```ts
items.reduce((total, item) => total + item.price * item.quantity, 0);
```

`0` là giá trị ban đầu. Mỗi phần tử cộng `price × quantity` vào total.

### 2.2. TypeScript

TypeScript là JavaScript có hệ thống kiểu. Nó phát hiện nhiều sai sót trước khi chạy.

```ts
interface Product {
  id: string;
  name: string;
  price: number;
}
```

Kiến thức cần học:

- Kiểu cơ bản: `string`, `number`, `boolean`, `null`, `undefined`.
- Array: `Product[]`.
- Union: `string | null`.
- Literal union: `"idle" | "loading" | "succeeded" | "failed"`.
- `interface` và `type`.
- Optional property: `email?: string`.
- Generic: `PayloadAction<Product>` và `Observable<Product>`.
- `Partial<User>`: mọi field của User trở thành không bắt buộc.
- Type guard: hàm kiểm tra dữ liệu runtime và trả `value is User`.
- `unknown` an toàn hơn `any`: phải kiểm tra trước khi dùng.
- Type assertion `as`: chỉ nên dùng khi thật sự biết kiểu; nó không biến đổi object runtime.

Sai lầm quan trọng:

```ts
const detail = product as ProductDetail;
```

Dòng trên không tự sinh `description` hay `specs`; nó chỉ bảo TypeScript im lặng. Code sau sửa lưu `ProductDetail` thật trong state.

### 2.3. React

React xây UI bằng Component.

```tsx
function Shop() {
  return <div>Shop</div>;
}
```

Cần nắm:

- **JSX/TSX:** Viết cú pháp giống HTML trong TypeScript.
- **Component:** Hàm trả về UI.
- **Props:** Dữ liệu cha truyền xuống con.
- **State:** Dữ liệu thay đổi làm Component render lại.
- **Event:** `onClick`, `onChange`, `onSubmit`.
- **Conditional rendering:** `loading ? <Spinner /> : <Content />`.
- **List rendering và key:** `products.map(product => <div key={product.id} />)`.
- **Controlled input:** `value` lấy từ state và `onChange` cập nhật state.

#### `useState`

Dùng cho state cục bộ:

```ts
const [searchTerm, setSearchTerm] = useState("");
```

#### `useEffect`

Chạy side effect sau khi render:

```ts
useEffect(() => {
  dispatch(fetchProductDetail(id));
}, [dispatch, id]);
```

Dependency array nghĩa là effect chạy lại khi `dispatch` hoặc `id` thay đổi.

Cleanup effect:

```ts
useEffect(() => {
  const timer = setTimeout(...);
  return () => clearTimeout(timer);
}, []);
```

Cleanup ngăn timer/listener tiếp tục chạy sau khi Component unmount.

#### `useRef`

Giữ giá trị qua các lần render nhưng thay đổi nó không tự render lại. Profile dùng ref để nhớ thao tác Save đang chờ phản hồi.

#### Render và re-render

Component render lại khi:

- State cục bộ thay đổi.
- Props thay đổi.
- Giá trị `useSelector` thay đổi.
- Component cha render lại.

Render không có nghĩa là toàn bộ DOM bị tạo lại; React so sánh virtual tree và chỉ cập nhật phần cần thiết.

---

## 3. Cấu trúc thư mục

```text
src/
├── index.tsx                 # Điểm khởi động React, gắn Provider
├── App.tsx                   # Khai báo router và các trang
├── data.ts                  # Dữ liệu demo ban đầu
├── assets/                  # Ảnh tĩnh
├── i18n/                    # Cấu hình và từ điển Anh/Việt
├── layouts/                 # Header, Sidebar, layout chung
├── pages/                   # Các màn hình
├── routes/                  # Bảo vệ route cần đăng nhập
├── mocks/                   # Dữ liệu giả API
├── services/                # I/O/data access, trả Observable
├── modules/
│   ├── auth/                 # Slice, Epic, Selector, Test auth
│   ├── product/              # Slice, Epic, Selector, Test product
│   ├── cart/                 # Slice, Epic, Selector, Test cart
│   └── order/                # Slice, Epic, Selector order
├── store/                   # Store, root reducer, root epic
├── types/                   # Type dùng chung
└── styles/                  # Style dùng chung
```

Quy ước tên:

- `*.slice.ts`: state, action creators, reducer.
- `*.epics.ts`: side effect bất đồng bộ.
- `*.selectors.ts`: cách đọc state.
- `*.service.ts`: I/O/API/storage.
- `*.test.ts`: test tự động.
- `*.module.scss`: CSS chỉ áp dụng cho file import nó.

---

## 4. Điểm khởi động và Router

### 4.1. `index.tsx`

Luồng khởi động:

1. Trình duyệt tải `public/index.html`.
2. React tìm phần tử có `id="root"`.
3. `ReactDOM.createRoot` tạo React root.
4. `<Provider store={store}>` cung cấp Redux Store cho toàn bộ component con.
5. `<App />` render router và giao diện.

Nếu thiếu `Provider`, `useSelector` và `useDispatch` sẽ báo không tìm thấy Redux context.

### 4.2. `App.tsx` và React Router

`BrowserRouter` đồng bộ URL với Component. `Routes` chọn `Route` phù hợp.

```text
/login        → Login
/shop         → Shop
/product/:id  → ProductDetail
/cart         → Cart
/checkout     → Checkout
/profile      → Profile
```

`:id` là route parameter. `/product/1` cho `useParams()` kết quả `id = "1"`.

`useNavigate()` chuyển trang bằng code. `Navigate` là Component redirect.

### 4.3. `ProtectedRoute`

ProtectedRoute đọc:

```text
auth.isLoggedIn
auth.loading
```

- Đang loading: hiển thị Loading.
- Chưa login: redirect `/login`, lưu URL cũ trong `location.state.from`.
- Đã login: render children.

Login đọc `from` để sau khi thành công đưa người dùng về trang họ định mở ban đầu.

### 4.4. Layout

`DefaultLayout` ghép:

- `Header`: logo, ngôn ngữ, profile, logout.
- `Sidebar`: menu.
- `children`: nội dung trang hiện tại.

Layout là cách tái sử dụng khung giao diện, không lặp Header/Sidebar trong mỗi Page.

---

## 5. Redux Toolkit từ cơ bản đến dự án

### 5.1. Store là gì?

Store là object giữ application state và cung cấp:

- `getState()` đọc state.
- `dispatch(action)` gửi action.
- `subscribe(listener)` theo dõi thay đổi.

State dự án:

```text
RootState
├── auth
├── product
├── cart
└── order
```

### 5.2. Action

Action là object mô tả “điều gì đã xảy ra”:

```ts
{
  type: "product/fetchProductDetail",
  payload: "1"
}
```

- `type` xác định loại action.
- `payload` mang dữ liệu cần thiết.

Action creator là hàm tạo action. `fetchProductDetail("1")` tạo object trên.

### 5.3. Reducer

Reducer nhận state hiện tại và action, sau đó tạo state logic tiếp theo.

```text
newState = reducer(oldState, action)
```

Reducer phải thuần:

- Không gọi API.
- Không ghi localStorage.
- Không navigate.
- Không toast.
- Không timer.
- Cùng input phải cho cùng output.

Redux Toolkit dùng Immer nên có thể viết:

```ts
state.loading = true;
```

Trông giống mutation nhưng Immer tạo immutable state mới an toàn.

### 5.4. Slice

`createSlice` gom:

- Tên module.
- Initial state.
- Reducers.
- Action creators sinh tự động.

Pattern request chuẩn:

```text
trigger: loading = true, error = null
success: loading = false, data = payload, error = null
failure: loading = false, error = payload
```

### 5.5. Root reducer

`combineReducers` ghép reducer nhỏ thành một reducer gốc:

```ts
combineReducers({ auth, product, cart, order });
```

Key trong object chính là key trong RootState.

### 5.6. Selector

Selector là hàm đọc một phần state:

```ts
const selectCartItems = (state: RootState) => state.cart.items;
```

Lợi ích:

- Component không phụ thuộc sâu vào cấu trúc Store.
- Tái sử dụng logic đọc/tính toán.
- Dễ test.
- Có thể memoize bằng `createSelector`.

`selectCartTotal` là derived state: không phải input mới, mà được tính từ items.

### 5.7. `useDispatch` và `useSelector`

```ts
const dispatch = useDispatch<AppDispatch>();
dispatch(fetchProducts());
```

`useSelector(selectProducts)` subscribe phần state đó. Khi kết quả selector thay đổi, Component render lại.

### 5.8. Redux DevTools

DevTools cho xem:

- Danh sách action theo thời gian.
- Payload action.
- State sau action.
- Diff trước/sau.
- Dispatch action thủ công.

Khi xem Product Detail, chuỗi mong đợi:

```text
product/fetchProductDetail
product/fetchProductDetailSuccess
```

---

## 6. RxJS và Redux-Observable

### 6.1. Bất đồng bộ là gì?

API, timer, storage hay event không cho kết quả ngay. UI không thể đứng im chờ. Chương trình bắt đầu công việc, tiếp tục chạy, và xử lý khi kết quả đến.

### 6.2. Observable

Observable là luồng có thể phát:

- 0, 1 hoặc nhiều giá trị.
- Error.
- Complete.

Promise thường trả một kết quả; Observable có thể biểu diễn nhiều kết quả theo thời gian và có thể unsubscribe.

```ts
of(data).pipe(delay(500));
```

- `of(data)` tạo Observable phát `data`.
- `delay(500)` trì hoãn 500 ms.
- Đây là cách `mockApiCall` mô phỏng API.

### 6.3. Epic

Epic là hàm:

```text
(action$, state$, dependencies) → Observable<Action>
```

- `action$`: luồng tất cả Redux action.
- `state$`: luồng/giá trị Redux state.
- `dependencies`: Service được inject.
- Output: luồng action mới được Redux dispatch.

### 6.4. Các operator trong dự án

#### `pipe`

Nối các operator thành pipeline.

#### `ofType`

Lọc action theo type:

```ts
action$.pipe(ofType(fetchProducts.type));
```

#### `map`

Biến response thành success action:

```ts
map((response) => fetchProductsSuccess(response));
```

#### `catchError`

Bắt error của inner Observable và biến nó thành failure action:

```ts
catchError((error) => of(fetchProductsFailure(error.message)));
```

`of(...)` cần thiết vì `catchError` phải trả lại Observable, không phải action thô.

#### `switchMap`

Khi action mới đến, unsubscribe inner Observable cũ và chỉ giữ request mới nhất.

Phù hợp:

- Search theo từ khóa mới nhất.
- Tải detail khi id thay đổi.
- Fetch latest data.

Không phù hợp với mutation bắt buộc phải giữ tất cả thao tác.

#### `concatMap`

Xếp hàng inner Observable và chạy tuần tự. Cart dùng nó cho add/remove/update/clear để không hủy thao tác trước.

Ví dụ ba lần tăng số lượng:

```text
request 1 → complete
request 2 → complete
request 3 → complete
```

#### `exhaustMap` (dự án chưa dùng)

Bỏ qua action mới trong khi request cũ chưa xong. Phù hợp chống bấm submit nhiều lần.

#### `mergeMap` (dự án chưa dùng)

Chạy song song tất cả request. Nhanh nhưng kết quả có thể về không đúng thứ tự.

### 6.5. Tại sao `catchError` phải nằm trong inner stream?

Nếu catch error ở ngoài toàn bộ pipeline, Epic có thể complete sau một lỗi và không nghe action sau nữa. Đặt nó trong request Observable giúp mỗi request tự chuyển lỗi thành failure action, trong khi Epic tiếp tục sống.

### 6.6. Dependency injection

Thay vì Epic import trực tiếp singleton Service, Store truyền:

```ts
createEpicMiddleware({ dependencies: epicDependencies });
```

Epic dùng:

```ts
dependencies.productService.getProducts();
```

Lợi ích:

- Test có thể truyền fake Service.
- Epic bớt coupling.
- Cấu hình Service tập trung.
- TypeScript biết dependency nào tồn tại.

### 6.7. Root Epic

`combineEpics` ghép các Epic. Epic middleware chạy root Epic một lần khi Store khởi tạo. Mọi Epic con cùng nghe `action$`, nhưng `ofType` quyết định Epic nào phản ứng.

---

## 7. Service layer và ranh giới backend

### 7.1. Trách nhiệm Service

Service nên:

- Gọi HTTP/storage/I/O.
- Biết endpoint và request format.
- Chuyển DTO API thành domain model nếu cần.
- Trả kiểu rõ ràng, trong dự án là Observable.

Service không nên:

- Render UI.
- Toast hoặc navigate.
- Trực tiếp thay Redux state.

### 7.2. Mock Service

Hiện tại:

```ts
return mockApiCall(data);
```

Sau này có thể thay bằng HTTP Observable mà Epic/Component giữ nguyên giao tiếp.

### 7.3. DTO và domain model

- **DTO:** Dữ liệu đúng như API gửi/nhận.
- **Domain model:** Dữ liệu thuận tiện và an toàn cho logic ứng dụng.

Ví dụ mock product có `price` là chuỗi `"4 940 000"`; domain Product dùng `number`. `productService` parse chuỗi sang số. UI và Cart không nên lặp lại parsing API ở nhiều nơi.

### 7.4. Backend thật cần làm gì?

Khi kết nối backend:

- Xác thực email/password trên server.
- Phát và xác minh token.
- Lưu user/product/cart/order trong database.
- Kiểm tra quyền truy cập.
- Validate request.
- Tính giá/order total từ database, không tin giá client.
- Trả HTTP status phù hợp.
- Xử lý idempotency cho checkout/thanh toán.

Frontend không thể tự bảo mật dữ liệu vì người dùng kiểm soát trình duyệt.

---

## 8. Phân tích module Auth

### 8.1. State

```text
auth.user
auth.isLoggedIn
auth.loading
auth.error
```

- `user`: thông tin user hoặc null.
- `isLoggedIn`: UI có coi session hợp lệ không.
- `loading`: login/logout/update profile đang xử lý.
- `error`: lỗi gần nhất.

### 8.2. Login flow

```text
Login form submit
→ login({ email, password })
→ loginEpic
→ authService.login
→ storageService.setUser
→ loginSuccess(user)
→ reducer set isLoggedIn=true
→ Login useSelector nhận thay đổi
→ navigate về trang ban đầu
```

Sai credentials:

```text
authService throwError
→ catchError
→ loginFailure(message)
→ UI hiển thị auth.error
```

### 8.3. Logout flow

Logout success xóa storage và state. Logout failure có action riêng và giữ user/session, tránh tình trạng Redux nói đã logout nhưng storage vẫn còn.

### 8.4. Profile flow

Profile dùng state cục bộ cho input. Khi Save:

```text
updateProfile(partialData)
→ updateProfileEpic đọc user hiện tại từ state$.value
→ authService.updateProfile
→ storageService.setUser
→ updateProfileSuccess(fullUser)
```

`Partial<User>` cho phép chỉ gửi các field thay đổi. Service merge với full user.

### 8.5. Storage Service và runtime validation

TypeScript chỉ kiểm tra lúc build; nó không bảo đảm chuỗi trong localStorage là User thật. Vì vậy:

1. Lấy chuỗi.
2. `JSON.parse` trong `try/catch`.
3. Coi kết quả là `unknown`.
4. Type guard kiểm tra `id`, `fullName`, `token`.
5. Sai schema thì xóa storage và trả null.

### 8.6. Rủi ro Auth còn lại

- Token mock không có hết hạn.
- `localStorage` dễ bị JavaScript đọc nếu app có XSS.
- Chưa có refresh token/401 handling.
- Login, logout, profile dùng chung loading/error; app lớn nên tách operation state.

---

## 9. Phân tích module Product

### 9.1. `Product` và `ProductDetail`

`Product` có thông tin dùng cho danh sách. `ProductDetail extends Product` và thêm `description`, `specs`.

### 9.2. State

```text
product.products
product.selectedProduct
product.loading
product.error
```

### 9.3. Danh sách

Shop mount dispatch `fetchProducts`. Service parse price, Epic phát success, reducer lưu danh sách. Search/filter/pagination hiện xử lý cục bộ trong Component vì data mock nhỏ.

Với backend và dữ liệu lớn, nên gửi query lên server:

```text
GET /products?search=...&minPrice=...&page=...
```

### 9.4. Product Detail và deep link

Trang detail không phụ thuộc Shop phải chạy trước. Khi `id` từ URL có giá trị, Component dispatch fetch detail. Vì vậy refresh `/product/1` vẫn có data.

Khái niệm **deep link**: URL trỏ thẳng vào một màn hình con mà không cần đi từ trang chủ.

### 9.5. State ảnh cục bộ

`activeImg` là UI state cục bộ. Khi `product` async thay đổi, effect đồng bộ `activeImg` với `product.image`. Nếu chỉ khởi tạo `useState(product?.image || "")` một lần, data về sau sẽ không tự cập nhật initial state.

---

## 10. Phân tích module Cart

### 10.1. Model

`CartItem extends Product` và thêm `quantity`.

State:

```text
cart.items
cart.total
cart.loading
cart.error
cart.addStatus
```

`addStatus` giúp UI biết riêng add-to-cart đang idle/loading/succeeded/failed.

### 10.2. Các flow

- `getCart`: tải giỏ.
- `addToCart`: thêm sản phẩm hoặc tăng quantity nếu đã có.
- `removeFromCart`: xóa item.
- `updateCartItem`: thay quantity.
- `clearCart`: xóa toàn bộ sau checkout.

Mỗi flow đều có trigger/success/failure.

### 10.3. Tại sao clear cart không thể chỉ xóa Redux?

Redux là bản state UI. Service/backend là nguồn dữ liệu. Nếu chỉ xóa UI, lần fetch sau Service có thể trả dữ liệu cũ. Do đó:

```text
clearCart trigger
→ Service xóa
→ clearCartSuccess
→ Reducer xóa state
```

### 10.4. Optimistic và pessimistic update

- **Optimistic:** UI thay ngay, nếu API lỗi thì rollback.
- **Pessimistic:** Chờ API success rồi UI mới xác nhận.

Dự án hiện thiên về pessimistic cho clear cart và result notification, dễ hiểu và nhất quán hơn cho demo.

### 10.5. Toast và navigate sau success

Trigger chỉ nghĩa là “yêu cầu đã bắt đầu”, không phải “đã thành công”. ProductDetail theo dõi `addStatus`:

- `succeeded`: toast hoặc navigate Cart.
- `failed`: toast error.

### 10.6. Hai total

State có `cart.total`, selector cũng tính total từ items. Về lâu dài nên chọn một source of truth. Hiện UI dùng selector tính từ items.

### 10.7. Mock cart và refresh

`mockCart` là biến trong memory của JavaScript module. Refresh trang tạo runtime mới nên giỏ không bền vững. Backend thật sẽ lưu theo user trong database.

---

## 11. Phân tích module Order và Checkout

### 11.1. Checkout local form state

Name, phone, address và payment method là form state cục bộ. Cart items/total là global state vì đến từ Cart và được nhiều Component dùng.

### 11.2. Create order flow

```text
Submit form
→ createOrder({ form fields, items })
→ createOrderEpic
→ orderService.placeOrder
→ Service tính total từ items
→ createOrderSuccess
→ Checkout thấy order
→ toast success + clearCart + navigate
```

### 11.3. Tại sao không gửi `totalAmount` từ Component?

Người dùng có thể sửa JavaScript, Redux state hoặc request. Total do client gửi không đáng tin. Việc Service frontend tính lại là cải thiện logic, nhưng **backend thật vẫn phải tự lấy giá từ database**. Không tin cả `item.price` do client gửi.

### 11.4. QR payment

UI tạo URL ảnh VietQR từ amount và phone. Đây chỉ là hiển thị QR, không xác minh giao dịch. Thanh toán thật cần payment provider, callback/webhook, signature validation và trạng thái order trên backend.

---

## 12. Internationalization (i18n)

`i18next` và `react-i18next` tách text khỏi Component.

```ts
const { t } = useTranslation();
t("login.login_button");
```

Key được tra trong `en.json` hoặc `vi.json`. Lợi ích:

- Không hard-code text nhiều ngôn ngữ trong JSX.
- Translator có thể sửa file từ điển.
- Dễ thêm ngôn ngữ.

Header gọi `i18n.changeLanguage`. Dự án có ghi language vào localStorage, nhưng cấu hình khởi tạo hiện dùng `lng: "en"`; muốn nhớ ngôn ngữ sau refresh cần đọc storage khi init hoặc dùng language detector.

---

## 13. Styling và assets

### 13.1. CSS Modules

```ts
import styles from "./Shop.module.scss";
```

CSS Modules đổi class thành tên unique khi build, tránh `.wrapper` của trang này đè trang khác.

### 13.2. `classnames/bind`

```ts
const cx = classNames.bind(styles);
cx("button", { disabled: loading });
```

Kết hợp class cố định và class có điều kiện.

### 13.3. SCSS

SCSS bổ sung nesting, variables và các tính năng tiện hơn CSS. `sass` biên dịch `.scss` thành CSS.

### 13.4. Assets

Import ảnh trong TypeScript giúp bundler xử lý hash/file path. Ảnh trong `public` có thể truy cập bằng URL tĩnh; ảnh trong `src/assets` đi qua build pipeline.

---

## 14. Error, loading và operation state

Mỗi request cần trả lời ba câu hỏi:

1. Đang chờ không?
2. Thành công thì data là gì?
3. Thất bại thì lỗi là gì?

Trigger phải reset error cũ. Nếu không, retry thành công nhưng UI vẫn có thể hiện lỗi.

Một `loading` chung đủ cho demo nhỏ. Module lớn nên tách:

```text
fetchStatus
addStatus
updateStatus
deleteStatus
```

hoặc state theo request id để tránh thao tác này làm spinner/error của thao tác khác.

---

## 15. Immutability, source of truth và tính nhất quán

### 15.1. Immutability

Không sửa object/array state cũ ngoài reducer do Immer quản lý. Service cart tạo array/object mới bằng spread/map/filter.

### 15.2. Single source of truth

Một dữ liệu không nên có hai nguồn độc lập. Nếu Redux total và derived total cùng tồn tại, phải quy định nguồn nào là chuẩn.

### 15.3. Client state và server state

- Client state: dropdown, form draft, selected tab.
- Server state: products, cart, orders, authenticated user.

Demo lưu server-like state trong Redux/mock Service. Khi dùng backend, cần quyết định cache, refetch, stale data và synchronization.

---

## 16. Testing

### 16.1. Tại sao test?

Test không chứng minh app không bao giờ có lỗi; nó chứng minh các trường hợp đã mô tả vẫn đúng sau khi code thay đổi.

### 16.2. Test hiện có

- Product reducer lưu detail sau success.
- Cart reset stale error và chỉ clear items sau success.
- Auth giữ session khi logout failure.

Reducer test dễ vì reducer là hàm thuần:

```text
given old state + action
expect new state
```

### 16.3. Các tầng test nên biết

1. **Unit test:** Hàm/reducer/selector/service nhỏ.
2. **Epic test/marble test:** Kiểm tra action theo thời gian, error và cancellation.
3. **Component integration test:** Render Component với Store/Router, thao tác như user.
4. **E2E:** Mở browser thật, login → shop → cart → checkout.

### 16.4. Arrange–Act–Assert

- Arrange: chuẩn bị state/data.
- Act: dispatch action/thao tác.
- Assert: kiểm tra kết quả.

### 16.5. Regression test

Test được viết sau khi phát hiện lỗi để bảo đảm lỗi đó không quay lại.

---

## 17. Build, package và công cụ

### 17.1. `package.json`

- `dependencies`: package app cần.
- `devDependencies`: type, test và công cụ phát triển.
- `scripts`: lệnh npm.

### 17.2. Các lệnh

```powershell
npm install
npm start
npm run build
$env:CI="true"; npm test -- --watchAll=false
```

- `npm install`: cài package theo package-lock.
- `npm start`: dev server, hot reload.
- `npm run build`: type-check, bundle và tối ưu production.
- `npm test`: chạy test.

### 17.3. `package-lock.json`

Khóa phiên bản dependency tree để các máy cài kết quả nhất quán. Nên commit cùng `package.json`.

### 17.4. `tsconfig.json`

Cấu hình TypeScript: strict mode, target JavaScript, JSX, module resolution, type Jest/Node và thư mục include.

### 17.5. Development và production

- Development: source map, warning, Redux DevTools, hot reload.
- Production: bundle minify, tối ưu kích thước; Redux DevTools được tắt bằng `NODE_ENV`.

---

## 18. Cách debug dự án

### 18.1. Redux DevTools

Kiểm tra:

1. Trigger có dispatch không?
2. Success/failure có xuất hiện không?
3. Payload có đúng không?
4. State diff có đúng không?

Nếu có trigger nhưng không có success/failure: kiểm tra Epic, `ofType`, Service Observable và `catchError`.

Nếu có success nhưng UI sai: kiểm tra reducer, selector và Component.

### 18.2. Browser DevTools

- Console: exception/warning/log Service.
- Network: sau này xem HTTP request/response.
- Application: xem localStorage.
- Elements: DOM và CSS.
- React DevTools: Component tree, props, hooks.

### 18.3. Debug theo ranh giới

Đừng sửa ngẫu nhiên. Kiểm tra từng ranh giới:

```text
UI event → action → Epic → Service → action → state → selector → UI
```

Điểm nào đầu vào đúng nhưng đầu ra sai thì lỗi nằm trong lớp đó.

---

## 19. Những lỗi đã sửa và bài học

### 19.1. Deep link Product Detail

**Lỗi:** Chỉ tìm product trong danh sách do Shop tải.  
**Bài học:** Mỗi route phải tự tải dữ liệu cần thiết; không phụ thuộc lịch sử navigation.

### 19.2. Clear Redux nhưng không clear Service

**Lỗi:** Hai nguồn dữ liệu mâu thuẫn.  
**Bài học:** Mutation phải đồng bộ source và state UI.

### 19.3. Logout failure dùng login failure

**Lỗi:** Tái sử dụng action không cùng semantics.  
**Bài học:** Action phải mô tả đúng sự kiện; mỗi use case có success/failure rõ.

### 19.4. LocalStorage trong reducer

**Lỗi:** I/O trong hàm phải thuần.  
**Bài học:** Reducer chỉ tính state; side effect đặt trong Service/Epic.

### 19.5. Toast trước API success

**Lỗi:** Nhầm “request started” với “request succeeded”.  
**Bài học:** UI success phải phản ứng với success state/action.

### 19.6. `switchMap` cho cart mutation

**Lỗi:** Operator không phù hợp semantics.  
**Bài học:** Chọn flattening operator theo chính sách concurrency, không chọn theo thói quen.

### 19.7. Error không reset

**Lỗi:** State mang lỗi cũ sang request mới.  
**Bài học:** Xác định state transition đầy đủ cho trigger/success/failure.

### 19.8. Type assertion sai

**Lỗi:** Dùng `as` che sự khác nhau của model.  
**Bài học:** Type phải phản ánh object runtime; assertion không tạo data.

### 19.9. Client quyết định total

**Lỗi:** Tin dữ liệu có thể bị sửa.  
**Bài học:** Server là authority cho giá, quyền và transaction.

---

## 20. Rủi ro và phần chưa hoàn thiện

1. Chưa có backend/API/database thật.
2. Test coverage còn thấp; chưa có Epic/integration/E2E tests.
3. Product/Cart/Order types còn import chéo; nên tách domain types.
4. Cart mock không persistent qua full refresh.
5. Auth operation state còn dùng chung.
6. `cart.total` và derived total là hai biểu diễn cần chuẩn hóa.
7. Ngôn ngữ đã ghi storage nhưng init chưa đọc lại.
8. QR chỉ là hình minh họa, không phải payment integration.
9. Chưa có runtime schema validation cho response API.
10. Redux-Observable đang là phiên bản release candidate, cần kiểm tra compatibility khi production.
11. Dữ liệu/text nguồn có một số dấu hiệu encoding tiếng Việt sai, cần chuẩn hóa UTF-8.
12. Chưa có logging/monitoring/error boundary cho production.

---

## 21. Lộ trình học đề xuất

### Giai đoạn 1: JavaScript và TypeScript nền

Học theo thứ tự:

1. Biến, hàm, object, array.
2. `map/filter/find/reduce`.
3. Module, destructuring, spread.
4. Event loop, Promise, async/await.
5. TypeScript basic, interface, union, generic, unknown, type guard.

Bài tập: tự viết hàm tính cart total và validate User.

### Giai đoạn 2: React

1. Component, JSX, props.
2. `useState` và form.
3. `useEffect` và cleanup.
4. Render list/conditional.
5. Router và layout.

Bài tập: tạo product list cục bộng, search và detail route không Redux.

### Giai đoạn 3: Redux Toolkit

1. Store/action/reducer.
2. Slice và Immer.
3. Provider/useDispatch/useSelector.
4. Selector/createSelector.
5. Redux DevTools.

Bài tập: tạo counter, sau đó cart reducer không async.

### Giai đoạn 4: RxJS

1. Observable, observer, subscription.
2. `of`, `throwError`, `pipe`.
3. `map`, `filter`, `catchError`.
4. `switchMap`, `concatMap`, `mergeMap`, `exhaustMap`.
5. Cancellation và error boundary.

Bài tập: vẽ timeline cho bốn operator khi ba event đến nhanh.

### Giai đoạn 5: Redux-Observable

1. Epic signature.
2. Trigger/success/failure.
3. Service Observable.
4. Root Epic/middleware.
5. Dependency injection.
6. Marble testing.

Bài tập: tự viết lại fetch products flow không xem code, sau đó so sánh.

### Giai đoạn 6: Kiến trúc và backend integration

1. Separation of concerns.
2. DTO/domain/state model.
3. Client state/server state.
4. HTTP, status code, authentication.
5. Validation và security boundary.
6. Unit/integration/E2E testing.

---

## 22. Cách tự đọc một luồng trong code

Khi muốn hiểu một tính năng, ví dụ Add to Cart:

1. Tìm event trong Component: `dispatch(addToCart(product))`.
2. Mở Slice: trigger thay state gì, payload type gì?
3. Tìm `ofType(addToCart.type)` trong Epic.
4. Xem operator concurrency.
5. Mở Service: dữ liệu thay đổi ra sao, Observable trả gì?
6. Quay lại Epic: response map thành action nào, error map thành action nào?
7. Quay lại Slice: success/failure thay state gì?
8. Xem Selector nào đọc state đó.
9. Xem Component phản ứng ra sao.
10. Mở Redux DevTools và đối chiếu action/state thật.

Công thức này áp dụng cho mọi module.

---

## 23. Câu hỏi tự kiểm tra

Nếu trả lời được các câu sau, bạn đã hiểu phần lớn dự án:

1. Tại sao Product Detail phải tự fetch theo id?
2. Trigger action khác success action như thế nào?
3. Tại sao reducer không được ghi localStorage?
4. `switchMap` và `concatMap` khác nhau ở điểm nào?
5. Tại sao toast không nên hiện ngay sau trigger?
6. Selector giải quyết vấn đề gì?
7. Service hiện tại có phải backend không?
8. TypeScript có validate localStorage runtime không?
9. Tại sao backend không được tin total/price từ client?
10. Dependency injection giúp test Epic như thế nào?
11. Khi có trigger nhưng không có success/failure, bạn debug ở đâu?
12. Khi success action đúng nhưng UI sai, bạn debug ở đâu?

---

## 24. Từ điển thuật ngữ ngắn

| Thuật ngữ            | Nghĩa trong dự án                                      |
| -------------------- | ------------------------------------------------------ |
| Component            | Khối UI React                                          |
| Props                | Dữ liệu Component cha truyền cho con                   |
| State                | Dữ liệu thay đổi theo thời gian                        |
| Store                | Nơi giữ global Redux state                             |
| Action               | Object mô tả sự kiện                                   |
| Dispatch             | Gửi action vào Redux                                   |
| Reducer              | Hàm tính state mới từ state cũ và action               |
| Slice                | Gói state, reducers và actions của một feature         |
| Selector             | Hàm đọc/derive Redux state                             |
| Side effect          | Tác động ngoài phép tính state: API, storage, timer... |
| Observable           | Luồng giá trị/error theo thời gian                     |
| Epic                 | Pipeline nhận action và phát action mới                |
| Operator             | Hàm biến đổi/kết hợp Observable                        |
| Service              | Lớp giao tiếp I/O/API/storage                          |
| Dependency injection | Truyền dependency từ ngoài thay vì import cứng         |
| DTO                  | Kiểu dữ liệu trao đổi với API                          |
| Domain model         | Model phục vụ logic nghiệp vụ                          |
| Deep link            | URL mở thẳng trang con                                 |
| Persistence          | Dữ liệu còn sau refresh/restart                        |
| Immutability         | Không sửa trực tiếp giá trị cũ                         |
| Memoization          | Cache kết quả khi input không đổi                      |
| Regression test      | Test ngăn lỗi cũ quay lại                              |
| Mock                 | Thành phần giả thay hệ thống thật                      |
| Runtime validation   | Kiểm tra data khi chương trình đang chạy               |
| Source of truth      | Nguồn dữ liệu được coi là chuẩn                        |

---

## 25. Kết luận

Dự án áp dụng kiến trúc frontend theo feature, kết hợp React cho UI, Redux Toolkit cho global state, Redux-Observable/RxJS cho side effect, Service cho I/O, Selector cho data access và TypeScript cho type safety.

Điều quan trọng nhất không phải học thuộc từng dòng code, mà là hiểu ranh giới:

```text
Component lo UI
Slice lo state transition
Epic lo orchestration bất đồng bộ
Service lo I/O
Selector lo đọc/derive state
Backend thật lo dữ liệu, quyền, giá và transaction đáng tin cậy
```

Khi nắm được luồng một chiều và trách nhiệm của từng lớp, bạn có thể đọc, debug và mở rộng toàn bộ dự án mà không bị lạc trong chi tiết.
