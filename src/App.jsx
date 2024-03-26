import React from "react";
import Protected from "./Route/Protected";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
//    ---------------------------  COMPONENT RENDERING ROUTE-------------------------------

import HeaderNavbar from "./Components/HeaderNabar/HeaderNavbar";
import Asidebar from "./Components/Asidebar/Asidebar";
import Footer from "./Components/Footer/Footer";
//    --------------------------- AUTHENTICATION WORKING  ROUTE-------------------------------

import Login from "./Authentication/Login";
import Forget from "./Authentication/Forget";
//    ---------------------------  ROLE BASE HOME PAGE WORKING  ROUTE-------------------------------

import SuperAdmin from "./Users/SuperAdmin/SuperAdmin";
import Retailer from "./Users/Retailer/Retailer";
import Backoffice from "./Users/BackOffice/Backoffice";
//    --------------------------- ADMIN HAS BALANCE TRANSFER AND MAINTAINING WORKING ROUTE-------------------------------

import Balance from "./Pages/Balance/Balance";
import Userlimit from "./Pages/Userlimit/Userlimit";
import History from "./Pages/TansferHistory/History";
//    --------------------------- ADMIN CREATE USERS AND MANITAINING WORKING  ROUTE-------------------------------

import AddAdminUser from "./Pages/UserManagement/AddAdminUser/AddAdminUser";
import ViewUser from "./Pages/UserManagement/View User List/ViewUser";
import ViewRetailerUserList from "./Pages/UserManagement/ViewRetailerUserList/ViewRetailerUserList";

//    --------------------------- PERSON WORKING  ROUTE-------------------------------

import PersonEntry from "./Pages/EntryManagement/PersonEntry/PersonEntry";
import List from "./Pages/EntryManagement/Person-List/List";
import List2 from "./Pages/EntryManagement/Person-List2/List2";
import SearchEntrydata from "./Pages/EntryManagement/SearchEntrydata";
//    --------------------------- CHILD WORKING ROUTE-------------------------------

import NewEntry from "./Pages/Child/NewEntry/NewEntry";
import ChildEntryList from "./Pages/Child/Entry_List/ChildEntryList";
import ViewChildData from "./Pages/Child/View_Child_Data/ViewChildData";
//    ---------------------------MOBILE WORKING ROUTES-------------------------------

import MobileNoUpdate from "./Pages/Mobile/Mobile-Update/MobileNoUpdate";
 
import AdminReport from "./Pages/Mobile/AdminReport/AdminReport";
import MobileEntryList from "./Pages/Mobile/Mobile-No-Entry/MobileEntryList";

//    --------------------------- BACKOFFICE WORK WITH ADMIN POWER ROUTE-------------------------------

import Edit from "./Components/ActionServices/Edit";
import Finger from "./Components/ActionServices/Finger";
import EditView from "./Components/ActionServices/EditView";
import EditCustomer from "./Pages/EditCustomer/EditCustomer";
import Upload from "./Components/ActionServices/Upload";
import EditViewM from "./Components/ActionServices/EditViewM";

const App = () => {
  return (
    <>
      <Router>
        <Layout />
      </Router>
    </>
  );
};
function Layout() {
  let location = useLocation();

  const hideLayout = ["/", "/forget", "/user-finger", "/Upload"].includes(
    location.pathname
  );

  return (
    <div>
      {!hideLayout && (
        <div>
          <HeaderNavbar />
          <Asidebar />
        </div>
      )}
      <Routes>
        {/* --------------------------- AUTHENTICATION WORKING  ROUTE------------------------------- */}
        <Route path="/" element={<Login />} />
        <Route path="/forget" element={<Forget />} />

        {/* --------------------------------PROTECTED ROUTES ----------------------------------------------- */}
        <Route element={<Protected />}>
          {/* ---------------------------  ROLE BASE HOME PAGE WORKING  ROUTE------------------------------- */}
          <Route path="/superadmin" element={<SuperAdmin />} />
          <Route path="/retailer" element={<Retailer />} />
          <Route path="/backoffice" element={<Backoffice />} />
          {/* --------------------------- ADMIN HAS BALANCE TRANSFER AND MAINTAINING WORKING ROUTE------------------------------- */}
          <Route path="/balance_transfer" element={<Balance />} />
          <Route path="/user_limit" element={<Userlimit />} />
          <Route path="/history" element={<History />} />
          {/* --------------------------- ADMIN CREATE USERS AND MANITAINING WORKING  ROUTE------------------------------- */}

          <Route path="/adduser" element={<AddAdminUser />} />
          <Route path="/viewuser" element={<ViewUser />} />
          <Route
            path="/viewretaileruserlist"
            element={<ViewRetailerUserList />}
          />

          {/* --------------------------- PERSON WORKING  ROUTE------------------------------- */}
          <Route path="/add-customer" element={<PersonEntry />} />
          <Route path="/list" element={<List />} />
          <Route path="/list2" element={<List2 />} />
          <Route path="/searchentrydata" element={<SearchEntrydata />} />
          {/* --------------------------- CHILD WORKING ROUTE------------------------------- */}
          <Route path="/new-entry" element={<NewEntry />} />
          <Route path="/child-entry-list" element={<ChildEntryList />} />
          <Route path="/ViewChildData" element={<ViewChildData />} />
          {/*    ---------------------------MOBILE WORKING ROUTES------------------------------- */}
          <Route path="/mobileupdate" element={<MobileNoUpdate />} />

          <Route path="/adminreport" element={<AdminReport />} />
          <Route path="/mobile-list" element={<MobileEntryList />} />

          {/* --------------------------- BACKOFFICE WORK WITH ADMIN POWER ROUTE------------------------------- */}
          <Route path="/user-edit" element={<Edit />} />
          <Route path="/user-finger" element={<Finger />} />
          <Route path="/edit-view" element={<EditView />} />
          <Route path="/edit-customer" element={<EditCustomer />} />
          <Route path="/Upload" element={<Upload />} />
          <Route path="/edit-viewm" element={<EditViewM />} />
        </Route>
        {/* --------------------------------PROTECTED ROUTES ----------------------------------------------- */}
      </Routes>
      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;
