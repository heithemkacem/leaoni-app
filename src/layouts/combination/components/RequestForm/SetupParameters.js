/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";

import AdornmentInput from "components/MyComponents/AdornmentInput";
import TextAreaInput from "components/MyComponents/TextAreaInput";
import { useFormContext } from "react-hook-form";
import { Modal } from "@mui/material";
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
          Setup Parameters
        </MDTypography>

        <section>
          <MDBox display="flex" flexDirection="row" mt={3} mb={3} ml={5} gap={2} flexWrap="wrap">
            <MDBox width="48%">
              <h5>Temperature</h5>
              <AdornmentInput
                name="Temperature"
                ind="+-5°C"
                width="100%"
                control={methods.control}
              />
            </MDBox>

            <MDBox width="48%">
              <h5>Time / Velocity</h5>
              <AdornmentInput
                name="Time_Velocity"
                ind="(s) / (cm/min) "
                width="100%"
                control={methods.control}
              />
            </MDBox>

            <MDBox width="48%">
              <h5>Cooling Time</h5>
              <AdornmentInput name="Cooling_Time" ind="s" width="100%" control={methods.control} />
            </MDBox>

            <MDBox width="48%">
              <h5>Core Temperature</h5>
              <AdornmentInput
                name="Core_Temperature"
                ind="+-7°C"
                width="100%"
                control={methods.control}
              />
            </MDBox>
          </MDBox>
        </section>
        <section>
          <MDBox mt={3} mb={3} ml={5}>
            <h5>Write a Remark</h5>
            <TextAreaInput
              name="PR_Remark"
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
