import React from "react";
import HeaderNavbar from "../Components/HeaderNabar/HeaderNavbar";
import Footer from "../Components/Footer/Footer";
import DashBoard from "../Pages/DashBoard/DashBoard";
import Breadcrumb from "../Components/BreadCrumb/Breadcrumb";
import Asidebar from "../Components/Asidebar/Asidebar";

const Layout = () => {
  
  return (
    <>
      <HeaderNavbar />
      <Asidebar />
     
      <DashBoard />
      <Footer />
    </>
  );
};

export default Layout;
