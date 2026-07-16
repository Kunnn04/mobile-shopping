import { mockApiCall } from "./utils";
import { MOCK_CART_ITEMS } from "../mocks/mockData";
import { CartItem } from "../modules/cart/cart.slice";

let mockCart: CartItem[] = [...MOCK_CART_ITEMS];

export const cartService = {
  getCartItems: () => {
    console.log("[CART] Lấy giỏ hàng");
    return mockApiCall(mockCart);
  },

  addToCart: (product: CartItem) => {
    console.log(`[CART] Thêm sản phẩm ID: ${product.id}`);
    const existing = mockCart.find((item) => item.id === product.id);
    if (existing) {
      mockCart = mockCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    } else {
      mockCart = [...mockCart, { ...product, quantity: 1 }];
    }
    return mockApiCall(mockCart);
  },

  removeFromCart: (productId: string) => {
    console.log(`[CART] Xóa sản phẩm ID: ${productId}`);
    mockCart = mockCart.filter((item) => item.id !== productId);
    return mockApiCall(mockCart);
  },

  updateCartItem: (productId: string, quantity: number) => {
    console.log(
      `[CART] Cập nhật sản phẩm ID: ${productId}, số lượng: ${quantity}`,
    );
    mockCart = mockCart.map((item) =>
      item.id === productId ? { ...item, quantity } : item,
    );
    return mockApiCall(mockCart);
  },

  clearCart: () => {
    mockCart = [];
    return mockApiCall(mockCart);
  },
};
