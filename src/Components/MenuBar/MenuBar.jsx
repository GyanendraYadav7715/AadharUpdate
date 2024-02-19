import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Layout, Button, theme } from "antd";
import "./menubar.css"; // Make sure to import your CSS file

// Import other necessary components
import Balance from "../../Pages/Balance/Balance";
import MenuList from "./MenuList";

const { Sider } = Layout;

function MenuBar() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  // Ensure that all necessary components are imported correctly

  return (
    <Layout className={`header ${collapsed ? "collapsed" : ""}`}>
      <Sider
        collapsed={collapsed}
        collapsible
        trigger={null}
        theme={darkTheme ? "light" : "dark"}
        className="sidebar"
      >
        <MenuList/>
      </Sider>
      <Layout>
        <Layout.Header
          className={`header ${collapsed ? "collapsed" : ""}`}
          style={{
            backgroundColor: "#7857fa",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            className="Hamburger"
            type="text"
            icon={collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
          {/* Include RightNav component here */}
        </Layout.Header>
        <Layout.Header
          className={`header ${collapsed ? "collapsed" : ""}`}
          style={{ background: theme.useToken().token.colorBgContainer }}
        >
          {/* Include Breadcrumbs component here */}
        </Layout.Header>
        <Routes>
          <Route path="" element={<Balance />} />
          {/* Define other routes as needed */}
        </Routes>
      </Layout>
    </Layout>
  );
}

export default MenuBar;
