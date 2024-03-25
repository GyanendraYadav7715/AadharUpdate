import React from "react";
import Breadcrumb from "../BreadCrumb/Breadcrumb";
import { useLocation } from "react-router-dom";
import { CustomInput2 } from "../CustomeInput/CustomInput";
const EditView = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get("name");
  const fname = searchParams.get("fname");
  const dob = searchParams.get("dob");
  const aadhar = searchParams.get("aadhar");
  const mobile = searchParams.get("mobile");
  const email = searchParams.get("email");
  const FingerPrint1 = searchParams.get("FingerPrint1");
  const FingerPrint2 = searchParams.get("FingerPrint2");
  const FingerPrint3 = searchParams.get("FingerPrint3");
  const FingerPrint4 = searchParams.get("FingerPrint4");
  const FingerPrint5 = searchParams.get("FingerPrint5");
  const purpose = searchParams.get("purpose");
  const POI = searchParams.get("POI")
  const POA = searchParams.get("POA");
    const POB = searchParams.get("POB");

  const title = "Edit Customer";
  const links = [
    { title: "Home", href: "/backoffice" },
    { title: "Edit Customer" },
  ];

  
  const downloadPDF = (url, color) => {
    //Create a temporary anchor element
    const link = document.createElement("a");
    link.href = url;
    link.download = `document_${color}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
  };
  const images = [
    FingerPrint1,
    FingerPrint2,
    FingerPrint3,
    FingerPrint4,
    FingerPrint5,
  ];

  return (
    <>
      <Breadcrumb title={title} links={links}  />
      <div className="p-3 sm:ml-64 bg-gray-100">
        <div className="p-4 border-2 border-gray-200 border-solid rounded-lg bg-white">
          <div className="grid grid-cols-1 gap-4 mb-4 ">
            <h3 className="text-2xl font-semibold">Edit Customer</h3>
            <div className="flex justify-start gap-3 mt-3 ml-8">
              <button
                onClick={() =>
                  downloadPDF( POI, "green")
                }
                className="px-5 py-2 border border-green-400 bg-green-500 hover:bg-green-600 text-white rounded-md hover:duration-150"
              >
                Download POI PDF
              </button>
              <button
                onClick={() =>
                  downloadPDF( POA, "blue")
                }
                className="px-5 py-2 border border-blue-400 bg-blue-500 hover:bg-blue-600 text-white rounded-md hover:duration-150"
              >
                Download POA PDF
              </button>
              <button
                onClick={() =>
                  downloadPDF( POB, "pink")
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
                placeholder={name}
                disabled
              />
              <CustomInput2
                label="Father Name"
                type="text"
                name="FatherName"
                placeholder={fname}
                disabled
              />
              <CustomInput2
                label="Date of Birth"
                type="text"
                name="DOB"
                placeholder={dob}
                disabled
              />
              <CustomInput2
                label="Purpose"
                type="text"
                name="Purpose"
                placeholder={purpose}
                disabled
              />
              <div></div>
              <div></div>
              <CustomInput2
                label="Aadhaar No."
                type="tel"
                name="AadhaarNo"
                placeholder={aadhar}
                disabled
              />

              <CustomInput2
                label="Mobile No."
                type="text"
                name="MobileNo"
                placeholder={mobile}
                disabled
              />
              <CustomInput2
                label="E-mail ID"
                type="email"
                name="Email"
                placeholder={email}
              />
            </div>

            <div className="container grid grid-cols-5 px-5">
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
