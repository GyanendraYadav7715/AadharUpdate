import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import CopyButton from "../../../Components/DownloadAction/CopyButton";
import ExcelButton from "../../../Components/DownloadAction/ExcelButton";
import CSVButton from "../../../Components/DownloadAction/CSVButton";
import PDFButton from "../../../Components/DownloadAction/PDFButton";
import SearchElement from "../../../Components/SearchElement/SearchElement";
import Breadcrumb from "../../../Components/BreadCrumb/Breadcrumb";
import { Local_Url } from "../../../constant/constant";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

        const responseData = response.data.data.map((user) => ({
          ...user,
          status: "Active",
        }));
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

  //  handle edit status the of the user

  const handleStatusEdit = async (Username, isUserblocked) => {
    try {
      const response = await axios.post(
        `${Local_Url}/api/v1/admin/block-retailer`,
        {
          Username,
          User_type: "Retailer",
          isUserblocked,
        }
      );
      console.log(response.data);

      const toastMessage =
        isUserblocked === "true"
          ? "User is Deactivated successfully"
          : "User is Activated successfully";
      toast.success(toastMessage);

      const updatedProducts = filteredProducts.map((product) => {
        if (product.Username === Username) {
          return {
            ...product,
            status: isUserblocked === "true" ? "Inactive" : "Active",
          };
        }
        return product;
      });
      setFilteredProducts(updatedProducts);
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

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
                              <h3 className="status border-b-2 border-t-2 flex items-center  gap-3">
                                <span className="font-bold text-lg">
                                  Status
                                </span>
                                <span
                                  className="text-white hover:bg-[#77b652] border-1 bg-[#88d05e] px-2 py-1  rounded-sm "
                                  style={{ fontsize: "15px" }}
                                >
                                  {product.status}
                                </span>
                              </h3>
                              {/* Action manegement in the dropdown */}
                              <h3 className="status font-bold text-lg flex justify-center items-center  border-b-2 ">
                                Action
                                <div className="px-6 py-4 gap-2 flex items-center justify-between">
                                  <button
                                    onClick={() =>
                                      handleStatusEdit(
                                        product.Username,
                                        "false"
                                      )
                                    }
                                    className="font-medium text-white no-underline hover:bg-[#77b652] border-1 bg-[#88d05e] p-2 rounded-sm"
                                  >
                                    Activate
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleStatusEdit(product.Username, "true")
                                    }
                                    className="font-medium text-white no-underline hover:bg-[#d45469] border-1 bg-[#f5627a] p-2 rounded-sm"
                                  >
                                    Deactivate
                                  </button>
                                </div>
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
