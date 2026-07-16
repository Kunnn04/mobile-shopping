import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../product/product.slice";

interface CartItem extends Product {
  quantity: number;
}

interface CartPayload {
  items: CartItem[];
  total: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  loading: boolean;
  error: string | null;
  addStatus: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: CartState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
  addStatus: "idle",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.loading = true;
      state.error = null;
    },
    clearCartSuccess: (state) => {
      state.items = [];
      state.total = 0;
      state.loading = false;
      state.error = null;
    },
    clearCartFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    getCart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCartSuccess: (state, action: PayloadAction<CartPayload>) => {
      state.loading = false;
      state.items = action.payload.items;
      state.total = action.payload.total;
      state.error = null;
    },
    getCartFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addToCart: (state, _action: PayloadAction<Product>) => {
      state.loading = true;
      state.addStatus = "loading";
      state.error = null;
    },
    addToCartSuccess: (state, action: PayloadAction<CartPayload>) => {
      state.loading = false;
      state.items = action.payload.items;
      state.total = action.payload.total;
      state.addStatus = "succeeded";
      state.error = null;
    },
    addToCartFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.addStatus = "failed";
    },
    removeFromCart: (state, _action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    removeFromCartSuccess: (state, action: PayloadAction<CartPayload>) => {
      state.loading = false;
      state.items = action.payload.items;
      state.total = action.payload.total;
      state.error = null;
    },
    removeFromCartFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateCartItem: (
      state,
      _action: PayloadAction<{ productId: string; quantity: number }>,
    ) => {
      state.loading = true;
      state.error = null;
    },
    updateCartItemSuccess: (state, action: PayloadAction<CartPayload>) => {
      state.loading = false;
      state.items = action.payload.items;
      state.total = action.payload.total;
      state.error = null;
    },
    updateCartItemFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export type { CartItem, CartState, CartPayload };
export type { Product } from "../product/product.slice";
export const {
  clearCart,
  clearCartSuccess,
  clearCartFailure,
  getCart,
  getCartSuccess,
  getCartFailure,
  addToCart,
  addToCartSuccess,
  addToCartFailure,
  removeFromCart,
  removeFromCartSuccess,
  removeFromCartFailure,
  updateCartItem,
  updateCartItemSuccess,
  updateCartItemFailure,
} = cartSlice.actions;

export default cartSlice.reducer;
