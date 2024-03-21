import React, { useRef, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import CopyButton from "../../../Components/DownloadAction/CopyButton";
import PDFButton from "../../../Components/DownloadAction/PDFButton";
import ExcelButton from "../../../Components/DownloadAction/ExcelButton";
import CSVButton from "../../../Components/DownloadAction/CSVButton";
import Breadcrumb from "../../../Components/BreadCrumb/Breadcrumb";
import SearchElement from "../../../Components/SearchElement/SearchElement";

const AdminReport = () => {
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const userData = localStorage.getItem("user");


  let role = "";
  if (userData) {
    // Parse JSON string to object
    const userObj = JSON.parse(userData);
    // Access the role property
    role = userObj.role;
  }
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

  const products = [
    {
      appliedBy: "UP_UID_NS_3203",
      aadharCardDetails: {
        // Fixed object structure
        Name: "Kabutari Devi",
        FatherName: "Ramawatar Yadva",
        DOB: "01/01/1962",
        AadhaarNo: "2323-3434-4545",
        MobileNo: "233445667",
        Email: "Ck812@gmail.com",
        Address: "",
      },
      purpose: "Mobile NO Update",
      adminRemark: "", // Corrected spacing
      createdOn: "11/12/2012",
    },
  ];

  const handleUploadButtonClick = () => {
    setShowUploadPopup(true);
  };

  const handleSubmit = () => {
    alert("Thanks");
    // Logic to handle form submission goes here
    // After submission, you may want to close the popup
    setShowUploadPopup(false);
  };

  const handleCancel = () => {
    // Logic to handle cancel action goes here
    setShowUploadPopup(false);
  };

   const handleIconClick = (index) => {
     setSelectedRow(selectedRow === index ? null : index);
   };
 
return (
      <>
        <Breadcrumb title={title} links={links} />
        <div className="p-2 sm:ml-64">
          <div className="p-2 border-2 border-gray-200 border-solid rounded-lg">
            <div className="Download-Button flex items-center justify-between">
              <div>
                <CopyButton data={products} />
                <ExcelButton data={products} filename={"ChildEntyList.xlsx"} />

                <CSVButton data={products} filename={"ChildEntyList.csv"} />
                <PDFButton tableRef={tableRef} filename={"ChildEntyList.pdf"} />
              </div>
              <SearchElement />
            </div>
            <Table
              striped
              bordered
              hover
              className="custom-table"
              ref={tableRef}
            >
              <thead>
                <tr>
                  <th>S.NO.</th>
                  <th>Applied By</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((item, index) => (
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
                        <td>userName</td>
                      </tr>
                      {selectedRow === index && (
                        <tr>
                          <td colSpan="6">
                            <div className="dropdown-content">
                              <div className="dropdown-title">
                                <h3 className="status">
                                  Aadhaar Card Details:
                                </h3>

                                <span className="span">Name: {item.Name}</span>
                                <span className="span">
                                  Father Name: {item.ParentName}
                                </span>
                                <span className="span">
                                  Aadhaar No: {item.Parent_AadhaarNo}
                                </span>
                                <span className="span">
                                  Mobile No: {item.MobileNo}
                                </span>
                                <span className="span">
                                  E-mail: {item.Email}
                                </span>
                                <span className="span">
                                  Address: {item.Address}
                                </span>
                                <h3 className="status">Purpose & Status</h3>
                                <span className="text-white font-semibold  bg-yellow-500 p-1 rounded-md">
                                  Complete
                                </span>
                                <h3 className="status">Admin Remark</h3>
                                <h3 className="status">
                                  Created On:
                                  <span
                                    style={{ color: "blue", fontSize: "15px" }}
                                  >
                                    {item.createdOn}
                                  </span>
                                </h3>
                                <div className=" flex items-center justify-center gap-3">
                                  <h3 className="status">Action</h3>
                                  <div className="px-6 py-4 border flex items-center justify-between gap-3">
                                    <Link
                                      to="/user-edit"
                                      className="font-medium text-blue-600 no-underline hover:underline border-1 bg-green-600 px-3 py-3 rounded-md"
                                    >
                                      <i className="ri-edit-box-line text-white"></i>
                                    </Link>
                                    <Link
                                      to="/user-finger"
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

                                {/* <div className="Action-container">
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
