import reducer, {
  fetchProductDetail,
  fetchProductDetailSuccess,
  ProductDetail,
} from "./product.slice";

const detail: ProductDetail = {
  id: "1",
  name: "Phone",
  price: 100,
  image: "phone.png",
  rating: 5,
  description: "Detail",
  specs: ["8 GB"],
};

test("stores a product detail returned by the epic", () => {
  const loadingState = reducer(undefined, fetchProductDetail("1"));
  expect(loadingState.loading).toBe(true);
  expect(loadingState.selectedProduct).toBeNull();

  const successState = reducer(
    loadingState,
    fetchProductDetailSuccess(detail),
  );
  expect(successState.loading).toBe(false);
  expect(successState.selectedProduct).toEqual(detail);
});
