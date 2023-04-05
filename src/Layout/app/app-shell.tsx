import { Breadcrumb, Drawer, Layout, Menu, MenuProps } from "antd";
import React, { useEffect, useState } from "react";
import { FaUsersCog } from "react-icons/fa";
import {
  MdOutlinePointOfSale,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import Navbar from "components/navbar";
import "./AppShell.scss";
import { Link } from "react-router-dom";

import { ConfigProvider, theme } from "antd";
import { useTheme } from "hooks/shared/theme.hook";
import { AppModalProvider } from "context/app-modal.context";
const { defaultAlgorithm, darkAlgorithm } = theme;

const { Sider, Content, Footer } = Layout;

const items2: MenuProps["items"] = [
  {
    label: (
      <Link to="/admin/categories" style={{ padding: 0 }}>
        Categories
      </Link>
    ),
    key: "categories",
    icon: <BiCategoryAlt size={21} color="#f77908" />,
  },
  {
    label: (
      <Link to="/admin/reviews" style={{ padding: 0 }}>
        Reviews
      </Link>
    ),
    key: "reviews",
    icon: <BiCategoryAlt size={21} color="#f77908" />,
  },
  {
    label: (
      <Link to="/admin/sub-categories" style={{ padding: 0 }}>
        Sub Categories
      </Link>
    ),
    key: "sub-categories",
    icon: <BiCategoryAlt size={21} color="#f77908" />,
  },
  {
    label: (
      <Link to="/admin/products" style={{ padding: 0 }}>
        Products
      </Link>
    ),
    key: "products",
    icon: <MdOutlineProductionQuantityLimits size={21} color="#f77908" />,
  },
  {
    label: (
      <Link to="/admin/orders" style={{ padding: 0 }}>
        Orders
      </Link>
    ),
    key: "orders",
    icon: <MdOutlinePointOfSale size={21} color="#f77908" />,
  },
  {
    label: (
      <Link to="/admin/users" style={{ padding: 0 }}>
        Users
      </Link>
    ),
    key: "users",
    icon: <FaUsersCog size={21} color="#f77908" />,
  }, // remember to pass the key prop
  {
    label: (
      <Link to="/admin/reviews" style={{ padding: 0 }}>
        Reviews
      </Link>
    ),
    key: "reviews",
    icon: <FaUsersCog size={21} color="#f77908" />,
  }, // remember to pass the key prop
  {
    label: (
      <Link to="/admin/payments" style={{ padding: 0 }}>
        Payments
      </Link>
    ),
    key: "payments",
    icon: <FaUsersCog size={21} color="#f77908" />,
  }, // remember to pass the key prop
];
interface IProps {
  children: any;
}
const AppShell: React.FC<IProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [show, setShow] = useState(false);
  const { isDarkMode } = useTheme();

  const handleShow = () => {
    setShow(true);
  };

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };
  const onClose = () => {
    setShow(false);
  };

  useEffect(() => {}, []);
  return (
    <AppModalProvider>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
          token: {},
        }}
      >
        <Layout className="app-shell-layout">
          <Navbar showMenuIcon handleShow={handleShow} />
          <Layout>
            <Sider
              width={200}
              className={`site-layout-background ${
                show ? "app-shell-sidebar_show" : "app-shell-sidebar_hide"
              }`}
              collapsible
              collapsed={collapsed}
              onCollapse={handleCollapse}
            >
              <Menu
                mode="inline"
                style={{ height: "100vh", borderRight: 0 }}
                items={items2}
              />
            </Sider>
            <Drawer
              title="HoneyMan"
              placement="left"
              closable={true}
              onClose={onClose}
              open={show}
              width={200}
            >
              <Sider
                width={200}
                className={`site-layout-background ${
                  show ? "app-shell-sidebar_show" : "app-shell-sidebar_hide"
                }`}
              >
                <Menu
                  mode="inline"
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={["sub1"]}
                  style={{ height: "100%", borderRight: 0 }}
                  items={items2}
                />
              </Sider>
            </Drawer>

            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 400,
              }}
            >
              {children}
            </Content>
          </Layout>
          {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
        </Layout>
      </ConfigProvider>
    </AppModalProvider>
  );
};

export default AppShell;
