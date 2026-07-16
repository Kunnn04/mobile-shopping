import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Định nghĩa kiểu cho 1 sản phẩm
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
}

// Định nghĩa kiểu cho state của product
interface ProductState {
  products: Product[];
  selectedProduct: ProductDetail | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchProducts: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action: PayloadAction<Product[]>) => {
      // PayloadAction<Product[]> — payload là mảng Product
      state.loading = false;
      state.products = action.payload;
    },
    fetchProductsFailure: (state, action: PayloadAction<string>) => {
      // PayloadAction<string> — payload là chuỗi lỗi
      state.loading = false;
      state.error = action.payload;
    },
    fetchProductDetail: (state, _action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
      state.selectedProduct = null;
    },
    fetchProductDetailSuccess: (
      state,
      action: PayloadAction<ProductDetail>,
    ) => {
      state.loading = false;
      state.selectedProduct = action.payload;
      state.error = null;
    },
    fetchProductDetailFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export interface ProductDetail extends Product {
  description: string;
  specs: string[];
}

export type { Product, ProductState };
export const {
  fetchProducts,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductDetail,
  fetchProductDetailSuccess,
  fetchProductDetailFailure,
} = productSlice.actions;
export default productSlice.reducer;
