import { useState, ReactNode } from "react";
import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import Header from "./Header";
import Sidebar from "./Sidebar";

const cx = classNames.bind(styles);

interface DefaultLayoutProps {
  children: ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  const handleToggleSidebar = (): void => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={cx("wrapper")} data-testid="wrapper">
      <header className={cx("header-container")} data-testid="header-container">
        <Header />
      </header>
      <div className={cx("container")} data-testid="container">
        <aside
          className={cx("sidebar-container", { collapsed: isSidebarCollapsed })}
          data-testid="sidebar-container"
        >
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            onToggle={handleToggleSidebar}
          />
        </aside>
        <main className={cx("content", { collapsed: isSidebarCollapsed })}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default DefaultLayout;
