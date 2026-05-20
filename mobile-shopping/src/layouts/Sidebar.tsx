import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { FaBars } from "react-icons/fa";
import styles from "./Sidebar.module.scss";
import shopIcon from "../assets/shop.png";
import cartIcon from "../assets/cart.png";
import profileIcon from "../assets/profile.png";
import { RootState } from "../store/store";

const cx = classNames.bind(styles);

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

interface MenuItem {
  title: string;
  icon: string;
  path: string;
  count?: number;
}

function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const cartItems = useSelector((state: RootState) => state.cart?.items || []);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const MENU_ITEMS: MenuItem[] = [
    { title: t("sidebar.shop"), icon: shopIcon, path: "/shop" },
    {
      title: t("sidebar.cart"),
      icon: cartIcon,
      path: "/cart",
      count: cartCount,
    },
    { title: t("sidebar.profile"), icon: profileIcon, path: "/profile" },
  ];

  return (
    <aside className={cx("wrapper", { collapsed: isCollapsed })}>
      <div className={cx("sidebar-header")} data-testid="sidebar-header">
        {!isCollapsed && (
          <span className={cx("header-title")}>{t("sidebar.menu")}</span>
        )}
        <div className={cx("toggle-btn")} onClick={onToggle}>
          <FaBars />
        </div>
      </div>
      <div className={cx("menu-list")}>
        {MENU_ITEMS.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={index}
              className={cx("menu-item", { active: isActive })}
              onClick={() => navigate(item.path)}
              title={isCollapsed ? item.title : ""}
            >
              <img src={item.icon} alt={item.title} className={cx("icon")} />
              {!isCollapsed && (
                <>
                  <span className={cx("title")}>{item.title}</span>
                  {item.count !== undefined && item.count > 0 && (
                    <span className={cx("badge")}>{item.count}</span>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}

export default Sidebar;
