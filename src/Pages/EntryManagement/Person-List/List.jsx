import React, { useEffect, useState, useRef } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { Local_Url } from "../../../constant/constant";
import axios from "axios";
import "./list.css";
import Slip from "../../../Components/Slip/Slip";
import CopyButton from "../../../Components/DownloadAction/CopyButton";
import PDFButton from "../../../Components/DownloadAction/PDFButton";
import ExcelButton from "../../../Components/DownloadAction/ExcelButton";
import CSVButton from "../../../Components/DownloadAction/CSVButton";
import Breadcrumb from "../../../Components/BreadCrumb/Breadcrumb";
import SearchElement from "../../../Components/SearchElement/SearchElement";

function List() {
  //api data fetch
  const [filteredProducts, setFilteredProducts] = useState([]);

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
  const title = role === "BackOffice" ? "View Customers Data" : "View Entry";
  const links =
    role === "Superadmin"
      ? [
          { title: "Home", href: "/superadmin" },
          { title: "View Entry", href: "" },
        ]
      : role === "Retailer"
      ? [
          { title: "Home", href: "/retailer" },
          { title: "View Entry", href: "" },
        ]
      : [
          { title: "Home", href: "/backoffice" },
          { title: "View Customers Data", href: "" },
        ];
  const mylinks = [
    {
      to: "/add-customer",
      text: "Create New ",
      icon: "ri-add-line text-white text-2xl ",
    },
  ];
  const tableRef = useRef(null);

  useEffect(() => {
    const apiUrl = `${Local_Url}/api/v1/retailer/retailer-users`;

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
  // if (role === "Retailer")
    return (
      <>
        <Breadcrumb title={title} links={links} mylinks={mylinks} />

        <div className="p-4 sm:ml-64">
          <div className="p-2 border-2 border-gray-200 border-solid rounded-lg ">
            <div className="Download-Button flex items-center justify-between">
              <div>
                <CopyButton data={data} />
                <ExcelButton data={data} filename={"AddCustomerList.xlsx"} />
                <CSVButton data={data} filename={"AddCustomerList.csv"} />
                <PDFButton
                  tableRef={tableRef}
                  filename={"AddCustomerList.pdf"}
                />
              </div>
              <SearchElement onSearch={handleSearch} />
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
                  <th>Purpose</th>
                  <th>Age</th>
                  <th>Father Name</th>
                  <th>Aadhaar No.</th>
                  <th>Mobile No.</th>
                  <th>E-mail ID</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((item, index) => (
                    <React.Fragment key={item.id}>
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
                        <td>{item.Purpose}</td>
                        <td>{item.DOB}</td>
                        <td>{item.FatherName}</td>
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
                                    style={{
                                      color: "blue",
                                      fontSize: "15px",
                                    }}
                                  >
                                    {item.createdOn}
                                  </span>
                                </h3>
                                <div className="flex items-center">
                                  <h3 className="status flex items-center">
                                    Status:
                                    <button className="Progress button">
                                      {item.status}
                                    </button>
                                  </h3>
                                  <Slip fileUrl={item.oSlip} />
                                </div>
                                <div className="Action">
                                  <h4 className="Action-text">Action</h4>
                                  <Link to="/edit-customer" className="button">
                                    <i className="ri-edit-2-fill pencil"></i>
                                  </Link>
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
                    <td colSpan="8">
                      <h1 className="list-record">Record Not Found😞</h1>
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

export default List;
