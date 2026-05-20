import { PRODUCTS, Product } from "../data";

export interface MockUser {
  id: string;
  fullName: string;
  token: string;
}

export const MOCK_USER: MockUser = {
  id: "u123",
  fullName: "Quân Nguyễn",
  token: "mock-token-xyz",
};

export const MOCK_PRODUCTS: Product[] = PRODUCTS;

export const MOCK_CART_ITEMS: any[] = [];
