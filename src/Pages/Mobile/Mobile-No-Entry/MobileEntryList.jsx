import "./mobileList.css";

import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
// import axios from "axios";
import CSVDownloadButton from "../../../../pages/Download/CSVDownloadButton";
import PDFDownloadButton from "../../../../pages/Download/PDFDownloadButton";
import ExcelDownloadButton from "../../../../pages/Download/ExcelDownloadButton";
import CopyButton from "../../../../pages/Download/CopyButton";
import Slip from "../../../../components/Slip/Slip";
import Products from "../../../../pages/Products";
import Search from "../../../../components/SearchFilter/Search";
import Header from "../../../../components/common/Header/Header";
function ViewChildData() {
  //api data fetch
  const [data, setData] = useState([]);
  const [error, setError] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

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

  const handleIconClick = (index) => {
    setSelectedRow(selectedRow === index ? null : index);
  };

  return (
    <>
      {/* data */}
      {Products ? (
        <section>
          <div className="hero-section">
            <Header />
            <div className="Download-Button">
              <CopyButton />
              <ExcelDownloadButton fileName="myExcel" jsonData={Products} />
              <CSVDownloadButton />
              <PDFDownloadButton />
              <Search />
            </div>
            <Table striped bordered hover className="custom-table">
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
                {Products.length < 0 ? (
                  Products.map((item, index) => (
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
        </section>
      ) : (
        <p>Please Wait...</p>
      )}
    </>
  );
}

export default ViewChildData;
