import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { Local_Url } from "../../../constant/constant";
import CopyButton from "../../../Components/DownloadAction/CopyButton";
import ExcelButton from "../../../Components/DownloadAction/ExcelButton";
import CSVButton from "../../../Components/DownloadAction/CSVButton";
import PDFButton from "../../../Components/DownloadAction/PDFButton";
import SearchElement from "../../../Components/SearchElement/SearchElement";
import Breadcrumb from "../../../Components/BreadCrumb/Breadcrumb";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StyledAlert from "../../../Components/ConfirmationDialog/StyledAlert";

const ViewUser = () => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [users, setUsers] = useState([]);
  const tableRef = useRef(null);
  const [userToDelete, setUserToDelete] = useState(null); // Track user to delete

  // Fetch data from API
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${Local_Url}/api/v1/admin/all-customers`
      );
      console.log(response.data.data);
      setUsers(response.data.data);
      setFilteredUsers(response.data.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = users.filter((user) =>
      Object.values(user).join(" ").toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  // Set user to delete
  const confirmDeleteUser = (user) => {
    setUserToDelete(user);
  };

  // Delete user
  const deleteUser = async () => {
    try {
      await axios.delete(`${Local_Url}/api/v1/admin/delete-customer`, {
        params: { username: userToDelete.Username },
      });

      const updatedUsers = users.filter(
        (user) => user.Username !== userToDelete.Username
      );
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      setUserToDelete(null); // Clear userToDelete state
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle icon click to expand/collapse row details
  const handleIconClick = (index) => {
    setSelectedRow(selectedRow === index ? null : index);
  };

  return (
    <>
      <Breadcrumb
        title="View User Data"
        links={[
          { title: "Home", href: "/superadmin" },
          { title: "View User Data", href: "" },
        ]}
        mylinks={[
          {
            to: "/adduser",
            text: "Create New",
            icon: "ri-add-line text-white text-2xl",
          },
        ]}
      />
      <div className="p-4 sm:ml-64  ">
        <div className="p-4 border-2 border-gray-200 border-solid rounded-lg bg-white ">
          <h3 className="text-2xl font-semibold">View User Data-ADMIN</h3>
          <div className="flex items-center justify-between mb-4 mt-4 px-8">
            <div>
              <CopyButton data={users} />
              <ExcelButton data={users} filename={"ViewUser.xlsx"} />
              <CSVButton data={users} filename={"ViewUser.csv"} />
              <PDFButton tableRef={tableRef} filename={"ViewUser.pdf"} />
            </div>
            <SearchElement onSearch={handleSearch} />
          </div>

          <Table striped bordered hover className="custom-table" ref={tableRef}>
            <thead>
              <tr>
                <th>S.N.</th>
                <th>Name</th>
                <th> Mobile Number</th>
                <th>User Name</th>
                <th> Password</th>
                <th> Created At</th>
                <th> Balance</th>
                <th> Child Point</th>
                <th> Mobile Point</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <React.Fragment key={`item_${index}`}>
                    <tr>
                      <td>
                        <div
                          className="DropDown"
                          onClick={() => handleIconClick(index)}
                        >
                          <i
                            className={
                              selectedRow === index
                                ? "ri-close-fill"
                                : "ri-add-fill"
                            }
                            style={{
                              backgroundColor:
                                selectedRow === index ? "red" : "blue",
                            }}
                          ></i>
                        </div>
                        {index + 1}
                      </td>
                      <td>{user.Name}</td>
                      <td>{user.Phone_n}</td>
                      <td>{user.Username}</td>
                      <td>{user.Password}</td>
                      <td>{user.createdAt}</td>
                      <td>{user.Balance}</td>
                      <td>{user.Child_token}</td>
                      <td>0</td>
                    </tr>
                    {selectedRow === index && (
                      <tr key={`details_${index}`}>
                        <td colSpan="9" style={{ backgroundColor: "white" }}>
                          <div className="dropdown-content">
                            <div className="dropdown-title">
                              <h3 className="status border-b-2  flex items-center  gap-3 ">
                                <span className="font-bold text-lg ">Role</span>
                                <span
                                  className={`bg-indigo-500 text-white  border-1 px-2 py-1  rounded-sm ml-6 `}
                                  style={{ fontsize: "15px" }}
                                >
                                  {user.User_type}
                                </span>
                              </h3>

                              {/* Status Handler in the Dropdown */}
                              <h3 className="status border-b-2  flex items-center  gap-3 ">
                                <span className="font-bold text-lg ">
                                  Status
                                </span>
                                <span
                                  className={`text-white ${
                                    user.isUserblocked === true
                                      ? "bg-[#f4516c] hover:bg-[#cb4c61]"
                                      : "bg-[#71b944] hover:bg-[#67a83e]"
                                  }   border-1 px-2 py-1  rounded-sm  ml-3`}
                                  style={{ fontsize: "15px" }}
                                >
                                  {user.isUserblocked === true
                                    ? "Inactive"
                                    : "Active"}
                                </span>
                              </h3>

                              {/* Action management in the dropdown */}
                              <h3 className="status font-bold text-lg flex justify-center items-center  border-b-2 ">
                                Action
                                <div className="px-6 gap-2 flex users-center justify-between">
                                  <button
                                    className="font-medium  no-underline  border-1 hover:bg-[#77b652] border-1 bg-[#88d05e] px-3 py-2 rounded-sm"
                                    onClick={() => resetUser(user.Username)}
                                  >
                                    <i className="ri-refresh-line text-white"></i>
                                  </button>
                                  <button
                                    onClick={() => confirmDeleteUser(user)}
                                    className="font-medium  no-underline   hover:bg-[#d45469] border-1 bg-[#f5627a] px-3 py-2 rounded-sm"
                                  >
                                    <i className="ri-delete-bin-line text-white"></i>
                                  </button>
                                </div>
                              </h3>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr key="no_records">
                  <td colSpan="11">
                    <h1 className="list-record text-center text-3xl">
                      Record Not Found😞
                    </h1>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
      {/* Render StyledAlert for confirming deletion */}
      {userToDelete && (
        <StyledAlert
          title="Confirmation"
          message="Are you sure want to delete this user?"
          onConfirm={deleteUser}
          onClose={() => setUserToDelete(null)} // Clear userToDelete state if cancel or close
        />
      )}
    </>
  );
};

export default ViewUser;
