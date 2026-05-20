import { CartItem } from "../modules/cart/cart.slice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";
import { FaCartPlus } from "react-icons/fa";
import styles from "./Cart.module.scss";
import commonStyles from "../styles/common.module.scss";
import { updateCartItem, removeFromCart } from "../modules/cart/cart.slice";
import {
  selectCartItems,
  selectCartTotal,
  selectCartLoading,
  selectCartError,
} from "../modules/cart/cart.selectors";
import { AppDispatch } from "../store/store";

const cx = classNames.bind(styles);
const commonCx = classNames.bind(commonStyles);

function Cart() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const cartItems = useSelector(selectCartItems) || [];
  const total = useSelector(selectCartTotal);
  const loading = useSelector(selectCartLoading);
  const error = useSelector(selectCartError);

  const tax: number = total * 0.1;
  const subTotal: number = total - tax;

  const handleQuantityChange = (
    id: string,
    currentQuantity: number,
    change: number,
  ): void => {
    const newQuantity = currentQuantity + change;
    if (newQuantity <= 0) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateCartItem({ productId: id, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (id: string): void => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = (): void => {
    if (cartItems.length === 0) {
      alert(t("cart.empty_alert"));
      return;
    }
    navigate("/checkout");
  };

  if (loading) {
    return (
      <div className={cx("wrapper")}>
        <div className={commonCx("card")}>
          <div className={cx("skeleton-list")}>
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className={cx("skeleton-item")}>
                  <div className={cx("skeleton-img")} />
                  <div className={cx("skeleton-info")}>
                    <div className={cx("skeleton-line", "full")} />
                    <div className={cx("skeleton-line", "medium")} />
                    <div className={cx("skeleton-line", "short")} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <div className={cx("wrapper")} data-testid="cart-page">
      <div className={commonCx("page-header")} data-testid="cart-header">
        <h2 className={commonCx("title")}>{t("cart.title")}</h2>
        <span className={cx("bag-info")}>
          {cartItems.length} {t("cart.item_unit")}
        </span>
      </div>
      <div className={commonCx("card")}>
        {cartItems.length > 0 ? (
          <>
            <div className={cx("cart-list")} data-testid="cart-list">
              {cartItems.map((item: CartItem) => (
                <div
                  key={item.id}
                  className={cx("cart-item")}
                  data-testid={`cart-item-${item.id}`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className={cx("item-img")}
                  />
                  <div className={cx("item-info")}>
                    <h4>{item.name}</h4>
                    <p className={cx("desc")}>
                      {t("cart.product_desc_default")}
                    </p>
                    <span className={cx("price-text")}>
                      {Number(item.price).toLocaleString()} VND
                    </span>
                  </div>
                  <div className={cx("quantity-control")}>
                    <button
                      data-testid={`cart-decrease-${item.id}`}
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity, -1)
                      }
                    >
                      -
                    </button>
                    <span
                      className={cx("qty-num")}
                      data-testid={`cart-quantity-${item.id}`}
                    >
                      {item.quantity}
                    </span>
                    <button
                      data-testid={`cart-increase-${item.id}`}
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity, 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    className={cx("remove-btn")}
                    data-testid={`cart-remove-${item.id}`}
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className={cx("summary-container")} data-testid="cart-summary">
              <div className={cx("summary-row")}>
                <span>{t("cart.subtotal")}</span>
                <span>{subTotal.toLocaleString()} VND</span>
              </div>
              <div className={cx("summary-row")}>
                <span>{t("cart.tax")} (10%)</span>
                <span>{tax.toLocaleString()} VND</span>
              </div>
              <div className={cx("summary-row", "total-row")}>
                <span>{t("cart.total")}</span>
                <span>{total.toLocaleString()} VND</span>
              </div>
              <button
                className={cx("checkout-btn")}
                data-testid="checkout-btn"
                onClick={handleCheckout}
              >
                {t("cart.checkout")}
              </button>
            </div>
          </>
        ) : (
          <div className={cx("empty-container")} data-testid="empty-cart">
            <FaCartPlus />
            <div className={cx("empty-msg")} data-testid="empty-cart-message">
              {t("cart.empty_msg")}
            </div>
            <button
              className={cx("back-btn")}
              data-testid="back-to-shop-btn"
              onClick={() => navigate("/shop")}
            >
              {t("cart.back_to_shop")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
