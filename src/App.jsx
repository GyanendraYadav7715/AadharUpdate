import React from "react";
import Login from "./Authentication/Login";
import Forget from "./Authentication/Forget";
import SuperAdmin from "./Users/SuperAdmin/SuperAdmin";
import Retailer from "./Users/Retailer/Retailer";

import Balance from "./Pages/Balance/Balance";
import History from "./Pages/TansferHistory/History";

import AddAdminUser from "./Pages/UserManagement/AddAdminUser/AddAdminUser";
import ViewUser from "./Pages/UserManagement/View User List/ViewUser";
import ViewRetailerUserList from "./Pages/UserManagement/ViewRetailerUserList/ViewRetailerUserList";

import PersonEntry from "./Pages/EntryManagement/PersonEntry/PersonEntry";
// import List from "./Pages/EntryManagement/Person-List/List";

import NewEntry from "./Pages/Child/NewEntry/NewEntry";
//import ChildEntryList from "./Pages/Child/Entry_List/ChildEntryList";
import MobileNoUpdate from "./Pages/Mobile/Mobile-Update/MobileNoUpdate";
//import MobileData from "./Pages/MobileManagement/MobileData/MobileData";
//import AdminReport from "./Pages/MobileManagement/AdminReport/AdminReport";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/superadmin" element={<SuperAdmin />} />
          <Route path="/retailer" element={<Retailer />} />

          <Route path="/balance" element={<Balance />} />
          <Route path="/history" element={<History />} />

          <Route path="/adduser" element={<AddAdminUser />} />
          <Route path="/viewuser" element={<ViewUser />} />
          <Route
            path="/viewretaileruserlist"
            element={<ViewRetailerUserList />}
          />

          <Route path="/add-customer" element={<PersonEntry />} />
          {/* <Route path="/list" element={<List />} /> */}

          <Route path="/new-entry" element={<NewEntry />} />
          {/* <Route path="/child-entry-list" element={<ChildEntryList />} /> */}

          <Route path="/mobileupdate" element={<MobileNoUpdate />} />
          {/* <Route path="/" element={<ViewUser />} /> */}
        </Routes>
      </Router>
    </>
  );
};

export default App;
