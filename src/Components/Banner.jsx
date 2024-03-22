import React from "react";

function Banner() {
  return (
    <div className="bg-gradient-to-r from-green-500 to-pink-500 py-4 px-8 rounded-md shadow-md text-center">
      <h1 className="text-3xl font-bold text-white">Important Updates</h1>
      <p className="text-lg text-white mt-4">
        चाइल्ड इनरोलमेंट स्टार्ट हो गया है सभी ऑपरेटर अपने डिस्ट्रीब्यूटर से बात
        करके स्टार्ट करवाले।
      </p>
      <p className="text-lg text-white mt-2">
        आप सभी को सूचित किया जाता है की, इस पोर्टल पे सिर्फ Mantra Device ही
        वर्क करेगा।
      </p>
      <p className="text-lg text-white mt-2">
        लेटेस्ट ड्राइवर यहां से डाउनलोड करें{" "}
        <a
          href="https://fingerprintdata.s3.ap-south-1.amazonaws.com/MantraSetup_and_Certification.rar"
          className="text-black underline"
        >
          Download Driver
        </a>
      </p>
    </div>
  );
}

export default Banner;
