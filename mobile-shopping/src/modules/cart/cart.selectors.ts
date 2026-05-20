import { createSelector } from "reselect";
import { RootState } from "../../store/store";
import { CartItem } from "./cart.slice";

export const selectCartItems = (state: RootState): CartItem[] =>
  state.cart.items;

export const selectCartLoading = (state: RootState): boolean =>
  state.cart.loading;

export const selectCartError = (state: RootState): string | null =>
  state.cart.error;

export const selectCartTotal = createSelector(selectCartItems, (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0),
);

export const selectCartCount = createSelector(selectCartItems, (items) =>
  items.reduce((count, item) => count + item.quantity, 0),
);
