import React, {  useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Local_Url } from "../../constant/constant";
import FileUpload from "../FileUpload/FileUpload";

const Upload = () => {
  const navigate =useNavigate()
   const location = useLocation();
   const searchParams = new URLSearchParams(location.search);
   const entrytype = searchParams.get("entrytype");
   const apply = searchParams.get("apply");
   const time = searchParams.get("time");
  const type = searchParams.get("type");
  
  
  const [formData, setFormData] = useState({
    appliedBy: apply,
    timestamp: time,
    User_type: type,
    entryType: entrytype,
    oSlip: "",
     
  });

  const handleSubmit = async () => {
    if (!formData.oSlip) {
      return toast.error("Please fill all the required fields");
    }

    try {
      const apiUrl = `${Local_Url}/api/v1/admin/uploadOSlip`;
      const response = await axios.post(apiUrl, formData);

      console.log(response.data);
      // Show success message
      toast.success(response.data.message);
      
      setTimeout(() => {
         navigate("/adminreport");
      }, 200);
       
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleCancel = () => {
     navigate("/adminreport");
     
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-1/4">
          <h2 className="text-xl font-semibold mb-4">
            Upload Acknowledgement Slip
          </h2>
          <FileUpload
            name="Acknowledgement Slip"
            onFileUpload={(imageUrl) =>
              setFormData((prevFormData) => ({
                ...prevFormData,

                oSlip: imageUrl,
              }))
            }
          />

          <div className="flex justify-end mt-6">
            <button
              onClick={handleCancel}
              className="px-4 py-2 mr-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Upload;
