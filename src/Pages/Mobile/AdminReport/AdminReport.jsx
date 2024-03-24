import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import CopyButton from "../../../Components/DownloadAction/CopyButton";
import PDFButton from "../../../Components/DownloadAction/PDFButton";
import ExcelButton from "../../../Components/DownloadAction/ExcelButton";
import CSVButton from "../../../Components/DownloadAction/CSVButton";
import Breadcrumb from "../../../Components/BreadCrumb/Breadcrumb";
import SearchElement from "../../../Components/SearchElement/SearchElement";
import Upload from "../../../Components/ActionServices/Upload";
import { Local_Url } from "../../../constant/constant";

const AdminReport = () => {
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [data, setData] = useState([]);
  const userData = JSON.parse(localStorage.getItem("user"));
  let role = userData.User_type;
  let userName = userData.Username;

  const title = "Mobile Update-Report";
  const links =
    role === "Admin"
      ? [
          { title: "Home", href: "/superadmin" },
          { title: "Mobile Update-Report", href: "" },
        ]
      : [
          { title: "Home", href: "/retailer" },
          { title: "Mobile Update-Report", href: "" },
        ];
  const tableRef = useRef(null);

  useEffect(() => {
    const apiUrl = `${Local_Url}/api/v1/admin/mAllAdminData`;

    axios
      .get(apiUrl, { params: { userName: userName } })
      .then((response) => {
        console.log(response.data);

        setData(response.data.data);
        setFilteredProducts(response.data.data);
      })
      .catch((err) => {
        console.log("Something Went Wrong");
      });
  }, []);
  const handleUploadButtonClick = () => {
    setShowUploadPopup(true);
  };

  const handleSubmit = () => {
    alert("Thanks");
    // Logic to handle form submission goes here
    setShowUploadPopup(false); // Close the popup after submission
  };

  const handleCancel = () => {
    setShowUploadPopup(false); // Close the popup when cancel is clicked
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
      <Breadcrumb title={title} links={links} />
      <div className="p-2 sm:ml-64">
        <div className="p-2 border-2 border-gray-200 border-solid rounded-lg">
          <div className="Download-Button flex items-center justify-between">
            <div>
              <CopyButton data={data} />
              <ExcelButton data={data} filename={"ChildEntyList.xlsx"} />

              <CSVButton data={data} filename={"ChildEntyList.csv"} />
              <PDFButton tableRef={tableRef} filename={"ChildEntyList.pdf"} />
            </div>
            <SearchElement onSearch={handleSearch} />
          </div>
          <Table striped bordered hover className="custom-table" ref={tableRef}>
            <thead>
              <tr>
                <th>S.NO.</th>
                <th>Applied By</th>
                <th>Aadhaar Card Details</th>
                <th>Purpose</th>
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
                          ></i>{" "}
                          {index + 1}
                        </div>
                      </td>
                      <td>{item.AppliedBy}</td>
                      <td>
                        <div className="text-left">
                          <span className="span">Name: {item.Name}</span>
                          <br />
                          <span className="span">
                            Father Name: {item.ParentName}
                          </span>
                          <br />
                          <span className="span">
                            Aadhaar No: {item.AadhaarNo}
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
                      <td></td>
                    </tr>
                    {selectedRow === index && (
                      <tr>
                        <td colSpan="4">
                          <div className="dropdown-content">
                            <div className="dropdown-title">
                              <h3 className="status border-b-2 border-t-2">
                                Status
                              </h3>
                              <span className="text-white font-semibold  bg-yellow-500 p-1 rounded-md">
                                {item.status}
                              </span>
                              <h3 className="status border-b-2">
                                Admin Remark
                              </h3>
                              <h3 className="status border-b-2">
                                Created On:
                                <span
                                  style={{ color: "blue", fontSize: "15px" }}
                                >
                                  {item.createdOn}
                                </span>
                              </h3>
                              <div className=" flex items-center justify-center gap-3 border-b-2">
                                <h3 className="status">Action</h3>
                                <div className="px-6 py-4 border flex items-center justify-between gap-3">
                                  <Link
                                    to={`/user-edit?aadhar=${item.AadhaarNo}`}
                                    className="font-medium text-blue-600 no-underline hover:underline border-1 bg-green-600 px-3 py-3 rounded-md"
                                  >
                                    <i className="ri-edit-box-line text-white"></i>
                                  </Link>
                                  <Link
                                    to={`/user-finger?aadhar=${item.FingerPrint}`}
                                    className="font-medium text-blue-600 no-underline hover:underline border-1 bg-green-600 px-3 py-3 rounded-md"
                                  >
                                    <i className="ri-fingerprint-fill text-white"></i>
                                  </Link>
                                  <Link
                                    to="/edit-view"
                                    className="font-medium text-blue-600 no-underline hover:underline border-1 bg-green-600 px-3 py-3 rounded-md"
                                  >
                                    <i className="ri-eye-line text-white"></i>
                                  </Link>
                                  <Link
                                    to="#"
                                    className="font-medium text-blue-600 no-underline hover:underline border-1 bg-red-600 px-3 py-3 rounded-md"
                                  >
                                    <i className="ri-delete-bin-line text-white"></i>
                                  </Link>
                                  <button
                                    onClick={handleUploadButtonClick}
                                    className="font-medium text-white no-underline border-1 bg-green-600 px-6 py-3 rounded-md"
                                  >
                                    Upload
                                  </button>
                                </div>
                              </div>

                              {/* <div className="Action-container border-b-2">
                                  <Action />
                                  <FingerData />
                                  <ViewFingerAndUpdate />
                                  <DeleteData />
                                  <Upload />
                                </div> */}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="6">
                    <h1 className="list-record">Record Not Found 😞</h1>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
      {showUploadPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md w-1/4">
            <h2 className="text-xl font-semibold mb-4">
              Upload Acknowledgement Slip
            </h2>
            <Upload />
            <div className="flex justify-end mt-6">
              <button
                onClick={handleCancel}
                className="px-4 py-2 mr-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminReport;
