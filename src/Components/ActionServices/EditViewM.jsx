import React from "react";
import Breadcrumb from "../BreadCrumb/Breadcrumb";
import { json, useLocation } from "react-router-dom";
import { CustomInput2 } from "../CustomeInput/CustomInput";
import queryString from "query-string";

const EditView = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { fingerprints, } = queryString.parse(location.search);
  const name = searchParams.get("name");
  const fname = searchParams.get("fname");
  const dob = searchParams.get("dob");
  const aadhar = searchParams.get("aadhar");
  const mobile = searchParams.get("mobile");
  const email = searchParams.get("email");
  const purpose = searchParams.get("purpose");
  const finger = JSON.parse(decodeURIComponent(fingerprints));
//   const Proof = JSON.parse(decodeURIComponent(proof));

  //FINGER PRINT ALL WORK
  const fingerprintUrls = finger.map((fingerprint) => {
    const { _id, ...fingerprintWithoutId } = fingerprint; // Exclude _id
    return Object.values(fingerprintWithoutId);
  });
  const images = fingerprintUrls.flat();

  //PROOF ALL WORK
//   const ProoftUrls = Proof.map((proofs) => {
//     const { _id, ...proofsWithoutId } = proofs; // Exclude _id
//     return Object.values(proofsWithoutId);
//   });
//   const PDF = ProoftUrls.flat();
//   const POA = PDF[0];
//   const POB = PDF[1];
//   const POI = PDF[2];

  const title = "Edit Customer";
  const links = [
    { title: "Home", href: "/backoffice" },
    { title: "Edit Customer" },
  ];

  const downloadPDF = (url, color) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `document_${color}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Breadcrumb title={title} links={links} />
      <div className="p-3 sm:ml-64 bg-gray-100">
        <div className="p-4 border-2 border-gray-200 border-solid rounded-lg bg-white">
          <div className="grid grid-cols-1 gap-4 mb-4 ">
            <h3 className="text-2xl font-semibold">Edit Customer</h3>
            <div className="flex justify-start gap-3 mt-3 ml-8">
              <button
                onClick={() => downloadPDF(POI, "green")}
                className="px-5 py-2 border border-green-400 bg-green-500 hover:bg-green-600 text-white rounded-md hover:duration-150"
              >
                Download POI PDF
              </button>
              <button
                onClick={() => downloadPDF(POA, "blue")}
                className="px-5 py-2 border border-blue-400 bg-blue-500 hover:bg-blue-600 text-white rounded-md hover:duration-150"
              >
                Download POA PDF
              </button>
              <button
                onClick={() => downloadPDF(POB, "pink")}
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

            <div className="container grid grid-cols-5 px-8 gap-3">
              {images.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Image ${index + 1}`}
                  className="w-full h-auto border-2 border-black "
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
