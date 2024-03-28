import "./view_child_data.css";
import { Link } from "react-router-dom";
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
  const userData = JSON.parse(localStorage.getItem("user"));
  let role = "";
  let userName = "";

  if (userData) {
    const userObj = userData;
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
      ? [{ title: "Home", href: "/superadmin" }, { title: "View Chid Data" }]
      : [{ title: "Home", href: "/retailer" }, { title: "View Child Data" }];

  const mylinks = [
    {
      to: "/new-entry",
      text: "Enroll Child",
      icon: "ri-team-line text-white text-2xl ",
    },
  ];

  useEffect(() => {
    const apiUrl = `${Local_Url}/api/v1/retailer/child-users`;

    axios
      .get(apiUrl, {
        params: { userName: userName },
      })
      .then((response) => {
        setData(response.data.data);
      })
      .catch((err) => {
        console.log("Something Went Wrong");
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
                <th>Child Name</th>
                <th>DOB</th>
                <th>Aadhaar No.</th>
                <th>Mobile No.</th>
                <th>E-mail ID</th>
                {/* <th>CreatedOn</th>
                <th>Status</th> */}
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
                      <td>{item.DOB}</td>
                      <td>{item.Parent_AadhaarNo}</td>
                      <td>{item.MobileNo}</td>
                      <td>{item.Email}</td>
                      {/* <td>{CreatedOn}</td>
                      <td>{Status}</td> */}
                    </tr>
                    {selectedRow === index && (
                      <tr>
                        <td colSpan="6" style={{ backgroundColor: "white" }}>
                          <div className="dropdown-content">
                            <div className="dropdown-title">
                              <h3 className="status">
                                Created On :
                                <span
                                  style={{ color: "blue", fontSize: "15px" }}
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
                                    to={`/edit-customer?aadhar=${item.Parent_AadhaarNo}&entrytype=C&apply=${item.appliedBy}&time=${item.timeStamp}`}
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
