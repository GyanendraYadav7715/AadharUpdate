import React, { useEffect, useState, useRef } from "react";
import { Local_Url } from "../../../constant/constant";
import axios from "axios";
import CopyButton from "../../../Components/DownloadAction/CopyButton";
import ExcelButton from "../../../Components/DownloadAction/ExcelButton";
import CSVButton from "../../../Components/DownloadAction/CSVButton";
import PDFButton from "../../../Components/DownloadAction/PDFButton";
import SearchElement from "../../../Components/SearchElement/SearchElement";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Asidebar from "../../../Components/Asidebar/Asidebar";
import Breadcrumb from "../../../Components/BreadCrumb/Breadcrumb";
import { Link } from "react-router-dom";

const ViewUser = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    const apiUrl = `${Local_Url}/api/v1/admin/all-users`;

    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((err) => {
        console.log("Something Went Wrong");
        setError(err);
      });
  }, []);

  useEffect(() => {
    setFilteredProducts(data);
  }, [data]);

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

  const copyToClipboard = () => {
    const el = document.createElement("textarea");
    el.value = data
      .map((product) => Object.values(product).join("\t"))
      .join("\n");
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  const exportToExcel = () => {
    try {
      if (tableRef.current && tableRef.current.table) {
        console.log("Exporting to Excel...");
        tableRef.current.table.download("xlsx", "history.xlsx");
      } else {
        console.error("Table or table ref is not defined");
      }
    } catch (error) {
      console.error("Error exporting to Excel:", error);
    }
  };

  const exportToPDF = () => {
    html2canvas(tableRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("history.pdf");
    });
  };

  return (
    <>
      <Breadcrumb
        title="View User Data"
        links={[
          { title: "Home", href: "/superadmin" },
          { title: "View User Data", href: "" },
        ]}
        mylinks={[
          {
            to: "/adduser",
            text: "Create New",
            icon: "ri-add-line text-white text-2xl",
          },
        ]}
      />
      <div className="p-4 sm:ml-64 bg-gray-200">
        <div className="p-4 border-2 border-gray-200 border-solid rounded-lg bg-white ">
          <h3 className="text-2xl font-semibold">View User Data-ADMIN</h3>
          <div className="flex items-center justify-between mb-4 mt-4">
            <div>
              <CopyButton data={data} />
              <ExcelButton data={data} filename={"ViewUser.xlsx"} />
              <CSVButton data={data} filename={"ViewUser.csv"} />
              <PDFButton tableRef={tableRef} filename={"ViewUser.pdf"} />
            </div>
            <SearchElement onSearch={handleSearch} />
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table
              className="w-full text-sm text-left rtl:text-right text-black shadow-sm"
              ref={tableRef}
            >
              <thead className="text-base text-black bg-white">
                <tr>
                  <th
                    scope="col"
                    className="px-2 py-3 border whitespace-nowrap"
                  >
                    Serial No.
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 border whitespace-nowrap"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 border whitespace-nowrap"
                  >
                    Mobile Number
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 border whitespace-nowrap"
                  >
                    User Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 border whitespace-nowrap"
                  >
                    Password
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 border whitespace-nowrap"
                  >
                    Created By
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 border whitespace-nowrap"
                  >
                    Balance
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 border whitespace-nowrap"
                  >
                    Child Point
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 border whitespace-nowrap"
                  >
                    Mobile Point
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 border whitespace-nowrap"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 border whitespace-nowrap"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-400" : "bg-white"}
                  >
                    <td className="px-6 py-4 font-medium text-black whitespace-nowrap border">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 font-medium text-black whitespace-nowrap border">
                      {product.Name}
                    </td>
                    <td className="px-6 py-4 border">{product.Phone_n}</td>
                    <td className="px-6 py-4 border">{product.Username}</td>
                    <td className="px-6 py-4 border">{product.Password}</td>
                    <td className="px-6 py-4 border">{product.CreateBy}</td>
                    <td className="px-6 py-4 border">{product.Balance}</td>
                    <td className="px-6 py-4 border">{product.Child_token}</td>
                    <td className="px-6 py-4 border">{product.mobilePoint}</td>
                    <td className="px-6 py-4 border">{product.status}</td>
                    <td className="px-6 py-4 gap-2 flex items-center justify-between">
                      <Link
                        to="#"
                        className="font-medium text-blue-600 no-underline hover:underline border-1 bg-green-600 px-3 py-3 rounded-md"
                      >
                        <i className="ri-refresh-line text-white"></i>
                      </Link>
                      <button
                        onClick={() => deleteProduct(index)}
                        className="font-medium text-blue-600 no-underline hover:underline border-1 bg-red-600 px-3 py-3 rounded-md"
                      >
                        <i className="ri-delete-bin-line text-white"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewUser;
