import React from "react";
import Breadcrumb from "../BreadCrumb/Breadcrumb";
import { CustomInput2 } from "../CustomeInput/CustomInput";
import { useLocation } from "react-router-dom";
const EditView = () => {

   const location = useLocation();
   const searchParams = new URLSearchParams(location.search);
   
 
  const title = "Edit Customer";
  const links = [
    { title: "Home", href: "/backoffice" },
    { title: "Edit Customer" },
  ];

  const mylinks = [
    {
      to: "/viewuser",
      text: "View Customer",
      icon: "ri-team-line text-white text-2xl ",
    },
  ];
  const downloadPDF = (url, color) => {
    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = url;
    link.download = `document_${color}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const images = [
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
  ];

  return (
    <>
      <Breadcrumb title={title} links={links} mylinks={mylinks} />
      <div className="p-3 sm:ml-64 bg-gray-100">
        <div className="p-4 border-2 border-gray-200 border-solid rounded-lg bg-white">
          <div className="grid grid-cols-1 gap-4 mb-4 ">
            <h3 className="text-2xl font-semibold">Edit Customer</h3>
            <div className="flex justify-start gap-3 mt-3">
              <button
                onClick={() =>
                  downloadPDF("https://example.com/green.pdf", "green")
                }
                className="px-5 py-2 border border-green-400 bg-green-500 hover:bg-green-600 text-white rounded-md hover:duration-150"
              >
                Download POI PDF
              </button>
              <button
                onClick={() =>
                  downloadPDF("https://example.com/blue.pdf", "blue")
                }
                className="px-5 py-2 border border-blue-400 bg-blue-500 hover:bg-blue-600 text-white rounded-md hover:duration-150"
              >
                Download POA PDF
              </button>
              <button
                onClick={() =>
                  downloadPDF("https://example.com/pink.pdf", "pink")
                }
                className="px-5 py-2 border border-pink-400 bg-pink-500 hover:bg-pink-600 text-white rounded-md hover:duration-150"
              >
                Download POB PDF
              </button>
            </div>
            <div className="formGrid">
              <CustomInput2
                label="Full Name"
                type="text"
                name="Name"
                placeholder={userData.Name}
                disabled
              />
              <CustomInput2
                label="Father Name"
                type="text"
                name="FatherName"
                placeholder={userData.FatherName}
              />
              <CustomInput2
                label="Date of Birth"
                type="date"
                name="DOB"
                placeholder={userData.DOA}
              />
              <CustomInput2
                label="Purpose"
                type="text"
                name="Purpose"
                placeholder="Enter Purpose"
              />
              <div></div>
              <div></div>
              <CustomInput2
                label="Aadhaar No."
                type="tel"
                name="AadhaarNo"
                placeholder={userData.AadhaarNo}
                maxLength={12}
              />

              <CustomInput2
                label="Mobile No."
                type="tel"
                name="MobileNo"
                placeholder={userData.MobileNo}
                maxLength={10}
              />
              <CustomInput2
                label="E-mail ID"
                type="email"
                name="Email"
                placeholder={userData.Email}
              />
            </div>

            <div className="container grid grid-cols-5">
              {images.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Image ${index + 1}`}
                  className="w-full h-auto"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditView;
