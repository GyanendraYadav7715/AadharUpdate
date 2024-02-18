import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
  HomeFilled,
  HomeOutlined,

} from "@ant-design/icons";
import { FaHistory, FaCloudDownloadAlt } from "react-icons/fa";

import {

  RiTerminalWindowFill,
  RiLogoutBoxRFill,
} from "react-icons/ri";
const MenuList = ({ darkTheme }) => {
  return (
    <Menu
      theme={darkTheme ? "light" : "dark"}
      mode="inline"
      className="menu-bar"
    >
      <Menu.Item key="Dashboard" icon={<HomeFilled />}>
        <Link to="/dashboard" className="Link-style">
          Dashboard
        </Link>
      </Menu.Item>

      <Menu.Item key="token-transfer" icon={<HomeOutlined />}>
        <Link to="/token-transfer" className="Link-style">
          Token Transfer
        </Link>
      </Menu.Item>
      <Menu.Item key="user-limit" icon={<HomeOutlined />}>
        <Link to="" className="Link-style">
          User Limit
        </Link>
      </Menu.Item>
      <Menu.Item key="transfer-history" icon={<FaHistory />}>
        <Link to="/transfer-history" className="Link-style">
          {" "}
          Transfer History
        </Link>
      </Menu.Item>

      {/* Sub Menu Of User Management */}
      <Menu.SubMenu
        key="User"
        icon={<RiTerminalWindowFill />}
        title="User Management"
      >
        <Menu.Item key="add-admin-user" icon={<HomeFilled />}>
          <Link to="/add-admin-user" className="Link-style">
            Add Admin User
          </Link>
        </Menu.Item>

        <Menu.Item key="view-user-list" icon={<HomeOutlined />}>
          <Link to="/view-user-list" className="Link-style">
            {" "}
            View User List
          </Link>
        </Menu.Item>
        <Menu.Item key="view-reatailer-user-list" icon={<HomeOutlined />}>
          <Link to="/view-reatailer-user-list" className="Link-style">
            {" "}
            View Retailer User List
          </Link>
        </Menu.Item>
      </Menu.SubMenu>
      {/* Sub Menu Of Entry Management */}
      <Menu.SubMenu
        key="Entry"
        icon={<RiTerminalWindowFill />}
        title="Entry Management"
      >
        <Menu.Item key="new-user-entry" icon={<HomeFilled />}>
          <Link to="/new-user-entry" className="Link-style">
            New Entry
          </Link>
        </Menu.Item>

        <Menu.Item key="view-user-data" icon={<HomeOutlined />}>
          <Link to="/view-user-data" className="Link-style">
            {" "}
            View Entry Data
          </Link>
        </Menu.Item>
        <Menu.Item key="user-update" icon={<HomeOutlined />}>
          <Link to="/update-user" className="Link-style">
            {" "}
            Update
          </Link>
        </Menu.Item>
      </Menu.SubMenu>

      {/* Sub Menu Of Child Managemet */}

      <Menu.SubMenu
        key="child"
        icon={<RiTerminalWindowFill />}
        title="Child Management"
      >
        <Menu.Item key="enroll-child" icon={<HomeFilled />}>
          <Link to="/enroll-child" className="Link-style">
            Enroll Child
          </Link>
        </Menu.Item>

        <Menu.Item key="view-child-data" icon={<HomeOutlined />}>
          <Link to="/view-child-data" className="Link-style">
            View Child Data
          </Link>
        </Menu.Item>

        <Menu.Item key="view-child-entry" icon={<HomeOutlined />}>
          <Link to="/view-child-entry" className="Link-style">
            View Child Entry
          </Link>
        </Menu.Item>
        <Menu.Item key="enrollment-from" icon={<HomeOutlined />}>
          <Link to="/enrollment-form" className="Link-style">
            Enrollment Form
          </Link>
        </Menu.Item>
      </Menu.SubMenu>

      {/* Sub Menu Of Mobile Managemet */}

      <Menu.SubMenu
        key="Mobile"
        icon={<RiTerminalWindowFill />}
        title="Mobile Management"
      >
        <Menu.Item key="mobile-update" icon={<HomeFilled />}>
          <Link to="/mobile-update" className="Link-style">
            Mobile Update
          </Link>
        </Menu.Item>

        <Menu.Item key="mobile-data" icon={<HomeOutlined />}>
          <Link to="/mobile-data" className="Link-style">
            Mobile Data
          </Link>
        </Menu.Item>

        <Menu.Item key="admin-report" icon={<HomeOutlined />}>
          Admin Report
        </Menu.Item>
      </Menu.SubMenu>

      {/* Sub Menu Of Download  Drivers */}

      <Menu.SubMenu
        key="Download"
        icon={<FaCloudDownloadAlt />}
        title="Download-drivers"
      >
        <Menu.Item key="mantra" icon={<HomeFilled />}>
          Mantra Driver V9.2.0.0
        </Menu.Item>

        <Menu.Item key="mantra-c;ient-service" icon={<HomeOutlined />}>
          Mantra Client Service V9.0.3.8
        </Menu.Item>

        <Menu.Item key="mantra-rd-service" icon={<HomeOutlined />}>
          Mantra RD Service V1.0.4
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.Item key="logout" icon={<RiLogoutBoxRFill />}>
        LogOut
      </Menu.Item>
    </Menu>
  );
};

export default MenuList;
