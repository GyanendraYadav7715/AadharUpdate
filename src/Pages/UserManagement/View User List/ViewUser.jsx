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
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationDialog from "../../../Components/ConfirmationDialog/ConfirmationDialog";

const ViewUser = () => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
   const [selectedRow, setSelectedRow] = useState(null);
  const [users, setUsers] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${Local_Url}/api/v1/admin/all-customers`
      );
      setUsers(response.data.data);
      setFilteredUsers(response.data.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = users.filter((user) =>
      Object.values(user).join(" ").toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const deleteUser = async (deluser) => {
    toast.info(
      <ConfirmationDialog
        message="Are you sure you want to delete this user?"
        onConfirm={async () => {
          try {
            await axios.delete(`${Local_Url}/api/v1/admin/delete-customer`, {
              params: { username: deluser },
            });

            const updatedUsers = users.filter(
              (user) => user.Username !== deluser
            );

            setUsers(updatedUsers);
            setFilteredUsers(updatedUsers);
          } catch (error) {
            toast.error(error.message);
          }
        }}
        onDismiss={() => toast.dismiss()}
      />,
      {
        autoClose: false, // Prevent auto-closing of toast until confirmation
      }
    );
  };
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
                  <React.Fragment key={user.id}>
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
                      <tr>
                        <td colSpan="6" style={{ backgroundColor: "white" }}>
                          <div className="dropdown-content">
                            <div className="dropdown-title">
                              <h3 className="status">
                                Status
                                <span
                                  style={{
                                    color: "blue",
                                    fontSize: "15px",
                                  }}
                                >
                                  {user.isUserblocked ? "Inactive" : "Active"}
                                </span>
                              </h3>
                              <h3 className="status">Action</h3>
                              <div className="px-6 py-4 gap-2 flex users-center justify-between">
                                <Link className="font-medium text-blue-600 no-underline hover:underline border-1 bg-green-600 px-3 py-3 rounded-md">
                                  <i className="ri-refresh-line text-white"></i>
                                </Link>
                                <button
                                  onClick={() => deleteUser(user.Username)}
                                  className="font-medium text-blue-600 no-underline hover:underline border-1 bg-red-600 hover:bg-red-800 hover: px-3 py-3 rounded-md"
                                >
                                  <i className="ri-delete-bin-line text-white"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
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
    </>
  );
};

export default ViewUser;
