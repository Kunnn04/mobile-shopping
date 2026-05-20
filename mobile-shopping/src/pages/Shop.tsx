import { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaSearch,
  FaFilter,
} from "react-icons/fa";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Shop.module.scss";
import commonStyles from "../styles/common.module.scss";
import { fetchProducts } from "../modules/product/product.slice";
import {
  selectProducts,
  selectProductLoading,
  selectProductError,
} from "../modules/product/product.selectors";
import { AppDispatch } from "../store/store";

const cx = classNames.bind(styles);
const commonCx = classNames.bind(commonStyles);

interface PriceRange {
  from: number;
  to: number;
}
interface RatingRange {
  from: number;
  to: number;
}

function Shop() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductLoading);
  const error = useSelector(selectProductError);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<PriceRange>({
    from: 0,
    to: 100000000,
  });
  const [ratingRange, setRatingRange] = useState<RatingRange>({
    from: 0,
    to: 5,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);
  const [showSizeOptions, setShowSizeOptions] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleDetail = (id: string) => navigate(`/product/${id}`);

  const handleChangePageSize = (size: number) => {
    setItemsPerPage(size);
    setCurrentPage(1);
    setShowSizeOptions(false);
  };

  const handleInputSize = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 3) {
      setInputValue(value);
    }
  };

  const applyCustomSize = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && Number(inputValue) > 0) {
      handleChangePageSize(Number(inputValue));
      setInputValue("");
    }
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const filteredProducts = (products || []).filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const priceNum = parseInt(product.price.toString().replace(/\s/g, ""));
    const matchesPrice =
      priceNum >= priceRange.from && priceNum <= priceRange.to;
    const matchesRating =
      product.rating >= ratingRange.from && product.rating <= ratingRange.to;
    return matchesSearch && matchesPrice && matchesRating;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  if (loading) {
    return (
      <div className={cx("wrapper")}>
        <div className={cx("loading-grid")}>
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <div key={i} className={cx("skeleton-card")}>
                <div className={cx("skeleton-img")} />
                <div className={cx("skeleton-line", "full")} />
                <div className={cx("skeleton-line", "medium")} />
                <div className={cx("skeleton-line", "short")} />
              </div>
            ))}
        </div>
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <div className={cx("wrapper")} data-testid="shop-page">
      <div className={cx("sticky-header")} data-testid="shop-header">
        <h2 className={commonCx("title")}>{t("shop.title")}</h2>
        <div className={cx("actions")} data-testid="actions">
          <div className={cx("search-box")} data-testid="search-box">
            <input
              id="shop-search-input"
              type="text"
              placeholder={t("shop.search_placeholder")}
              value={searchTerm}
              onChange={handleSearch}
              data-testid="search-input"
            />
            <button className={cx("search-btn")} data-testid="search-btn">
              <FaSearch />
            </button>
          </div>
          <div
            className={cx("filter-container")}
            data-testid="filter-container"
          >
            <button
              className={cx("filter-btn")}
              data-testid="filter-btn"
              onClick={() => setShowFilter(!showFilter)}
            >
              <FaFilter />
            </button>
            {showFilter && (
              <div
                className={cx("filter-dropdown")}
                data-testid="filter-dropdown"
              >
                <div className={cx("filter-header")}>{t("shop.filter")}</div>
                <div className={cx("filter-section")}>
                  <p>{t("shop.price")}</p>
                  <div className={cx("filter-row")}>
                    <label>{t("shop.from")}:</label>
                    <select
                      value={priceRange.from}
                      onChange={(e) => {
                        setPriceRange({
                          ...priceRange,
                          from: Number(e.target.value),
                        });
                        setCurrentPage(1);
                      }}
                    >
                      <option value="0">0 VND</option>
                      <option value="5000000">5,000,000</option>
                      <option value="10000000">10,000,000</option>
                    </select>
                  </div>
                  <div className={cx("filter-row")}>
                    <label>{t("shop.to")}:</label>
                    <select
                      value={priceRange.to}
                      onChange={(e) => {
                        setPriceRange({
                          ...priceRange,
                          to: Number(e.target.value),
                        });
                        setCurrentPage(1);
                      }}
                    >
                      <option value="100000000">{t("shop.unlimited")}</option>
                      <option value="10000000">10,000,000</option>
                      <option value="20000000">20,000,000</option>
                    </select>
                  </div>
                </div>
                <div className={cx("filter-section")}>
                  <p>{t("shop.rating")}</p>
                  <div className={cx("filter-row")}>
                    <label>{t("shop.from")}:</label>
                    <select
                      value={ratingRange.from}
                      onChange={(e) => {
                        setRatingRange({
                          ...ratingRange,
                          from: Number(e.target.value),
                        });
                        setCurrentPage(1);
                      }}
                    >
                      {[0, 1, 2, 3, 4, 5].map((v) => (
                        <option key={v} value={v}>
                          {v} {t("shop.stars")}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={cx("filter-row")}>
                    <label>{t("shop.to")}:</label>
                    <select
                      value={ratingRange.to}
                      onChange={(e) => {
                        setRatingRange({
                          ...ratingRange,
                          to: Number(e.target.value),
                        });
                        setCurrentPage(1);
                      }}
                    >
                      {[5, 4, 3, 2, 1, 0].map((v) => (
                        <option key={v} value={v}>
                          {v} {t("shop.stars")}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={cx("content-area")}>
        <div className={cx("product-list")} data-testid="product-list">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className={`${cx("product-item")} ${commonCx("card")}`}
              data-testid={`product-item-${product.id}`}
              onClick={() => handleDetail(product.id)}
            >
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price.toLocaleString()} VND</p>
              <div className={cx("rating")}>{"⭐".repeat(product.rating)}</div>
            </div>
          ))}
          {currentProducts.length === 0 && (
            <p
              style={{
                textAlign: "center",
                gridColumn: "1 / -1",
                padding: "40px 0",
              }}
            >
              {t("shop.no_products_found")}
            </p>
          )}
        </div>
      </div>
      <div
        className={cx("pagination-wrapper")}
        data-testid="pagination-wrapper"
      >
        <div className={cx("pagination-nav")}>
          <button
            className={cx("nav-btn")}
            data-testid="pagination-prev"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <FaChevronLeft />
          </button>
          <div className={cx("page-number")} data-testid="current-page-display">
            {currentPage}
          </div>
          <button
            className={cx("nav-btn")}
            data-testid="pagination-next"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <FaChevronRight />
          </button>
        </div>
        <div
          className={cx("page-size-selector")}
          data-testid="page-size-selector"
          onClick={() => setShowSizeOptions(!showSizeOptions)}
        >
          <span>{itemsPerPage} / page</span>
          <FaChevronDown className={cx("icon-down")} />
          {showSizeOptions && (
            <ul className={cx("size-dropdown")}>
              {[5, 10, 20, 50].map((size) => (
                <li key={size} onClick={() => handleChangePageSize(size)}>
                  {size} / page
                </li>
              ))}
              <li
                className={cx("custom-input")}
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="text"
                  placeholder="Custom..."
                  value={inputValue}
                  onChange={handleInputSize}
                  onKeyDown={applyCustomSize}
                />
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Shop;
