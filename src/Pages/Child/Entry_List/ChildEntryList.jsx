import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
// import axios from "axios";

import "./EntryList.css";
import CSVDownloadButton from "../../Download/CSVDownloadButton";
import PDFDownloadButton from "../../Download/PDFDownloadButton";
import ExcelDownloadButton from "../../Download/ExcelDownloadButton";
import CopyButton from "../../Download/CopyButton";
import Products from "./Products";
import Breadcrumb from "../../../Components/BreadCrumb/Breadcrumb";
import Asidebar from "../../../Components/Asidebar/Asidebar";
import HeaderNavbar from "../../../Components/HeaderNabar/HeaderNavbar";
import Footer from "../../../Components/Footer/Footer";
import Slip from "../../../Components/Slip/Slip";
import FingerData from "./Auth/FingerData";
import ViewFingerAndUpdate from "./View/ViewFingerAndUpdate";
import DeleteData from "./Delete/DeleteData";
import Upload from "./Upload/Upload";
import Action from "./Action/Action";
import SearchElement from "../../../Components/SearchElement/SearchElement";

function ChildEntryList() {
  const userData = localStorage.getItem("user");
  let role = "";
  if (userData) {
    // Parse JSON string to object
    const userObj = JSON.parse(userData);
    // Access the role property
    role = userObj.role;
  }
  const title = "View Child Entry";
  const links =
    role === "Admin"
      ? [
          { title: "Home", href: "/superadmin" },
          { title: "View Child Data", href: "" },
        ]
      : [
          { title: "Home", href: "/retailer" },
          { title: "View Child Data", href: "" },
        ];
  const mylinks = [
    {
      to: "/new-entry",
      text: "Create New ",
      icon: "ri-add-line text-white text-2xl ",
    },
  ];
  //api data fetch
  const [data, setData] = useState([]);
  const [error, setError] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  // useEffect(() => {
  //     // Define the API endpoint URL
  //     const apiUrl = 'http://localhost:4001/Products';

  //     // Make a GET request using Axios
  //     axios.get(apiUrl)
  //         .then(response => {
  //             setData(response.data);
  //         })
  //         .catch(err => {
  //             console.log('Something Went Wrong');
  //             setError(err);
  //         });
  // }, []);

  const handleIconClick = (index) => {
    setSelectedRow(selectedRow === index ? null : index);
  };

  return (
    <>
      <Asidebar />
      <HeaderNavbar />
      <Breadcrumb title={title} links={links} mylinks={mylinks} />

      {/* data */}
      {Products ? (
        <div className="p-2 sm:ml-64">
          <div className="p-2 border-2 border-gray-200 border-solid rounded-lg  ">
            <div className="Download-Button flex items-center justify-between">
              <div>
                <CopyButton />
                <ExcelDownloadButton fileName="myExcel" jsonData={Products} />
                <CSVDownloadButton />
                <PDFDownloadButton />
              </div>
              <SearchElement />
            </div>
            <Table striped bordered hover className="custom-table">
              <thead>
                <tr>
                  <th>S.NO.</th>
                  <th>Applied By</th>
                </tr>
              </thead>

              <tbody>
                {Products.length > 0 ? (
                  Products.map((item, index) => (
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
                              style={{
                                backgroundColor:
                                  selectedRow === index ? "red" : "blue",
                              }}
                            ></i>{" "}
                            {index + 1}
                          </div>
                        </td>
                        <td>{item.name}</td>
                      </tr>
                      {selectedRow === index && (
                        <tr>
                          <td colSpan="6" style={{ backgroundColor: "white" }}>
                            {/* Dropdown content */}
                            <div className="dropdown-content">
                              <div className="dropdown-title">
                                <h3 className="status">
                                  {" "}
                                  Aadhaar Card Details :{" "}
                                </h3>
                                <Slip />
                                <span className="span">Name : {item.name}</span>
                                <span className="span">
                                  Father Name : {item.dateofbirth}
                                </span>
                                <span className="span">
                                  Aadhaar No : {item.aadhaar}
                                </span>
                                <span className="span">
                                  {" "}
                                  Mobile No : {item.mobile}
                                </span>
                                <span className="span">
                                  {" "}
                                  E-mail : {item.email}
                                </span>
                                <span className="span">
                                  {" "}
                                  Address : {item.address}
                                </span>
                                <h3 className="status"> Purpose & Status</h3>
                                <h3 className="status"> Admin Remark</h3>
                                <h3 className="status">
                                  Created On :{" "}
                                  <span
                                    style={{ color: "blue", fontSize: "15px" }}
                                  >
                                    {item.createdOn}
                                  </span>
                                </h3>
                                <div className="Action-container">
                                  <Action />
                                  <FingerData />
                                  <ViewFingerAndUpdate />
                                  <DeleteData />
                                  <Upload />
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
                    <td colSpan="6">
                      <h1 className="list-record">Record Not Found😞</h1>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      ) : (
        <p>Please Wait...</p>
      )}
      <Footer />
    </>
  );
}

export default ChildEntryList;
