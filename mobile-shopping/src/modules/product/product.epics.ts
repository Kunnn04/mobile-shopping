import { ofType } from "redux-observable";
import { of } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";
import { Action } from "@reduxjs/toolkit";
import { Observable } from "rxjs";
import {
  fetchProducts,
  fetchProductsSuccess,
  fetchProductsFailure,
} from "./product.slice";
import { productService } from "../../services/product.service";
import { AppEpic } from "../../store/root.epic";

const fetchProductsEpic: AppEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(fetchProducts.type),
    switchMap(() =>
      productService.getProducts().pipe(
        map((response) => fetchProductsSuccess(response)),
        catchError((error: Error) => of(fetchProductsFailure(error.message))),
      ),
    ),
  );

export const productEpics: AppEpic[] = [fetchProductsEpic];
