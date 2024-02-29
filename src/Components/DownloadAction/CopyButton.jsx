import React from "react";

const CopyButton = ({ data }) => {
  const copyToClipboard = () => {
    const el = document.createElement("textarea");
    el.value = data.map((data) => Object.values(data).join("\t")).join("\n");
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    alert("Cpoied");
  };

  return (
    <button
      onClick={copyToClipboard}
      className="px-6 py-3 mr-2 text-sm font-medium text-white bg-[#506ADB] rounded-sm hover:bg-blue-700"
    >
      Copy
    </button>
  );
};

export default CopyButton;
