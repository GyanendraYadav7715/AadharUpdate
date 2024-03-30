import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Local_Url } from "../../../constant/constant";
import "./EntryList.css";
import CopyButton from "../../../Components/DownloadAction/CopyButton";
import PDFButton from "../../../Components/DownloadAction/PDFButton";
import ExcelButton from "../../../Components/DownloadAction/ExcelButton";
import CSVButton from "../../../Components/DownloadAction/CSVButton";
import Breadcrumb from "../../../Components/BreadCrumb/Breadcrumb";
import SearchElement from "../../../Components/SearchElement/SearchElement";
import StyledAlert from "../../../Components/ConfirmationDialog/StyledAlert";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ChildEntryList() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const tableRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [userToDelete, setUserToDelete] = useState(null); // Track user to delete
  const userData = JSON.parse(localStorage.getItem("user"));
  const role = userData.User_type;
  const userName = userData.Username;

  const title = "View Child Entry";
  const links =
    role === "Superadmin"
      ? [{ title: "Home", href: "/superadmin" }, { title: "View Child Data" }]
      : [{ title: "Home", href: "/backoffice" }, { title: "View Child Data" }];
  const mylinks = [
    {
      to: "/new-entry",
      text: "Create New",
      icon: "ri-add-line text-white text-2xl",
    },
  ];

  const fetchData = async () => {
    const apiUrl = `${Local_Url}/api/v1/admin/cAllAdminData`;
    axios
      .get(apiUrl, { params: { userName: userName } })
      .then((response) => {
        setData(response.data.data);
        setFilteredProducts(response.data.data);
      })
      .catch((err) => {
        console.log("Something Went Wrong");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  // Set user to delete
  const confirmDeleteUser = (item) => {
    setUserToDelete(item);
  };

  // Delete user
  const deleteUser = async () => {
    try {
      const { appliedBy, timeStamp } = userToDelete;

       const response = await axios.delete(
         `${Local_Url}/api/v1/admin/deleteRUser`,
         {
           data: { appliedBy: appliedBy, timestamp: timeStamp, entryType: "C" },
         }
       );

      const updatedData = data.filter(
        (user) => user.appliedBy !== appliedBy || user.timeStamp !== timeStamp
      );
      setData(updatedData);
      setFilteredProducts(updatedData);
      setUserToDelete(null); // Clear userToDelete state
     toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleIconClick = (index) => {
    setSelectedRow(selectedRow === index ? null : index);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = data.filter((product) =>
      Object.values(product)
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <>
      <Breadcrumb title={title} links={links} mylinks={mylinks} />
      <div className="p-2 sm:ml-64">
        <div className="p-2 border-2 border-gray-200 border-solid rounded-lg">
          <div className="Download-Button flex items-center justify-between">
            <div>
              <CopyButton data={data} />
              <ExcelButton data={data} filename={"ChildEntryList.xlsx"} />
              <CSVButton data={data} filename={"ChildEntryList.csv"} />
              <PDFButton tableRef={tableRef} filename={"ChildEntryList.pdf"} />
            </div>
            <SearchElement onSearch={handleSearch} />
          </div>
          <Table striped bordered hover className="custom-table" ref={tableRef}>
            <thead>
              <tr>
                <th>S.NO.</th>
                <th>Applied By</th>
                <th>Aadhaar Card Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item, index) => (
                  <React.Fragment key={item._id}>
                    <tr>
                      <td>
                        <div
                          className="DropDown"
                          onClick={() => handleIconClick(index)}
                        >
                          <i
                            className={
                              selectedRow === index
                                ? "ri-close-fill child"
                                : "ri-add-fill child"
                            }
                          ></i>
                          {index + 1}
                        </div>
                      </td>
                      <td>{item.appliedBy}</td>
                      <td>
                        <div className="text-left">
                          <span className="span">Name: {item.Name}</span>
                          <br />
                          <span className="span">
                            Father Name: {item.ParentName}
                          </span>
                          <br />
                          <span className="span">
                            Aadhaar No: {item.Parent_AadhaarNo}
                          </span>
                          <br />
                          <span className="span">
                            Mobile No: {item.MobileNo}
                          </span>
                          <br />
                          <span className="span">E-mail: {item.Email}</span>
                          <br />
                          <span className="span">Address: {item.Address}</span>
                        </div>
                      </td>
                      <td>{}</td>
                    </tr>
                    {selectedRow === index && (
                      <tr>
                        <td colSpan="3">
                          <div className="dropdown-content bg-white">
                            <div className="dropdown-title">
                              <h3 className="status border-b-2 m-1">
                                Admin Remark
                                <span
                                  className={` ${
                                    item.status === "completed"
                                      ? "text-amber-400"
                                      : "text-red-500"
                                  } capitalize ml-3`}
                                >
                                  {item.remarks}
                                </span>
                              </h3>
                              <h3 className="status border-b-2 m-1">
                                Applied on
                                <span className="text-md font-medium ml-2 text-indigo-500 ">
                                  {item.createdOn}
                                </span>
                              </h3>
                              <h3 className="status border-b-2 m-1 ">
                                Status
                                <span
                                  className={`${
                                    item.status === "inProgress"
                                      ? "bg-yellow-400"
                                      : item.status === "completed"
                                      ? "bg-[#71b944]"
                                      : "bg-[#f4516c]"
                                  } px-2 py-1 text-white ml-5 rounded-sm `}
                                >
                                  {item.status}
                                </span>
                              </h3>

                              <div className=" flex items-center  border-b-2">
                                <h3 className="status">Action</h3>
                                <div className="px-6 py-4 flex items-center justify-between gap-1">
                                  <Link
                                    to={`/user-edit?entrytype=C&apply=${item.appliedBy}&time=${item.timeStamp}&type=${item.User_type}`}
                                    className="font-medium text-white no-underline  border-1 bg-[#71b944] hover:bg-[#67a83e] px-3 py-2 rounded-sm"
                                  >
                                    <i className="ri-edit-box-line text-white"></i>
                                  </Link>
                                  <Link
                                    to={`/user-finger?aadhar=${
                                      item.Parent_AadhaarNo
                                    }&fingerprints=${encodeURIComponent(
                                      JSON.stringify(item.FingerPrint)
                                    )}`}
                                    className="font-medium text-white no-underline   border-1 bg-[#71b944] hover:bg-[#67a83e] px-3 py-2 rounded-sm"
                                  >
                                    <i className="ri-fingerprint-fill text-white"></i>
                                  </Link>
                                  <Link
                                    to={`/edit-view?name=${item.Name}&fname=${
                                      item.ParentName
                                    }&dob=${item.DOB}&aadhar=${
                                      item.Parent_AadhaarNo
                                    }&mobile=${item.MobileNo}&email=${
                                      item.Email
                                    }&fingerprints=${encodeURIComponent(
                                      JSON.stringify(item.FingerPrint)
                                    )}&proof=${encodeURIComponent(
                                      JSON.stringify(item.Proof)
                                    )}`}
                                    className="font-medium text-white no-underline  border-1 bg-[#71b944] hover:bg-[#67a83e] px-3 py-2 rounded-sm"
                                  >
                                    <i className="ri-eye-line text-white"></i>
                                  </Link>
                                  {role === "BackOffice" ? null : (
                                    <button
                                      onClick={() => confirmDeleteUser(item)}
                                      className="font-medium   no-underline   border-1 bg-[#f4516c] hover:bg-[#cb4c61] px-3 py-2 rounded-sm"
                                    >
                                      <i className="ri-delete-bin-line text-white"></i>
                                    </button>
                                  )}
                                  <Link
                                    to={`/Upload?entrytype=C&apply=${
                                      item.appliedBy
                                    }&time=${item.timeStamp}&type=${
                                      item.User_type
                                    }&route=${"/child-entry-list"}`}
                                    className="font-medium text-white no-underline  border-1 bg-[#71b944] hover:bg-[#67a83e] px-3 py-2 rounded-sm"
                                  >
                                    Upload
                                  </Link>
                                </div>
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
                  <td colSpan="3">
                    <h1 className="list-record">Record Not Found 😞</h1>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
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
}

export default ChildEntryList;
