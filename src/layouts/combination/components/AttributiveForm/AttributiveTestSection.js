import React, { useState } from "react";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
// import Dropzone from "dropzone";

export default function AttributiveTestImportation() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = (testType) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("Attributive", testType);

    fetch("http://localhost:4000/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <MDBox>
      <MDTypography variant="h4" fontWeight="medium" mb={5}>
        Import Attributive Test File
      </MDTypography>
      <MDBox>
        <form>
          <input type="file" name="file" onChange={handleFileChange} />
          <button type="button" onClick={handleUpload}>
            Upload
          </button>
        </form>
      </MDBox>
    </MDBox>
  );
}
