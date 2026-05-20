import { mockApiCall } from "./utils";
import { Observable } from "rxjs";
import { CreateOrderPayload } from "../modules/order/order.slice";

interface OrderResponse {
  orderId: string;
  date: string;
  totalAmount: number;
  status: string;
}

const MOCK_ORDER: OrderResponse = {
  orderId: "ORD001",
  date: new Date().toISOString(),
  totalAmount: 1500,
  status: "Pending",
};

export const orderService = {
  placeOrder: (
    checkoutDetails: CreateOrderPayload,
  ): Observable<OrderResponse> => {
    console.log("[ORDER MOCK] Giả lập tạo đơn hàng");
    return mockApiCall({
      ...MOCK_ORDER,
      totalAmount: checkoutDetails.totalAmount,
    });
  },

  getOrderHistory: (): Observable<OrderResponse[]> => {
    console.log("[ORDER MOCK] Giả lập lấy lịch sử đơn hàng");
    return mockApiCall([
      MOCK_ORDER,
      { ...MOCK_ORDER, orderId: "ORD002", status: "Delivered" },
    ]);
  },
};
