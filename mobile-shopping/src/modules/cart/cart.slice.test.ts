import reducer, {
  addToCart,
  addToCartFailure,
  clearCart,
  clearCartSuccess,
  getCartSuccess,
  Product,
} from "./cart.slice";

const product: Product = {
  id: "1",
  name: "Phone",
  price: 100,
  image: "phone.png",
  rating: 5,
};

test("clears stale errors on retry and only empties cart after success", () => {
  let state = reducer(undefined, addToCartFailure("network"));
  state = reducer(state, addToCart(product));
  expect(state.error).toBeNull();

  state = reducer(
    state,
    getCartSuccess({ items: [{ ...product, quantity: 2 }], total: 200 }),
  );
  state = reducer(state, clearCart());
  expect(state.items).toHaveLength(1);
  expect(state.loading).toBe(true);

  state = reducer(state, clearCartSuccess());
  expect(state.items).toEqual([]);
  expect(state.total).toBe(0);
});
