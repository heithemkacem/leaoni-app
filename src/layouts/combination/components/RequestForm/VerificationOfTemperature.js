/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */

import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import AdornmentInput from "components/MyComponents/AdornmentInput";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import TextAreaInput from "components/MyComponents/TextAreaInput";
import { Modal } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { saveAs } from "file-saver";

// import DropzoneInput from "components/MyComponents/DropzoneInput";

export default function SetupParameters() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    height: "20%",
    bgcolor: "background.paper",
    borderRadius: "1%",
    boxShadow: 24,
    p: 4,

    /* Displayed on top of other elements */
    zIndex: 9999,

    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  };

  const methods = useFormContext();
  const [avg, setAverage] = useState(0); // Initialize the average state

  // Function to calculate the average when input values change
  const calculateAverage = () => {
    const value1 = methods.getValues("Value1");
    const value2 = methods.getValues("Value2");
    const value3 = methods.getValues("Value3");

    // Calculate the average
    const average = (
      (parseInt(value1, 10) + parseInt(value2, 10) + parseInt(value3, 10)) /
      3
    ).toFixed(2);
    setAverage(average);
    // setAverage(average);
    console.log("Average:", average, " value1:", value1, " value2:", value2, " value3:", value3);
    console.log("avg:", avg);
    console.log(Number.isNaN(avg));
  };

  useEffect(() => {
    calculateAverage();
  }, [methods.watch("Value1"), methods.watch("Value2"), methods.watch("Value3")]);

  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const submit = (formData) => {
    const modifiedData = { ...formData };

    modifiedData.documentType = "Request Setup Parameters";
    modifiedData.Sleeve_Cross_Section = parseFloat(modifiedData.Sleeve_Cross_Section);

    console.log(modifiedData);
    axios({
      method: "POST",
      data: modifiedData,
      withCredentials: true,
      url: "http://localhost:4000/form",
    })
      .then((res) => {
        console.log(res);
        if (res.data.Login) {
          navigate("/home"); // Navigate to the home page
        } else {
          axios
            .get("http://localhost:4000/fetch-pdf", { responseType: "blob" })
            .then((response) => {
              const pdfBlob = new Blob([response.data], { type: "application/pdf" });
              saveAs(pdfBlob, "newpdf.pdf");
            })
            .catch((PDFError) => {
              console.error(PDFError);
            });
        }
      })
      .catch((anError) => {
        setError(anError);
        setIsErrorModalOpen(true);
        console.error(anError);
      });
  };

  const closeModal = () => {
    setIsErrorModalOpen(false);
  };

  return (
    <div>
      <MDBox component="form" role="form" onSubmit={methods.handleSubmit(submit)}>
        <MDTypography variant="h4" fontWeight="medium" textTransform="capitalize" mb={5}>
          Verification of Temperature
        </MDTypography>

        <section>
          <MDBox
            display="flex"
            justifyContent="center"
            flexDirection="row"
            mt={3}
            mb={3}
            ml={5}
            gap={2}
            flexWrap="wrap"
          >
            <MDBox>
              <h5>Value 1</h5>
              <AdornmentInput
                name="Value1"
                ind="°C"
                width="100%"
                control={methods.control}
                inputProps={{ type: "number" }}
              />
            </MDBox>

            <MDBox>
              <h5>Value 2</h5>
              <AdornmentInput
                name="Value2"
                ind="°C"
                width="100%"
                control={methods.control}
                inputProps={{ type: "number" }}
              />
            </MDBox>

            <MDBox>
              <h5>Value 3</h5>
              <AdornmentInput
                name="Value3"
                ind="°C"
                width="100%"
                control={methods.control}
                inputProps={{ type: "number" }}
              />
            </MDBox>
          </MDBox>
          <MDBox mt={3} mb={3} ml={5} display="flex" gap={2}>
            <h4>Average Value: </h4>
            {!Number.isNaN(avg) && <h4>{avg} °C</h4>}
          </MDBox>
        </section>
        <section>
          <MDBox mt={3} mb={3} ml={5}>
            <h5>Write a Remark</h5>
            <TextAreaInput
              name="technicianRemark"
              control={methods.control}
              placeholder="write your remark"
              width="90rem"
            />
            {/* <DropzoneInput name="frfr" /> */}
          </MDBox>
        </section>
        <MDBox sx={{ display: "flex", justifyContent: "flex-end", marginRight: "5rem" }}>
          <MDButton sx={{ width: "10%" }} variant="gradient" color="info" type="submit">
            Save
          </MDButton>
        </MDBox>
      </MDBox>
      <div>
        {isErrorModalOpen && (
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isErrorModalOpen}
            onClose={closeModal}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            {/* <link to={documentRoute.path.replace(":id",key)} */}
            <Fade in={isErrorModalOpen}>
              <Box sx={style}>
                <MDBox display="flex" flexWrap="wrap" gap="1rem" justifyContent="center">
                  <MDBox>
                    <MDTypography
                      variant="h4"
                      fontWeight="medium"
                      textTransform="capitalize"
                      mb={5}
                      color="error"
                    >
                      Error
                    </MDTypography>
                    <p>{error.message}</p>
                  </MDBox>
                  <MDButton onClick={closeModal}>.</MDButton>
                </MDBox>
              </Box>
            </Fade>
          </Modal>
        )}
      </div>
    </div>
  );
}
