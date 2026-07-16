import { combineEpics, Epic } from "redux-observable";
import { Action } from "@reduxjs/toolkit";
import { authEpics } from "../modules/auth/auth.epics";
import { cartEpics } from "../modules/cart/cart.epics";
import { productEpics } from "../modules/product/product.epics";
import { orderEpics } from "../modules/order/order.epics";
import { RootState } from "./root.reducer";
import { authService } from "../services/auth.service";
import { cartService } from "../services/cart.service";
import { productService } from "../services/product.service";
import { orderService } from "../services/order.service";
import { storageService } from "../services/storage.service";

export const epicDependencies = {
  authService,
  cartService,
  productService,
  orderService,
  storageService,
};

export type EpicDependencies = typeof epicDependencies;
export type AppEpic = Epic<Action, Action, RootState, EpicDependencies>;

export const rootEpic = combineEpics(
  ...authEpics,
  ...cartEpics,
  ...productEpics,
  ...orderEpics,
) as AppEpic;
