import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../cart/cart.slice";

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: string;
}

interface OrderState {
  order: Order | null;
  loading: boolean;
  error: string | null;
}

// Interface cho payload của createOrder
interface CreateOrderPayload {
  name: string;
  phone: string;
  address: string;
  paymentMethod: string;
  items: CartItem[];
  totalAmount: number;
}

const initialState: OrderState = {
  order: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    createOrder: (state, _action: PayloadAction<CreateOrderPayload>) => {
      state.loading = true;
    },
    createOrderSuccess: (state, action: PayloadAction<Order>) => {
      state.loading = false;
      state.order = action.payload;
    },
    createOrderFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearOrder: (state) => {
      state.order = null;
      state.error = null;
    },
  },
});

export type { OrderState, CreateOrderPayload };
export const {
  createOrder,
  createOrderSuccess,
  createOrderFailure,
  clearOrder,
} = orderSlice.actions;
export default orderSlice.reducer;
