import { combineEpics, Epic } from "redux-observable";
import { Action } from "@reduxjs/toolkit";
import { authEpics } from "../modules/auth/auth.epics";
import { cartEpics } from "../modules/cart/cart.epics";
import { productEpics } from "../modules/product/product.epics";
import { orderEpics } from "../modules/order/order.epics";
import { RootState } from "./store";

export type AppEpic = Epic<Action, Action, RootState>;

export const rootEpic = combineEpics(
  ...authEpics,
  ...cartEpics,
  ...productEpics,
  ...orderEpics,
) as AppEpic;
