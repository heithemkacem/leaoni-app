import React, { useState } from "react";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
// import Dropzone from "dropzone";

export default function ReleaseTestImportation() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = (testType) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("Release", testType);

    fetch("http://localhost:4000/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        // Handle success or display a message to the user
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error or display an error message to the user
      });
  };

  return (
    <MDBox>
      <MDTypography variant="h4" fontWeight="medium" mb={5}>
        Import Release Test File
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
