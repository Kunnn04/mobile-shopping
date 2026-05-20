import { RootState } from "../../store/store";
import { Product } from "./product.slice";
import { ProductDetail } from "../../services/product.service";

export const selectProducts = (state: RootState): Product[] =>
  state.product.products;

export const selectProductLoading = (state: RootState): boolean =>
  state.product.loading;

export const selectProductError = (state: RootState): string | null =>
  state.product.error;

export const selectProductById =
  (id: string) =>
  (state: RootState): ProductDetail | undefined =>
    state.product.products.find((p) => p.id === id) as
      | ProductDetail
      | undefined;
