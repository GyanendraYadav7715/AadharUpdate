import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import "./menubar.css";
import { Layout, Button, theme } from "antd";
import LogIn from "../../../Register/LogIn";
import Forget from "../../../Register/Forget";
import List from "../../../components/Customer-List/List";

// Child Import
import NewEntry from "../../../components/Child/NewEntry/NewEntry";
import ChildEntryList from "../../../components/Child/Entry_List/ChildEntryList";

// Admin Import
import DashBoard from "../../../Users/Admin/DashBoard/DashBoard";
import Balance from "../../../Users/Admin/Balance/Balance";
import History from "../../../Users/Admin/TansferHistory/History";
import AddAdminUser from "../../../Users/Admin/UserManagement/AddAdminUser/AddAdminUser";
import ViewRetailerUserList from "../../../Users/Admin/UserManagement/ViewRetailerUserList/ViewRetailerUserList";
import ViewUser from "../../../Users/Admin/UserManagement/View User List/ViewUser";
import Admin from "../../../Users/Admin/Admin";
import Retailer from "../../../Users/Retailer/Retailer";
import BackOffice from "../../../Users/BackOffice/BackOffice";
import Logo from "../ToggleTheme/Logo";
import MenuList from "./MenuList";
import ToggleThemeButton from "../ToggleTheme/ToggleThemeButton";
import Home from "../../Home/Home";
import PersonEntry from "../../../components/PersonEntry/PersonEntry";
import Breadcrumbs from "../../../components/common/breadcumbs/Breadcrumbs";
import ViewChildData from "../../../components/Child/View_Child_Data/ViewChildData";
import MobileNoUpdate from "../../../Users/Admin/Mobile/Mobile-Update/MobileNoUpdate";
import MobileEntryList from "../../../Users/Admin/Mobile/Mobile-No-Entry/MobileEntryList";
import RightNav from "../../../Users/Admin/HeaderNabar/RightNav/RightNav";

const { Sider } = Layout;

function MenuBar() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);


  const headerClass = `header ${collapsed ? "collapsed" : ""}`;

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className={headerClass}>
      <Sider
        collapsed={collapsed}
        collapsible
        trigger={null}
        theme={darkTheme ? "light" : "dark"}
        className="sidebar"
      >
        <Logo />
        <MenuList darkTheme={darkTheme} />
        <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
      </Sider>
      <Layout>
        {/* Header for Navbar */}
        <Layout.Header
          className={headerClass}
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
          <RightNav />
        </Layout.Header>

        {/* header For Button */}
        <Layout.Header
          className={headerClass}
          style={{ background: colorBgContainer }}
        >
          <Breadcrumbs />
        </Layout.Header>

        <Routes>
          {/* Common Routing */}
          <Route path="/" element={<LogIn />} />
          <Route path="/forget" element={<Forget />} />

          {/* User Routing */}
          <Route path="/home" exact element={<Home />} />
          <Route path="/new-user-entry" element={<PersonEntry />} />
          <Route path="/view-user-data" element={<List />} />
          {/* Child Routing */}
          <Route path="/enroll-child" element={<NewEntry />} />
          <Route path="/view-child-entry" element={<ChildEntryList />} />
          <Route path="/view-child-data" element={<ViewChildData />} />
          {/* Content management admin page routing */}
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/token-transfer" element={<Balance />} />
          <Route path="/transfer-history" element={<History />} />
          <Route path="/add-admin-user" element={<AddAdminUser />} />
          <Route path="/view-user-list" element={<ViewUser />} />
          {/* user decided routeing */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/retailer" element={<Retailer />} />
          <Route path="/backoffice" element={<BackOffice />} />
          <Route
            path="/view-reatailer-user-list"
            element={<ViewRetailerUserList />}
          />

          {/* Mobile Management */}
          <Route path="/mobile-update" element={<MobileNoUpdate />} />
          <Route path="/mobile-data" element={<MobileEntryList />} />
        </Routes>
      </Layout>
    </Layout>
  );
}

export default MenuBar;
