import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Checkout.module.scss";
import {
  selectOrder,
  selectOrderLoading,
  selectOrderError,
} from "../modules/order/order.selectors";
import {
  selectCartItems,
  selectCartTotal,
} from "../modules/cart/cart.selectors";
import { createOrder, clearOrder } from "../modules/order/order.slice";
import { clearCart } from "../modules/cart/cart.slice";
import { AppDispatch } from "../store/store";

const cx = classNames.bind(styles);

interface FormData {
  name: string;
  phone: string;
  address: string;
  paymentMethod: string;
}

function Checkout() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotal);
  const order = useSelector(selectOrder);
  const loading = useSelector(selectOrderLoading);
  const error = useSelector(selectOrderError);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "cod",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const orderDetails = {
      ...formData,
      items: cartItems,
    };
    dispatch(createOrder(orderDetails));
  };

  useEffect(() => {
    if (order) {
      toast.success(t("checkout.success_msg"));
      dispatch(clearCart());
      navigate("/shop");
    }
  }, [order, navigate, dispatch, t]);

  useEffect(() => {
    if (error) {
      toast.error(t("checkout.error_msg"));
    }
  }, [error, t]);

  useEffect(() => () => {
    dispatch(clearOrder());
  }, [dispatch]);

  return (
    <div className={cx("wrapper")}>
      {loading && (
        <div className={cx("loading-overlay")} data-testid="loading-overlay">
          <div className={cx("spinner")} data-testid="spinner"></div>
          <p>{t("checkout.processing")}</p>
        </div>
      )}
      <h2>{t("checkout.title")}</h2>
      <form
        onSubmit={handleSubmit}
        className={cx("form", { disabled: loading })}
        data-testid="form"
      >
        <div className={cx("form-group")} data-testid="form-group">
          <label htmlFor="checkout-name-input">{t("checkout.name")}</label>
          <input
            id="checkout-name-input"
            required
            type="text"
            placeholder={t("checkout.placeholder_name")}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, name: e.target.value })
            }
            disabled={loading}
          />
        </div>
        <div className={cx("form-group")} data-testid="form-group">
          <label htmlFor="checkout-phone-input">{t("checkout.phone")}</label>
          <input
            id="checkout-phone-input"
            required
            type="tel"
            placeholder={t("checkout.placeholder_phone")}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            disabled={loading}
          />
        </div>
        <div className={cx("form-group")} data-testid="form-group">
          <label htmlFor="checkout-address-textarea">
            {t("checkout.address")}
          </label>
          <textarea
            id="checkout-address-textarea"
            required
            placeholder={t("checkout.placeholder_address")}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setFormData({ ...formData, address: e.target.value })
            }
            disabled={loading}
          />
        </div>
        <div className={cx("payment-methods")} data-testid="payment-methods">
          <label
            htmlFor="checkout-cod-radio"
            className={cx("method-item")}
            data-testid="method-item"
          >
            <input
              id="checkout-cod-radio"
              type="radio"
              name="payment"
              value="cod"
              checked={formData.paymentMethod === "cod"}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, paymentMethod: e.target.value })
              }
              disabled={loading}
            />
            <span>{t("checkout.payment_cod")}</span>
          </label>
          <label
            htmlFor="checkout-qr-radio"
            className={cx("method-item")}
            data-testid="method-item"
          >
            <input
              id="checkout-qr-radio"
              type="radio"
              name="payment"
              value="qr"
              checked={formData.paymentMethod === "qr"}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, paymentMethod: e.target.value })
              }
              disabled={loading}
            />
            <span>{t("checkout.payment_qr")}</span>
          </label>
        </div>
        {formData.paymentMethod === "qr" && (
          <div className={cx("qr-container")} data-testid="qr-container">
            <p>{t("checkout.qr_guide")}</p>
            <img
              src={`https://img.vietqr.io/image/MB-123456789-compact.png?amount=${totalAmount}&addInfo=Thanh toan don hang ${formData.phone}`}
              alt="VietQR"
              className={cx("qr-image")}
              data-testid="qr-image"
            />
            <span className={cx("qr-alert")} data-testid="qr-alert">
              {t("checkout.qr_alert")}
            </span>
          </div>
        )}
        <div className={cx("summary")} data-testid="summary">
          <p>
            {t("checkout.total_pay")}:{" "}
            <strong>{totalAmount.toLocaleString()} VND</strong>
          </p>
        </div>
        <button
          id="checkout-confirm-button"
          type="submit"
          className={cx("submit-btn")}
          data-testid="submit-btn"
          disabled={loading}
        >
          {t("checkout.confirm_order")}
        </button>
      </form>
    </div>
  );
}

export default Checkout;
