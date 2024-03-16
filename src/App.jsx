import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd'; // Import Menu
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined
} from '@ant-design/icons';

import HeaderNavbar from "./Components/HeaderNabar/HeaderNavbar";
import Asidebar from "./Components/Asidebar/Asidebar";
import Footer from "./Components/Footer/Footer";
import Login from "./Authentication/Login";
import Forget from "./Authentication/Forget";
import SuperAdmin from "./Users/SuperAdmin/SuperAdmin";
import Retailer from "./Users/Retailer/Retailer";
import Backoffice from "./Users/BackOffice/Backoffice";

import Balance from "./Pages/Balance/Balance";
import Userlimit from "./Pages/Userlimit/Userlimit"
import History from "./Pages/TansferHistory/History";

import AddAdminUser from "./Pages/UserManagement/AddAdminUser/AddAdminUser";
import ViewUser from "./Pages/UserManagement/View User List/ViewUser";
import ViewRetailerUserList from "./Pages/UserManagement/ViewRetailerUserList/ViewRetailerUserList";
import EditStatus from "./Pages/EditStatus/EditStatus";
import PersonEntry from "./Pages/EntryManagement/PersonEntry/PersonEntry";
import List from "./Pages/EntryManagement/Person-List/List";
import SearchEntrydata from "./Pages/EntryManagement/SearchEntrydata";

import NewEntry from "./Pages/Child/NewEntry/NewEntry";
import ChildEntryList from "./Pages/Child/Entry_List/ChildEntryList";
import ViewChildData from "./Pages/Child/View_Child_Data/ViewChildData";

import MobileNoUpdate from "./Pages/Mobile/Mobile-Update/MobileNoUpdate";
import MobileData from "./Pages/Mobile/MobileData/MobileData";
import AdminReport from "./Pages/Mobile/AdminReport/AdminReport";
import Protected from "./Route/Protected";

import Edit from "./ActionServices/Edit"
import Finger from "./ActionServices/Finger"
import EditView from "./ActionServices/EditView"
import Upload from "./ActionServices/Upload"

const { Header, Sider, Content } = Layout;

const App = () => {
  return (
    <Router>
      <Layout>
        <AppLayout />
      </Layout>
    </Router>
  );
};

const AppLayout = () => {
  let location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  // const hideLayout = ["/", "/forget", "/user-finger", "/akUpload"].includes(location.pathname);

  return (
    <div>
 
        <Header className="header">
          <Button
            className="trigger"
            type="text"
            onClick={toggle}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          />
          <HeaderNavbar />
        </Header>
      
      <Layout className="site-layout">
      
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<UserOutlined />}>
                <Link to="/">nav 1</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                <Link to="/superadmin">nav 2</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<UploadOutlined />}>
                <Link to="/retailer">nav 3</Link>
              </Menu.Item>
              <Menu.SubMenu key="sub1" icon={<UploadOutlined />} title="User Management"> {/* Use Menu.SubMenu */}
                <Menu.Item key="4">
                  <Link to="/adduser">Add Admin User</Link>
                </Menu.Item>
                <Menu.Item key="5">
                  <Link to="/viewuser">View User List</Link>
                </Menu.Item>
                <Menu.Item key="6">
                  <Link to="/viewretaileruserlist">View Retailer User List</Link>
                </Menu.Item>
              </Menu.SubMenu>
            </Menu>
          </Sider>
      
        <Layout>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/forget" element={<Forget />} />
              <Route element={<Protected />}>
                <Route path="/superadmin" element={<SuperAdmin />} />
                <Route path="/retailer" element={<Retailer />} />
                <Route path="/backoffice" element={<Backoffice />} />
                <Route path="/balance_transfer" element={<Balance />} />
                <Route path="/user_limit" element={<Userlimit />} />
                <Route path="/history" element={<History />} />
                <Route path="/adduser" element={<AddAdminUser />} />
                <Route path="/viewuser" element={<ViewUser />} />
                <Route path="/viewretaileruserlist" element={<ViewRetailerUserList />} />
                <Route path="/editstatus" element={<EditStatus />} />
                <Route path="/add-customer" element={<PersonEntry />} />
                <Route path="/list" element={<List />} />
                <Route path="/searchentrydata" element={<SearchEntrydata />} />
                <Route path="/new-entry" element={<NewEntry />} />
                <Route path="/child-entry-list" element={<ChildEntryList />} />
                <Route path="/ViewChildData" element={<ViewChildData />} />
                <Route path="/mobileupdate" element={<MobileNoUpdate />} />
                <Route path="/mobiledata" element={<MobileData />} />
                <Route path="/adminreport" element={<AdminReport />} />
                <Route path="/user-edit" element={<Edit />} />
                <Route path="/user-finger" element={<Finger />} />
                <Route path="/edit-view" element={<EditView />} />
                <Route path="/akUpload" element={<Upload />} />
              </Route>
            
            </Routes>
          </Content>
        </Layout>
      </Layout>
  
    </div>
  );
};

export default App;
