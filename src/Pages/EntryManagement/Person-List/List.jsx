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
              <PDFButton tableRef={tableRef} filename={"AddCustomerList.pdf"} />
            </div>
            <SearchElement onSearch={handleSearch} />
          </div>
          <Table striped bordered hover className="custom-table" ref={tableRef}>
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
                      <td>{item.Name}</td>
                      <td>{item.Purpose}</td>
                      <td>{item.DOB}</td>
                      <td>{item.FatherName}</td>
                      <td>{item.AadhaarNo}</td>
                      <td>{item.MobileNo}</td>
                      <td>{item.Email}</td>
                    </tr>
                    {selectedRow === index && (
                      <tr key={`details_${index}`}>
                        <td colSpan="8" style={{ backgroundColor: "white" }}>
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
                                  <span
                                    className={`${
                                      item.status === "inProgress"
                                        ? "bg-yellow-400"
                                        : item.status === "completed"
                                        ? "bg-[#71b944]"
                                        : "bg-[#f4516c]"
                                    } p-3 text-white ml-5 rounded-sm mr-3`}
                                  >
                                    {item.status}
                                  </span>
                                </h3>
                                <Slip
                                  fileUrl={item.oSlip}
                                  mobileUserData={item}
                                />
                              </div>

                              {item.status === "completed" ? (
                                <div className="flex  items-center justify-items-center  ">
                                  <h4 className="Action-text">Action</h4>
                                  <img
                                    className="size-8 object-cover rounded-full ml-3 mt-3"
                                    src="https://cdn.dribbble.com/users/4358240/screenshots/14825308/media/84f51703b2bfc69f7e8bb066897e26e0.gif"
                                    alt="Uploaded File"
                                  />
                                </div>
                              ) : (
                                <div className="Action">
                                  <h4 className="Action-text">Action</h4>
                                  <Link
                                    to={`/edit-customer?aadhar=${item.AadhaarNo}&entrytype=D&apply=${item.appliedBy}&time=${item.timeStamp}`}
                                    className="button"
                                  >
                                    <i className="ri-edit-2-fill pencil"></i>
                                  </Link>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr key="no_records">
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
