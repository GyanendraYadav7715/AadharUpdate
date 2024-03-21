import React from "react";
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
import List2 from "./Pages/EntryManagement/Person-List2/List2";
import SearchEntrydata from "./Pages/EntryManagement/SearchEntrydata";


import NewEntry from "./Pages/Child/NewEntry/NewEntry";
import ChildEntryList from "./Pages/Child/Entry_List/ChildEntryList";
import ViewChildData from "./Pages/Child/View_Child_Data/ViewChildData";

import MobileNoUpdate from "./Pages/Mobile/Mobile-Update/MobileNoUpdate";
import MobileData from "./Pages/Mobile/MobileData/MobileData";
import AdminReport from "./Pages/Mobile/AdminReport/AdminReport";
import MobileEntryList from "./Pages/Mobile/Mobile-No-Entry/MobileEntryList"
import Protected from "./Route/Protected";

import Edit from "./ActionServices/Edit"
import Finger from "./ActionServices/Finger"
import EditView from "./ActionServices/EditView"
import Upload from "./ActionServices/Upload"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
 


// I am Here To Learn About Git 
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

  // Check if the current location is one of the pages where we want to hide the layout components
  const hideLayout = ["/", "/forget", "/user-finger", "/akUpload"].includes(
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
          <Route
            path="/viewretaileruserlist"
            element={<ViewRetailerUserList />}
          />
          <Route path="/editstatus" element={<EditStatus />} />

          <Route path="/add-customer" element={<PersonEntry />} />
          <Route path="/list" element={<List />} />
          <Route path="/list2" element={<List2 />} />
          <Route path="/searchentrydata" element={<SearchEntrydata />} />

          <Route path="/new-entry" element={<NewEntry />} />
          <Route path="/child-entry-list" element={<ChildEntryList />} />
          <Route path="/ViewChildData" element={<ViewChildData />} />

          <Route path="/mobileupdate" element={<MobileNoUpdate />} />
          <Route path="/mobiledata" element={<MobileData />} />
          <Route path="/adminreport" element={<AdminReport />} />
          <Route path="/mobile-list" element={<MobileEntryList />} />
          <Route path="/user-edit" element={<Edit />} />
          <Route path="/user-finger" element={<Finger />} />
          <Route path="/edit-view" element={<EditView />} />
          <Route path="/akUpload" element={<Upload />} />
        </Route>
      </Routes>
      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;
