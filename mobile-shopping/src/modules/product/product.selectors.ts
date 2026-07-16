import { RootState } from "../../store/store";
import { Product, ProductDetail } from "./product.slice";

export const selectProducts = (state: RootState): Product[] =>
  state.product.products;

export const selectProductLoading = (state: RootState): boolean =>
  state.product.loading;

export const selectProductError = (state: RootState): string | null =>
  state.product.error;

export const selectProductById =
  (id: string) =>
  (state: RootState): Product | undefined =>
    state.product.products.find((p) => p.id === id);

export const selectSelectedProduct = (state: RootState): ProductDetail | null =>
  state.product.selectedProduct;
