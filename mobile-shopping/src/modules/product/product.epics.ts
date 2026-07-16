import { ofType } from "redux-observable";
import { of } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";
import { Action } from "@reduxjs/toolkit";
import { Observable } from "rxjs";
import {
  fetchProducts,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductDetail,
  fetchProductDetailSuccess,
  fetchProductDetailFailure,
} from "./product.slice";
import { AppEpic } from "../../store/root.epic";
import { PayloadAction } from "@reduxjs/toolkit";

const fetchProductsEpic: AppEpic = (action$: Observable<Action>, _state$, dependencies) =>
  action$.pipe(
    ofType(fetchProducts.type),
    switchMap(() =>
      dependencies.productService.getProducts().pipe(
        map((response) => fetchProductsSuccess(response)),
        catchError((error: Error) => of(fetchProductsFailure(error.message))),
      ),
    ),
  );

const fetchProductDetailEpic: AppEpic = (action$: Observable<Action>, _state$, dependencies) =>
  action$.pipe(
    ofType(fetchProductDetail.type),
    switchMap((action: PayloadAction<string>) =>
      dependencies.productService.getProductDetail(action.payload).pipe(
        map((response) => fetchProductDetailSuccess(response)),
        catchError((error: Error) =>
          of(fetchProductDetailFailure(error.message)),
        ),
      ),
    ),
  );

export const productEpics: AppEpic[] = [
  fetchProductsEpic,
  fetchProductDetailEpic,
];
