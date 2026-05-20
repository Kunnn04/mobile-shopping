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
}

const initialState: CartState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.loading = false;
      state.error = null;
    },
    getCart: (state) => {
      state.loading = true;
    },
    getCartSuccess: (state, action: PayloadAction<CartPayload>) => {
      state.loading = false;
      state.items = action.payload.items;
      state.total = action.payload.total;
    },
    getCartFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addToCart: (state, _action: PayloadAction<Product>) => {
      state.loading = true;
    },
    addToCartSuccess: (state, action: PayloadAction<CartPayload>) => {
      state.loading = false;
      state.items = action.payload.items;
      state.total = action.payload.total;
    },
    addToCartFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeFromCart: (state, _action: PayloadAction<string>) => {
      state.loading = true;
    },
    removeFromCartSuccess: (state, action: PayloadAction<CartPayload>) => {
      state.loading = false;
      state.items = action.payload.items;
      state.total = action.payload.total;
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
    },
    updateCartItemSuccess: (state, action: PayloadAction<CartPayload>) => {
      state.loading = false;
      state.items = action.payload.items;
      state.total = action.payload.total;
    },
    updateCartItemFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export type { CartItem, CartState, CartPayload };
export const {
  clearCart,
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
