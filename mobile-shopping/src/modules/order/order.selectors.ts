import { RootState } from "../../store/store";
import { Order } from "./order.slice";

export const selectOrder = (state: RootState): Order | null =>
  state.order.order;

export const selectOrderLoading = (state: RootState): boolean =>
  state.order.loading;

export const selectOrderError = (state: RootState): string | null =>
  state.order.error;
