import React from 'react'
import HeaderNavbar from "../Components/HeaderNabar/HeaderNavbar";
import Footer from "../Components/Footer/Footer";
import RetailerDashboard from "../Pages/DashBoard/RetailerDashboard"
 
import Asidebar from "../Components/Asidebar/Asidebar";
const RetailerLayout = () => {
  return (
    <>
      <HeaderNavbar/>
      <RetailerDashboard/>
      <Asidebar/>
      <Footer/>
    </>
  )
}

export default RetailerLayout
