import { useState, useEffect, ChangeEvent } from "react";
import classNames from "classnames/bind";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";
import styles from "./Profile.module.scss";
import commonStyles from "../styles/common.module.scss";
import avatarImg from "../assets/avatar.png";
import { updateProfile } from "../modules/auth/auth.slice";
import { selectUser } from "../modules/auth/auth.selectors";
import { AppDispatch } from "../store/store";

const cx = classNames.bind(styles);
const commonCx = classNames.bind(commonStyles);

function Profile() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector(selectUser);

  const [gender, setGender] = useState<string>(currentUser?.gender || "male");
  const [day, setDay] = useState<string>(currentUser?.dob?.day || "01");
  const [month, setMonth] = useState<string>(currentUser?.dob?.month || "01");
  const [year, setYear] = useState<string>(currentUser?.dob?.year || "2018");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const days = Array.from({ length: 31 }, (_, i) =>
    String(i + 1).padStart(2, "0"),
  );
  const months = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0"),
  );
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => String(currentYear - i));

  const handleSave = (): void => {
    setIsLoading(true);
    setIsSuccess(false);
    const updatedProfile = { gender, dob: { day, month, year } };
    setTimeout(() => {
      dispatch(updateProfile(updatedProfile));
      setIsLoading(false);
      setIsSuccess(true);
    }, 1000);
  };

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => setIsSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const onValueChange =
    (setter: (val: string) => void) => (e: ChangeEvent<HTMLSelectElement>) => {
      setter(e.target.value);
      if (isSuccess) setIsSuccess(false);
    };

  return (
    <div className={cx("wrapper")} data-testid="wrapper">
      <div className={commonCx("page-header")} data-testid="page-header">
        <h2 className={commonCx("title")}>{t("profile.main_title")}</h2>
      </div>
      <div className={commonCx("card", cx("user-card"))}>
        <div className={cx("avatar-container")}>
          <img src={avatarImg} alt="User Avatar" className={cx("avatar")} />
        </div>
        <div className={cx("user-info")}>
          <h1 className={cx("user-name")}>{currentUser?.name || "MR. USER"}</h1>
          <p className={cx("user-email")}>
            Email: {currentUser?.email || "user@gmail.com"}
          </p>
        </div>
      </div>
      <div className={commonCx("card")}>
        <div className={cx("details")}>
          <div className={cx("detail-item")}>
            <label>{t("profile.dob")}:</label>
            <div className={cx("dob-selectors")}>
              <select value={day} onChange={onValueChange(setDay)}>
                {days.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <select value={month} onChange={onValueChange(setMonth)}>
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <select value={year} onChange={onValueChange(setYear)}>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={cx("detail-item")}>
            <label>{t("profile.sex")}:</label>
            <div className={cx("input-group")}>
              <select value={gender} onChange={onValueChange(setGender)}>
                <option value="male">{t("profile.male")}</option>
                <option value="female">{t("profile.female")}</option>
              </select>
            </div>
          </div>
          <div className={cx("detail-item")}>
            <label>{t("profile.address_company")}:</label>
            <div className={cx("input-group")}>
              <span>
                {currentUser?.companyAddress ||
                  "15, Duy Tan, Dich Vong Hau, Cau Giay, Ha Noi"}
              </span>
            </div>
          </div>
          <div className={cx("detail-item")}>
            <label>{t("profile.address_home")}:</label>
            <div className={cx("input-group")}>
              <span>
                {currentUser?.homeAddress ||
                  "15, Duy Tan, Dich Vong Hau, Cau Giay, Ha Noi"}
              </span>
            </div>
          </div>
        </div>
        <div className={cx("actions-footer")}>
          {isSuccess && (
            <div className={cx("success-message")}>
              <FaCheckCircle />
              {t("profile.save_success")}
            </div>
          )}
          <button
            className={cx("save-btn")}
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <FaSpinner className={cx("spinner")} />
                {t("profile.saving_button")}
              </>
            ) : (
              t("profile.save_button")
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
