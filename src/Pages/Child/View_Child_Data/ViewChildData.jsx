import "./view_child_data.css";

import React, { useEffect, useState, useRef } from "react";
import Table from "react-bootstrap/Table";
// import axios from "axios";
import CopyButton from "../../../Components/DownloadAction/CopyButton";
import ExcelButton from "../../../Components/DownloadAction/ExcelButton";
import CSVButton from "../../../Components/DownloadAction/CSVButton";
import PDFButton from "../../../Components/DownloadAction/PDFButton";
import Breadcrumb from "../../../Components/BreadCrumb/Breadcrumb";
import Slip from "../../../Components/Slip/Slip";

function ViewChildData() {
  const tableRef = useRef();
  //api data fetch
  const [data, setData] = useState([]);
  const [error, setError] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const title = "View Chid Data";
  const links = [
    { title: "Home", href: "/superadmin" },
    { title: "View Chid Data", href: "" },
  ];

  const mylinks = [
    {
      to: "/child-entry-list",
      text: "View Customer",
      icon: "ri-team-line text-white text-2xl ",
    },
  ];
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
  const products = [
    {
      name: "Priya Sharma",
      dateofbirth: "2024-02-12",
      aadhaar: "98765432101234",
      email: "priya.sharma@example.com",
      mobile: "9876543210",
    },
  ];
  const handleIconClick = (index) => {
    setSelectedRow(selectedRow === index ? null : index);
  };

  return (
    <>
      <Breadcrumb title={title} links={links} mylinks={mylinks} />
      {/* data */}
      {products ? (
        <div className="p-4 sm:ml-64 bg-gray-200">
          <div className="p-4 border-2 border-gray-200 border-solid rounded-lg bg-white">
            <h3 className="text-2xl font-semibold"> View Child Data</h3>
            <div className="Download-Button">
              <CopyButton data={products} />
              <ExcelButton
                data={products}
                filename={"ViewRetailerUserList.xlsx"}
              />
              <CSVButton
                data={products}
                filename={"ViewRetailerUserList.csv"}
              />
              <PDFButton
                tableRef={tableRef}
                filename={"ViewRetailerUserList.pdf"}
              />
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
                  <th>S.N.</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Aadhaar No.</th>
                  <th>Mobile No.</th>
                  <th>E-mail ID</th>
                </tr>
              </thead>

              <tbody>
                {products.length < 0 ? (
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
                        <td>{item.name}</td>
                        <td>{item.dateofbirth}</td>
                        <td>{item.aadhaar}</td>
                        <td>{item.mobile}</td>
                        <td>{item.email}</td>
                      </tr>
                      {selectedRow === index && (
                        <tr>
                          <td colSpan="6" style={{ backgroundColor: "white" }}>
                            {/* Dropdown content */}
                            <div className="dropdown-content">
                              <div className="dropdown-title">
                                <h3 className="status">
                                  Created On :{" "}
                                  <span
                                    style={{ color: "blue", fontSize: "15px" }}
                                  >
                                    {item.createdOn}
                                  </span>
                                </h3>

                                <h3 className="status">Status</h3>
                              </div>

                              <Slip />
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">
                      <h3 className="list-record">Record Not Found😞</h3>
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
    </>
  );
}

export default ViewChildData;
