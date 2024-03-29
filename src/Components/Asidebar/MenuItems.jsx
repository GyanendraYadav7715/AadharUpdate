import React, { useMemo } from "react";
import { Link } from "react-router-dom";
 
const MenuItems = () => {
  const adminMenuItems = [
    {
      link: "/superadmin",
      iconClass: "ri-layout-grid-fill",
      label: "Dashboard",
    },
    {
      link: "/balance_transfer",
      iconClass: "ri-exchange-dollar-fill",
      label: "Token Transfer",
    },
    {
      link: "/user_limit",
      iconClass: "ri-hourglass-2-fill",
      label: "User Limit",
    },
    {
      link: "/history",
      iconClass: "ri-history-fill",
      label: "Transfer History",
    },
  ];

  const retailerMenuItems = [
    {
      link: "/retailer",
      iconClass: "ri-layout-grid-fill",
      label: "Dashboard",
    },
  ];
   const backofficeMenuItems = [
     {
       link: "/backoffice",
       iconClass: "ri-layout-grid-fill",
       label: "Dashboard",
     },
   ];
  


  const memoizedRole = useMemo(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const userObj = JSON.parse(userData);
      return userObj.User_type;
    }
    return "";
  }, []);

  const menuItems =
    memoizedRole === "Superadmin"
      ? adminMenuItems
      : memoizedRole === "Retailer"
      ? retailerMenuItems
      : backofficeMenuItems;

  return (
    <>
      {/* Single menus are here */}
      <ul className="space-y-2 font-medium text-base px-2">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link
              to={`${item.link}`}
              className="flex items-center p-2 text-black rounded-lg hover:bg-gray-200  no-underline hover:text-black"
            >
              <i
                className={`${item.iconClass} w-5 h-5 text-black hover:text-white `}
              ></i>
              <span className="ms-3">{item.label}</span>
            </Link>
          
          </li>
        ))}
      </ul>
    </>
  );
};

export default MenuItems;
