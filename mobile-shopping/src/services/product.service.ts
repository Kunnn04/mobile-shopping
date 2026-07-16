import { Observable } from "rxjs";
import { mockApiCall } from "./utils";
import { MOCK_PRODUCTS } from "../mocks/mockData";
import { Product, ProductDetail } from "../modules/product/product.slice";

interface RawProduct {
  id: string;
  name: string;
  price: string | number;
  image: string;
  rating: number;
}

const parsePrice = (priceStr: string | number): number => {
  if (typeof priceStr === "string") {
    return Number(priceStr.replace(/\s/g, ""));
  }
  return priceStr;
};

const getProcessedProducts = (): Product[] => {
  return (MOCK_PRODUCTS as RawProduct[]).map((p) => ({
    ...p,
    price: parsePrice(p.price),
    image: p.image,
  }));
};

export const productService = {
  getProducts: (): Observable<Product[]> => {
    console.log("[PRODUCT] Lấy danh sách sản phẩm");
    return mockApiCall(getProcessedProducts());
  },

  getProductDetail: (productId: string): Observable<ProductDetail> => {
    console.log(`[PRODUCT] Lấy chi tiết sản phẩm ID: ${productId}`);
    const product = getProcessedProducts().find((p) => p.id === productId);

    if (product) {
      return mockApiCall({
        ...product,
        description: `Đây là mô tả chi tiết cho sản phẩm ${product.name}.`,
        specs: ["RAM: 8GB", "Bộ nhớ trong: 128GB", "Camera: 48MP"],
      });
    }

    return new Observable((observer) => {
      observer.error(new Error(`Không tìm thấy sản phẩm ID: ${productId}`));
    });
  },
};
