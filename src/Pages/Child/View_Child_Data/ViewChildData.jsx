import "./view_child_data.css";

import React, { useEffect, useState, useRef } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import CopyButton from "../../../Components/DownloadAction/CopyButton";
import ExcelButton from "../../../Components/DownloadAction/ExcelButton";
import CSVButton from "../../../Components/DownloadAction/CSVButton";
import PDFButton from "../../../Components/DownloadAction/PDFButton";
import Breadcrumb from "../../../Components/BreadCrumb/Breadcrumb";
import Slip from "../../../Components/Slip/Slip";
import { Local_Url } from "../../../constant/constant";

function ViewChildData() {
  const userData = localStorage.getItem("user");
  let role = "";
  let userName = "";

  if (userData) {
    const userObj = JSON.parse(userData);
    role = userObj.role;
    userName = userObj.Username;
  }
  const tableRef = useRef();
  //api data fetch
  const [data, setData] = useState([]);
  const [error, setError] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const title = "View Chid Data";
  const links =
    role === "Admin"
      ? [
          { title: "Home", href: "/superadmin" },
          { title: "View Chid Data" },
        ]
      : [
          { title: "Home", href: "/retailer" },
          { title: "View Child Data" },
        ];

  const mylinks = [
    {
      to: "/child-entry-list",
      text: "View Customer",
      icon: "ri-team-line text-white text-2xl ",
    },
  ];
   
  useEffect(() => {
      
      const apiUrl = `${Local_Url}/api/v1/retailer/child-users`;  ;

       
    axios.get(apiUrl, {
      params: { userName: userName }
    })
      .then(response => {
             console.log(response.data);
            setData(response.data.data);
            
          })
          .catch(err => {
              console.log('Something Went Wrong');
              setError(err);
          });
  }, []);
 
  const handleIconClick = (index) => {
    setSelectedRow(selectedRow === index ? null : index);
  };

  return (
    <>
      <Breadcrumb title={title} links={links} mylinks={mylinks} />

      <div className="p-4 sm:ml-64  ">
        <div className="p-4 border-2 border-gray-200 border-solid rounded-lg bg-white">
          <h3 className="text-2xl font-semibold"> View Child Data</h3>
          <div className="Download-Button">
            <CopyButton data={data} />
            <ExcelButton data={data} filename={"ViewRetailerUserList.xlsx"} />
            <CSVButton data={data} filename={"ViewRetailerUserList.csv"} />
            <PDFButton
              tableRef={tableRef}
              filename={"ViewRetailerUserList.pdf"}
            />
          </div>
          <Table striped bordered hover className="custom-table" ref={tableRef}>
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
              {data.length > 0 ? (
                data.map((item, index) => (
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
                      <td>{item.Name}</td>
                      <td>{item.dateofbirth}</td>
                      <td>{item.Parent_AadhaarNo}</td>
                      <td>{item.MobileNo}</td>
                      <td>{item.Email}</td>
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
    </>
  );
}

export default ViewChildData;
