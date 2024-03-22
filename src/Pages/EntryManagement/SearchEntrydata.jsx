import React, { useRef, useState, useEffect, useMemo } from "react";
import axios from "axios";
import Breadcrumb from "../../Components/BreadCrumb/Breadcrumb";
import CopyButton from "../../Components/DownloadAction/CopyButton";
import CSVButton from "../../Components/DownloadAction/CSVButton";
import PDFButton from "../../Components/DownloadAction/PDFButton";
import ExcelButton from "../../Components/DownloadAction/ExcelButton";
import SearchElement from "../../Components/SearchElement/SearchElement";
import { Local_Url } from "../../constant/constant";

const SearchEntrydata = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const tableRef = useRef(null);
  const userData = localStorage.getItem("user");
  const userName = userData ? JSON.parse(userData).Username : "";
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = `${Local_Url}/api/v1/admin/transfer-history`;
      const response = await axios.post(apiUrl, formData, {
        params: { username: userName },
      });
      console.log("Data submitted successfully:", response.data);
      setData(response.data.data);
      setShow(true);
      // Handle success, display message, etc.
    } catch (error) {
      console.error("Error submitting form:", error.message);
      // Handle error, display error message, etc.
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const memoizedFilteredProducts = useMemo(() => {
    return data.filter((product) =>
      Object.values(product)
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  return (
    <>
      <Breadcrumb
        title="View Customers Data"
        links={[
          { title: "Home", href: "/superadmin" },
          { title: "View Customers Data" },
        ]}
        mylinks={[
          {
            to: "/add-customer",
            text: "Create New",
            icon: "ri-add-line text-white text-2xl",
          },
        ]}
      />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-solid rounded-lg bg-white">
          <div className="grid grid-cols-1 gap-4 mb-4 ">
            <h3 className="text-2xl font-semibold">
              Search And View Customer Date-Wise
            </h3>
            <form
              className="flex flex-col items-start w-full border-[#00000047] border-2 p-9 rounded-md bg-white"
              onSubmit={handleSubmit}
            >
              <div className="flex justify-between items-center w-full">
                <div className="mb-5 w-1/2 p-6">
                  <label
                    htmlFor="fromDate"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    From Date
                  </label>
                  <input
                    type="date"
                    id="fromDate"
                    name="fromDate"
                    value={formData.fromDate}
                    onChange={handleChange}
                    className="bg-white border border-black text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="From Date"
                    required
                  />
                </div>
                <div className="mb-5 w-1/2 p-6">
                  <label
                    htmlFor="toDate"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    To Date
                  </label>
                  <input
                    type="date"
                    id="toDate"
                    name="toDate"
                    value={formData.toDate}
                    onChange={handleChange}
                    className="bg-white border border-black text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="To Date"
                    required
                  />
                </div>
              </div>
              <div className="pl-3">
                <button
                  className="Submit-button whitespace-nowrap bg-[#3f9e04] hover:bg-[#3f9e04d3]"
                  type="submit"
                >
                  <i class="ri-save-fill"> </i>
                  Get Details
                </button>
              </div>
            </form>
          </div>
          {show && (
            <div
              className={` border-[#00000047] border-2 p-9 rounded-md bg-white" `}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <CopyButton data={data} />
                  <ExcelButton data={data} filename={"history.xlsx"} />
                  <CSVButton data={data} filename={"history.csv"} />
                  <PDFButton tableRef={tableRef} filename={"History.pdf"} />
                </div>
                <SearchElement onSearch={handleSearch} />
              </div>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table
                  className="w-full text-sm text-left rtl:text-right text-black shadow-sm"
                  ref={tableRef}
                >
                  <thead className="bg-white">
                    <tr>
                      <th scope="col" className="px-2 py-3 border">
                        S.No.
                      </th>
                      <th scope="col" className="px-6 py-3 border">
                        Debited From
                      </th>
                      <th scope="col" className="px-6 py-3 border">
                        Transferred Point
                      </th>
                      <th scope="col" className="px-6 py-3 border">
                        Credited To
                      </th>
                      <th scope="col" className="px-6 py-3 border">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 border">
                        Created On
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {memoizedFilteredProducts.map((product, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-gray-400" : "bg-white"}
                      >
                        <td className="px-6 py-4 font-medium text-black whitespace-nowrap  border">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 font-medium text-black whitespace-nowrap  border">
                          {product.sender}
                        </td>
                        <td className="px-6 py-4 border">{product.amount}</td>
                        <td className="px-6 py-4 border">
                          {product.recipient}
                        </td>
                        <td className="px-6 py-4 border">{product.status}</td>
                        <td className="px-6 py-4 border">
                          {product.transferDate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchEntrydata;
