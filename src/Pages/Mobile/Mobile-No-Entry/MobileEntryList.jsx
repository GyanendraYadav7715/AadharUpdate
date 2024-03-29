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
import { Link } from "react-router-dom";

function ViewChildData() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);

  const userData = JSON.parse(localStorage.getItem("user"));
  const role = userData.User_type;
  const userName = userData.Username;

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
  }, []);

  const handleIconClick = (index) => {
    setSelectedRow(selectedRow === index ? null : index);
  };
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = data.filter((item) =>
      Object.values(item).join(" ").toLowerCase().includes(query.toLowerCase())
    );
    setData(filtered);
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
                <th>DOA</th>
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
                              {item.status === "Completed" ? (
                                <div className="flex  items-center  ">
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
                                    to={`/edit-customer?aadhar=${item.AadhaarNo}&entrytype=M&apply=${item.appliedBy}&time=${item.timeStamp}`}
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
