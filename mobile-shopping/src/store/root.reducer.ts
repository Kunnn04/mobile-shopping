import { combineReducers } from "redux";
import authReducer from "../modules/auth/auth.slice";
import cartReducer from "../modules/cart/cart.slice";
import productReducer from "../modules/product/product.slice";
import orderReducer from "../modules/order/order.slice"; // Import reducer mới

export const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
  auth: authReducer,
  order: orderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
