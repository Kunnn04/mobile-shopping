import { ofType } from "redux-observable";
import { of, Observable } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";
import { Action, PayloadAction } from "@reduxjs/toolkit";
import {
  createOrder,
  createOrderSuccess,
  createOrderFailure,
  Order,
  CreateOrderPayload,
} from "./order.slice";
import { orderService } from "../../services/order.service";
import { AppEpic } from "../../store/root.epic";

interface OrderResponse {
  orderId: string;
  date: string;
  totalAmount: number;
  status: string;
}

const createOrderEpic: AppEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(createOrder.type),
    switchMap((action: PayloadAction<CreateOrderPayload>) =>
      orderService.placeOrder(action.payload).pipe(
        map((response: OrderResponse) => {
          const order: Order = {
            id: response.orderId,
            items: action.payload.items.map((item) => ({
              productId: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
            })),
            total: response.totalAmount,
            status: response.status,
          };
          return createOrderSuccess(order);
        }),
        catchError((error: Error) => of(createOrderFailure(error.message))),
      ),
    ),
  );

export const orderEpics: AppEpic[] = [createOrderEpic];
