import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Login.module.scss";
import logo from "../assets/logo.png";
import {
  AiOutlineUser,
  AiOutlineLock,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { login } from "../modules/auth/auth.slice";
import {
  selectIsLoggedIn,
  selectAuthError,
  selectAuthLoading,
} from "../modules/auth/auth.selectors";
import { AppDispatch } from "../store/store";

const cx = classNames.bind(styles);

interface LoginErrors {
  email?: string | null;
  password?: string | null;
}

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<LoginErrors>({});

  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const isAuthenticated = useSelector(selectIsLoggedIn);
  const authError = useSelector(selectAuthError);
  const isLoading = useSelector(selectAuthLoading);

  const from = location.state?.from?.pathname || "/shop";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const validate = (): LoginErrors => {
    const newErrors: LoginErrors = {};
    if (!email) newErrors.email = t("login.error_required");
    if (!password) newErrors.password = t("login.error_required");
    return newErrors;
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    dispatch(login({ email, password }));
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
  };

  return (
    <div className={cx("wrapper")} data-testid="wrapper">
      <div className={cx("login-box")} data-testid="login-box">
        <div className={cx("logo-container")} data-testid="logo-container">
          <img src={logo} alt="Logo" className={cx("logo")} />
        </div>
        {authError && (
          <div className={cx("auth-error")} data-testid="auth-error">
            {authError}
          </div>
        )}
        <form className={cx("form")} onSubmit={handleLogin} noValidate>
          <div className={cx("input-group")} data-testid="input-group-email">
            <AiOutlineUser className={cx("icon")} />
            <input
              type="email"
              placeholder={t("login.username_placeholder")}
              value={email}
              onChange={handleEmailChange}
              className={cx({ "input-error": errors.email })}
              disabled={isLoading}
              required
            />
            {errors.email && (
              <span className={cx("error-message")} data-testid="email-error">
                {errors.email}
              </span>
            )}
          </div>
          <div className={cx("input-group")} data-testid="input-group-password">
            <AiOutlineLock className={cx("icon")} />
            <input
              type="password"
              placeholder={t("login.password_placeholder")}
              value={password}
              onChange={handlePasswordChange}
              className={cx({ "input-error": errors.password })}
              disabled={isLoading}
              required
            />
            <AiOutlineEyeInvisible className={cx("icon-eye")} />
            {errors.password && (
              <span
                className={cx("error-message")}
                data-testid="password-error"
              >
                {errors.password}
              </span>
            )}
          </div>
          <div className={cx("options")} data-testid="options">
            <label className={cx("checkbox-label")}>
              <input type="checkbox" /> {t("login.remember_me")}
            </label>
            <a href="#forgot" className={cx("forgot")}>
              {t("login.forgot_password")}
            </a>
          </div>
          <button
            type="submit"
            className={cx("login-btn")}
            disabled={isLoading}
          >
            {isLoading ? t("login.logging_in") : t("login.login_button")}
          </button>
        </form>
        <div className={cx("footer-text")} data-testid="footer-text">
          <p>{t("login.footer_contact")}</p>
          <p>{t("login.footer_copyright")}</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
