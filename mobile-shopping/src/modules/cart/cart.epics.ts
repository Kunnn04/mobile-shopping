import { ofType } from "redux-observable";
import { of, Observable } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";
import { Action, PayloadAction } from "@reduxjs/toolkit";
import {
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
  CartPayload,
} from "./cart.slice";
import { Product } from "../product/product.slice";
import { cartService } from "../../services/cart.service";
import { AppEpic } from "../../store/root.epic";
import { CartItem } from "./cart.slice";

const calculateCartData = (items: CartItem[]): CartPayload => ({
  items,
  total: items.reduce((total, item) => total + item.price * item.quantity, 0),
});

export const getCartEpic: AppEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(getCart.type),
    switchMap(() =>
      cartService.getCartItems().pipe(
        map((items: CartItem[]) => getCartSuccess(calculateCartData(items))),
        catchError((error: Error) => of(getCartFailure(error.message))),
      ),
    ),
  );
export const addToCartEpic: AppEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(addToCart.type),
    switchMap((action: PayloadAction<Product>) => {
      // Chuyển Product thành CartItem trước khi gửi vào service
      const cartItem: CartItem = { ...action.payload, quantity: 1 };
      return cartService.addToCart(cartItem).pipe(
        map((items: CartItem[]) => addToCartSuccess(calculateCartData(items))),
        catchError((error: Error) => of(addToCartFailure(error.message))),
      );
    }),
  );
export const removeFromCartEpic: AppEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(removeFromCart.type),
    switchMap((action: PayloadAction<string>) =>
      cartService.removeFromCart(action.payload).pipe(
        map((items: CartItem[]) =>
          removeFromCartSuccess(calculateCartData(items)),
        ),
        catchError((error: Error) => of(removeFromCartFailure(error.message))),
      ),
    ),
  );

export const updateCartItemEpic: AppEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(updateCartItem.type),
    switchMap(
      (action: PayloadAction<{ productId: string; quantity: number }>) =>
        cartService
          .updateCartItem(action.payload.productId, action.payload.quantity)
          .pipe(
            map((items: CartItem[]) =>
              updateCartItemSuccess(calculateCartData(items)),
            ),
            catchError((error: Error) =>
              of(updateCartItemFailure(error.message)),
            ),
          ),
    ),
  );

export const cartEpics: AppEpic[] = [
  getCartEpic,
  addToCartEpic,
  removeFromCartEpic,
  updateCartItemEpic,
];
