import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CopyButton from "../../../Components/DownloadAction/CopyButton";
import ExcelButton from "../../../Components/DownloadAction/ExcelButton";
import CSVButton from "../../../Components/DownloadAction/CSVButton";
import PDFButton from "../../../Components/DownloadAction/PDFButton";
import SearchElement from "../../../Components/SearchElement/SearchElement";
import Breadcrumb from "../../../Components/BreadCrumb/Breadcrumb";
import { Local_Url } from "../../../constant/constant";
import Table from "react-bootstrap/Table";

const ViewRetailerUserList = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const tableRef = useRef();

  //Geting data from api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${Local_Url}/api/v1/admin/get-all-retailer`
        );

        const responseData = response.data.data;
        setData(responseData);
        setFilteredProducts(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  //handle-search
  useEffect(() => {
    const filtered = data.filter((product) =>
      Object.values(product)
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, data]);

  //Activating dropdown figure
  const handleIconClick = (index) => {
    setSelectedRow(selectedRow === index ? null : index);
  };

  return (
    <>
      <Breadcrumb
        title="View Retailer User Data"
        links={[
          { title: "Home", href: "/superadmin" },
          { title: "View Retailer User Data" },
        ]}
      />
      <div className="p-4 sm:ml-64  ">
        <div className="p-4 border-2 border-gray-200 border-solid rounded-lg bg-white ">
          <h3 className="text-2xl font-semibold">
            View Retailer Users Data-ADMIN
          </h3>
          <div className="flex items-center justify-between my-4 px-8">
            <div>
              <CopyButton data={filteredProducts} />
              <ExcelButton
                data={filteredProducts}
                filename={"ViewRetailerUserList.xlsx"}
              />
              <CSVButton
                data={filteredProducts}
                filename={"ViewRetailerUserList.csv"}
              />
              <PDFButton
                tableRef={tableRef}
                filename={"ViewRetailerUserList.pdf"}
              />
            </div>
            <SearchElement onSearch={setSearchQuery} />
          </div>
          <Table striped bordered hover className="custom-table" ref={tableRef}>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Name</th>
                <th> Email</th>
                <th>Mobile No.</th>
                <th>Created By</th>
                <th> Password</th>

                <th> Balance</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <React.Fragment key={product.id}>
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
                      <td>{product.Name}</td>
                      <td>{product.Email}</td>
                      <td>{product.Phone_n}</td>
                      <td>Admin</td>
                      <td>{product.Password}</td>
                      <td>{product.Balance}</td>
                    </tr>
                    {selectedRow === index && (
                      <tr>
                        <td colSpan="6" style={{ backgroundColor: "white" }}>
                          {/* Dropdown content */}
                          <div className="dropdown-content">
                            <div className="dropdown-title">
                              {/* Status Handaler in the Dropdown */}
                              <h3 className="status border-b-2 border-t-2 flex items-center  gap-3 ">
                                <span className="font-bold text-lg ">
                                  Status
                                </span>
                                <span
                                  className={`text-white ${
                                    product.isUserblocked === true
                                      ? "bg-[#f4516c] hover:bg-[#cb4c61]"
                                      : "bg-[#71b944] hover:bg-[#67a83e]"
                                  }   border-1 px-2 py-1  rounded-sm `}
                                  style={{ fontsize: "15px" }}
                                >
                                  {product.isUserblocked === true
                                    ? "Inactive"
                                    : "Active"}
                                </span>
                              </h3>
                              {/* Action manegement in the dropdown */}
                              <h3 className="status font-bold text-lg flex  gap-3 items-center  border-b-2 ">
                                Action
                                <Link
                                  to={`/editstatus?username=${product.Username}`}
                                  className="font-medium   no-underline   border-1 bg-[#71b944] hover:bg-[#67a83e] px-3 py-2 rounded-sm"
                                >
                                  <i className="ri-edit-box-line text-white"></i>
                                </Link>
                              </h3>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="9">
                    <h1 className="list-record text-center text-3xl">
                      Record Not Found😞
                    </h1>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ViewRetailerUserList;
