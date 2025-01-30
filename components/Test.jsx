"use client";
import React from "react";

const Test = () => {
  const handleDownload = () => {
    const flipbookData = {
      pdfFile: "demo.pdf",
      width: 800,
      height: 1100,
      showCover: false,
      flippingTime: 1000,
      startPage: 0,
    };

    const jsonString = JSON.stringify(flipbookData, null, 2); // Convert JSON to string
    const blob = new Blob([jsonString], { type: "application/json" }); // Create a Blob
    const url = URL.createObjectURL(blob); // Create a temporary URL

    // Create a hidden download link
    const a = document.createElement("a");
    a.href = url;
    a.download = "myBook.flipbook"; // File name
    document.body.appendChild(a);
    a.click(); // Trigger download
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Cleanup
  };

  return (
    <button
      onClick={handleDownload}
      className="p-2 bg-blue-500 text-white rounded"
    >
      Download Flipbook
    </button>
  );
};

export default Test;

// --------------------------------

export const UploadFile = () => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          setPdfUrl(jsonData.pdfUrl);
          setFlipbookSettings(jsonData.settings);
        } catch (error) {
          console.error("Invalid file format:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".flipbook"
        onChange={handleFileUpload}
        className="mb-4"
      />
    </div>
  );
};
