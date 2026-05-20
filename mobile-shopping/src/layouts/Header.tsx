import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Header.module.scss";
import logo from "../assets/logo.png";
import avatar from "../assets/avatar.png";
import { logout } from "../modules/auth/auth.slice";
import { selectIsLoggedIn } from "../modules/auth/auth.selectors";
import { AppDispatch } from "../store/store";

const cx = classNames.bind(styles);

function Header() {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [isChanging, setIsChanging] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [wasLoggedIn, setWasLoggedIn] = useState<boolean>(isLoggedIn);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isEnglish = i18n.language === "en";

  useEffect(() => {
    if (wasLoggedIn && !isLoggedIn) {
      navigate("/login");
    }
    if (isLoggedIn) {
      setWasLoggedIn(true);
    }
  }, [isLoggedIn, navigate, wasLoggedIn]);

  const toggleLanguage = (): void => {
    setIsChanging(true);
    setTimeout(() => {
      const newLang = i18n.language === "vi" ? "en" : "vi";
      i18n.changeLanguage(newLang);
      localStorage.setItem("language", newLang);
      setIsChanging(false);
    }, 600);
  };

  const handleLogout = (): void => {
    dispatch(logout());
    setShowDropdown(false);
  };

  const handleGoToProfile = (): void => {
    setShowDropdown(false);
    navigate("/profile");
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <>
      {isChanging && (
        <div className={cx("loading-overlay")} data-testid="loading-overlay">
          <div className={cx("spinner")} data-testid="spinner"></div>
          <p className={cx("loading-text")}>
            {isEnglish ? "Đang đổi ngôn ngữ..." : "Switching language..."}
          </p>
        </div>
      )}
      <header className={cx("wrapper")} data-testid="wrapper">
        <div className={cx("logo")} onClick={() => navigate("/shop")}>
          <img src={logo} alt="logo" />
          <span>Mobile Shopping</span>
        </div>
        <div className={cx("actions")} data-testid="actions">
          <div className={cx("language-switch")}>
            <span className={cx("label", { active: !isEnglish })}>VI</span>
            <label className={cx("switch")}>
              <input
                type="checkbox"
                checked={isEnglish}
                onChange={toggleLanguage}
                disabled={isChanging}
              />
              <span className={cx("slider")}></span>
            </label>
            <span className={cx("label", { active: isEnglish })}>EN</span>
          </div>
          <div className={cx("user")} ref={dropdownRef}>
            <img
              src={avatar}
              alt="avatar"
              onClick={() => setShowDropdown((prev) => !prev)}
            />
            {showDropdown && (
              <div className={cx("dropdown-menu")} data-testid="user-dropdown">
                <div
                  className={cx("dropdown-item")}
                  onClick={handleGoToProfile}
                >
                  {t("header.my_profile")}
                </div>
                <div className={cx("dropdown-item")} onClick={handleLogout}>
                  {t("header.logout")}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
