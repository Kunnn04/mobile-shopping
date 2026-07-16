import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";
import styles from "./ProductDetail.module.scss";
import { addToCart } from "../modules/cart/cart.slice";
import {
  selectAddToCartStatus,
  selectCartCount,
  selectCartError,
} from "../modules/cart/cart.selectors";
import {
  selectSelectedProduct,
  selectProductLoading,
  selectProductError,
} from "../modules/product/product.selectors";
import { fetchProductDetail } from "../modules/product/product.slice";
import { AppDispatch } from "../store/store";

const cx = classNames.bind(styles);

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const cartCount = useSelector(selectCartCount);
  const product = useSelector(selectSelectedProduct);
  const productLoading = useSelector(selectProductLoading);
  const productError = useSelector(selectProductError);
  const addStatus = useSelector(selectAddToCartStatus);
  const cartError = useSelector(selectCartError);

  // Khởi tạo thẳng từ product, không cần useEffect nữa
  const [activeImg, setActiveImg] = useState<string>(product?.image || "");
  const [pendingAction, setPendingAction] = useState<"add" | "buy" | null>(
    null,
  );

  useEffect(() => {
    if (id) dispatch(fetchProductDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    setActiveImg(product?.image || "");
  }, [product]);

  useEffect(() => {
    if (!pendingAction) return;
    if (addStatus === "succeeded") {
      if (pendingAction === "buy") navigate("/cart");
      else if (product) toast.success(`${t("detail.added_msg")} ${product.name}!`);
      setPendingAction(null);
    } else if (addStatus === "failed") {
      toast.error(cartError || t("checkout.error_msg"));
      setPendingAction(null);
    }
  }, [addStatus, cartError, navigate, pendingAction, product, t]);

  const handleAddToCart = (isBuyNow: boolean = false): void => {
    if (product) {
      setPendingAction(isBuyNow ? "buy" : "add");
      dispatch(addToCart(product));
    }
  };

  if (productLoading) return <div>{t("checkout.processing")}</div>;

  if (!product) {
    return (
      <div className={cx("error-container")} data-testid="error-container">
        <h2>{productError || t("detail.not_found")}</h2>
        <button onClick={() => navigate("/shop")}>
          {t("detail.back_to_shop")}
        </button>
      </div>
    );
  }

  return (
    <div className={cx("wrapper")} data-testid="wrapper">
      <div className={cx("header-inner")} data-testid="header-inner">
        <div className={cx("breadcrumb")} data-testid="breadcrumb">
          <span onClick={() => navigate("/shop")}>{t("shop.title")}</span>
          <span> / </span>
          <span>{t("detail.breadcrumb")}</span>
        </div>
        <div
          className={cx("cart-icon-box")}
          data-testid="cart-icon-box"
          onClick={() => navigate("/cart")}
        >
          <AiOutlineShoppingCart className={cx("icon")} data-testid="icon" />
          {cartCount > 0 && (
            <span className={cx("badge")} data-testid="badge">
              {cartCount}
            </span>
          )}
        </div>
      </div>
      <div className={cx("container")} data-testid="container">
        <div className={cx("image-section")} data-testid="image-section">
          {/* Chỉ render img khi có activeImg */}
          {activeImg && (
            <img
              src={activeImg}
              alt={product.name}
              className={cx("main-img")}
              data-testid="main-img"
            />
          )}
          <div className={cx("thumb-list")} data-testid="thumb-list">
            {[product.image, product.image, product.image].map((img, index) => (
              <div
                key={index}
                className={cx("thumb-item", {
                  active: activeImg === img && index === 0,
                })}
                onClick={() => setActiveImg(img)}
              >
                <img src={img} alt="thumb" />
                <span>
                  {t("detail.color")} {index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className={cx("info-section")} data-testid="info-section">
          <h1 className={cx("title")} data-testid="title">
            {product.name}
          </h1>
          <div className={cx("rating")} data-testid="rating">
            {"⭐".repeat(product.rating || 5)}
            <span className={cx("rating-text")} data-testid="rating-text">
              ({t("detail.reviews")})
            </span>
          </div>
          <h2 className={cx("price")} data-testid="price">
            {new Intl.NumberFormat("vi-VN").format(
              parseInt(product.price.toString().replace(/\s/g, "")),
            )}{" "}
            VND
          </h2>
          <p className={cx("desc")} data-testid="desc">
            {product.description || t("cart.product_desc_default")}
          </p>
          <div className={cx("btn-groups")} data-testid="btn-groups">
            <button
              className={cx("btn-buy")}
              data-testid="btn-buy"
              onClick={() => handleAddToCart(true)}
              disabled={addStatus === "loading"}
            >
              {t("detail.buy_now")}
            </button>
            <button
              className={cx("btn-add")}
              data-testid="btn-add"
              onClick={() => handleAddToCart(false)}
              disabled={addStatus === "loading"}
            >
              {t("detail.add_to_cart")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
