import React, { useEffect, useState, useRef } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Local_Url } from "../../../constant/constant";
import "./EntryList.css";
import CopyButton from "../../../Components/DownloadAction/CopyButton";
import PDFButton from "../../../Components/DownloadAction/PDFButton";
import ExcelButton from "../../../Components/DownloadAction/ExcelButton";
import CSVButton from "../../../Components/DownloadAction/CSVButton";
import Breadcrumb from "../../../Components/BreadCrumb/Breadcrumb";
import Slip from "../../../Components/Slip/Slip";
import FingerData from "./Auth/FingerData";
import ViewFingerAndUpdate from "./View/ViewFingerAndUpdate";
import DeleteData from "./Delete/DeleteData";
import Upload from "./Upload/Upload";
import Action from "./Action/Action";
import SearchElement from "../../../Components/SearchElement/SearchElement";
//import { toast } from "react-toastify";

function ChildEntryList() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const tableRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  const userData = JSON.parse(localStorage.getItem("user"));
  const role = userData.User_type;
  const userName = userData.Username;

  const title = "View Child Entry";
  const links =
    role === "Superadmin"
      ? [{ title: "Home", href: "/superadmin" }, { title: "View Child Data" }]
      : [{ title: "Home", href: "/backoffice" }, { title: "View Child Data" }];
  const mylinks = [
    {
      to: "/new-entry",
      text: "Create New",
      icon: "ri-add-line text-white text-2xl",
    },
  ];

  const fetchData = async () => {
    const apiUrl = `${Local_Url}/api/v1/admin/cAllAdminData`;
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
  };

  useEffect(() => {
    fetchData();
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
      <div className="p-2 sm:ml-64">
        <div className="p-2 border-2 border-gray-200 border-solid rounded-lg">
          <div className="Download-Button flex items-center justify-between">
            <div>
              <CopyButton data={data} />
              <ExcelButton data={data} filename={"ChildEntryList.xlsx"} />
              <CSVButton data={data} filename={"ChildEntryList.csv"} />
              <PDFButton tableRef={tableRef} filename={"ChildEntryList.pdf"} />
            </div>
            <SearchElement onSearch={handleSearch} />
          </div>
          <Table striped bordered hover className="custom-table" ref={tableRef}>
            <thead>
              <tr>
                <th>S.NO.</th>
                <th>Applied By</th>
                <th>Aadhaar Card Details</th>
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
                            Aadhaar No: {item.Parent_AadhaarNo}
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
                      <td>{}</td>
                    </tr>
                    {selectedRow === index && (
                      <tr>
                        <td colSpan="3">
                          <div className="dropdown-content bg-white">
                            <div className="dropdown-title">
                              <h3 className="status border-b-2 border-t-2">
                                Purpose & Status
                              </h3>
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
                              <div className="Action-container border-b-2">
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
                  <td colSpan="2">
                    <h1 className="list-record">Record Not Found 😞</h1>
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

export default ChildEntryList;
