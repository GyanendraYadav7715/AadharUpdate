import React, { useRef, useEffect, useState } from "react";
import CopyButton from "../../../Components/DownloadAction/CopyButton";
import PDFButton from "../../../Components/DownloadAction/PDFButton";
import ExcelButton from "../../../Components/DownloadAction/ExcelButton";
import CSVButton from "../../../Components/DownloadAction/CSVButton";
import Breadcrumb from "../../../Components/BreadCrumb/Breadcrumb";
import SearchElement from "../../../Components/SearchElement/SearchElement";
import { Local_Url } from "../../../constant/constant";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Slip from "../../../Components/Slip/Slip";
 

function ViewChildData() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);

  const userData = localStorage.getItem("user");
  let role = "";
  let userName = "";
  if (userData) {
    // Parse JSON string to object
    const userObj = JSON.parse(userData);
    // Access the role property
    role = userObj.role;
    userName = userObj.Username;
  }

  const title = "Mobile Data";
  const links =
    role === "Admin"
      ? [
          { title: "Home", href: "/superadmin" },
          { title: "Mobile Data", href: "" },
        ]
      : [
          { title: "Home", href: "/retailer" },
          { title: "Mobile Data", href: "" },
        ];
  const mylinks = [
    {
      to: "/mobileupdate",
      text: "Create New",
      icon: "ri-add-line text-white text-2xl ",
    },
  ];
  // Define and initialize the tableRef
  const tableRef = useRef(null);
  useEffect(() => {
    const apiUrl = `${Local_Url}/api/v1/retailer/mobileUsers`;
    axios
      .get(apiUrl, { params: { userName: userName } })
      .then((response) => {
        setData(response.data.data);
      })
      .catch((err) => {
        console.log("Something Went Wrong");
      });
  });

  const handleIconClick = (index) => {
    setSelectedRow(selectedRow === index ? null : index);
  };
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = users.filter((user) =>
      Object.values(user).join(" ").toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };
 

  return (
    <>
      <Breadcrumb title={title} links={links} mylinks={mylinks} />
      <div className="p-4 sm:ml-64 bg-gray-200">
        <div className="p-4 border-2 border-gray-200 border-solid rounded-lg bg-white  ">
          <h2 className="text-2xl font-semibold pl-7">ADMIN</h2>
          <div className="flex items-center justify-between my-4 px-8">
            <div>
              <CopyButton data={data} />
              <ExcelButton data={data} filename={"MobileDataList.xlsx"} />
              <CSVButton data={data} filename={"MobileDataList.csv"} />
              <PDFButton tableRef={tableRef} filename={"MobileDataList.pdf"} />
            </div>
            <SearchElement onSearch={handleSearch} />
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
                      <td>{item.DOA}</td>
                      <td>{item.AadhaarNo}</td>
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

                            <Slip/>
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
