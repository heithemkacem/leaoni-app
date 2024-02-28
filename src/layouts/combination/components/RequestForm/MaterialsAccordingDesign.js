/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import { ComboBox } from "components/MyComponents/ComboBox";
import CheckboxInput from "components/MyComponents/CheckboxInput";
import AdornmentInput from "components/MyComponents/AdornmentInput";
import MDButton from "components/MDButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid, Divider, Modal } from "@mui/material";
import { useFormContext, useFieldArray } from "react-hook-form";
import axios from "axios";
import { saveAs } from "file-saver";

export default function MaterialsAccordingDesign() {
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

  const SpliceTypeData = [
    { name: "End-Splice", value: "End Splice" },
    { name: "Parallel-Splice", value: "Parallel Splice" },
    { name: "Ring Terminal", value: "Ring Terminal" },
  ];

  const [isEndSpliceSelected, setIsEndSpliceSelected] = useState(false);

  const handleSpliceTypeChange = (event) => {
    console.log("handleSpliceTypeChange triggered");
    const selectedSpliceType = event.target.value;
    console.log("selectedSpliceType:", selectedSpliceType);
    setIsEndSpliceSelected(
      selectedSpliceType === "End Splice" || selectedSpliceType === "Ring Terminal"
    );
  };

  const [wiretypesOptions, setWiretypesOptions] = useState([]);

  const [ShrinksleeveOptions, setShrinksleeveOptions] = useState([]);

  const [glueOptions, setGlueOptions] = useState([]);

  useEffect(() => {
    const fetchWiretypes = async () => {
      try {
        const response = await fetch("http://localhost:4000/showWiretype");

        if (response.ok) {
          const data = await response.json();
          setWiretypesOptions(data);
        } else {
          console.error("Failed to fetch wiretypes:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error fetching wiretypes:", error);
      }
    };
    fetchWiretypes();
  }, []);

  useEffect(() => {
    const fetchShrinksleeves = async () => {
      try {
        const response = await fetch("http://localhost:4000/showShrinksleeve");

        if (response.ok) {
          const data = await response.json();
          setShrinksleeveOptions(data);
        } else {
          console.error("Failed to fetch shrinksleeves:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error fetching shrinksleeves:", error);
      }
    };
    fetchShrinksleeves();
  }, []);

  useEffect(() => {
    const fetchGlues = async () => {
      try {
        const response = await fetch("http://localhost:4000/showGlue");

        if (response.ok) {
          const data = await response.json();
          setGlueOptions(data);
        } else {
          console.error("Failed to fetch glues:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error fetching glues:", error);
      }
    };
    fetchGlues();
  }, []);

  const methods = useFormContext();

  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const submit = (formData) => {
    const modifiedData = { ...formData };

    modifiedData.documentType = "Request Setup Parameters";
    modifiedData.Sleeve_Cross_Section = parseFloat(modifiedData.Sleeve_Cross_Section);

    if (isEndSpliceSelected) {
      delete modifiedData.side2;
    }

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

  const {
    fields: side1Fields,
    append: appendSide1,
    remove: removeSide1,
  } = useFieldArray({
    control: methods.control,
    name: "side1",
  });

  const {
    fields: side2Fields,
    append: appendSide2,
    remove: removeSide2,
  } = useFieldArray({
    control: methods.control,
    name: "side2",
  });

  useEffect(() => {
    // Ensure minimum of one field on each side
    if (side1Fields.length === 0) {
      appendSide1({});
    }
    if (side2Fields.length === 0) {
      appendSide2({});
    }
  }, [appendSide1, appendSide2, side1Fields.length, side2Fields.length]);

  return (
    <div>
      <MDBox component="form" role="form" onSubmit={methods.handleSubmit(submit)}>
        <MDTypography variant="h4" fontWeight="medium" textTransform="capitalize" mb={5}>
          Materials according design
        </MDTypography>
        <section>
          <MDBox display="flex" flexDirection="column" justifyContent="space-around" mt={3} mb={3}>
            <h5>Select Splice Type</h5>
            <MDBox display="flex" flexDirection="row" mt={3} mb={3} ml={5}>
              <div className="col-span-2">
                <CheckboxInput
                  name="Splice_Type"
                  options={SpliceTypeData}
                  control={methods.control}
                  onChange={handleSpliceTypeChange}
                />
              </div>
            </MDBox>
          </MDBox>
        </section>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} xl={6} sx={{ display: "flex" }}>
            <section style={{ flexGrow: 1 }}>
              <MDTypography variant="h5" fontWeight="medium" textTransform="capitalize" mb={3}>
                Side 1
              </MDTypography>

              <h5>Select Wire</h5>
              <MDBox display="flex" flexDirection="column" justifyContent="space-around" mb={3}>
                {side1Fields.map((item, index) => (
                  <MDBox
                    display="flex"
                    flexDirection="row"
                    mt={3}
                    ml="13%"
                    gap={2}
                    flexWrap="wrap"
                    key={item.id}
                  >
                    <ComboBox
                      name={`side1.[${index}].wiretype`}
                      label="Wire Type"
                      placeholder="Select a wire"
                      options={wiretypesOptions}
                      width="11rem"
                      control={methods.control}
                    />
                    <AdornmentInput
                      name={`side1.[${index}].cross_section`}
                      ind="mm²"
                      helperText="Cross section"
                      width="8rem"
                      control={methods.control}
                    />
                    {index !== 0 && (
                      <MDButton
                        variant="gradient"
                        color="error"
                        startIcon={<DeleteIcon />}
                        sx={{
                          height: "44.1334px",
                        }}
                        onClick={() => removeSide1(index)}
                      >
                        Remove
                      </MDButton>
                    )}
                  </MDBox>
                ))}

                <MDBox display="flex" justifyContent="center" mt={3} ml="13%">
                  <MDButton
                    variant="gradient"
                    color="info"
                    sx={{ width: "35%" }}
                    onClick={() => appendSide1({})}
                  >
                    Add ComboBox
                  </MDButton>
                </MDBox>
              </MDBox>
            </section>
            <Divider orientation="vertical" flexItem />
          </Grid>

          {isEndSpliceSelected ? (
            <> </>
          ) : (
            <Grid item xs={12} md={6} xl={6} sx={{ display: "flex" }}>
              <section style={{ flexGrow: 1 }}>
                <MDTypography variant="h5" fontWeight="medium" textTransform="capitalize" mb={3}>
                  Side 2
                </MDTypography>

                <h5>Select Wire</h5>
                <MDBox display="flex" flexDirection="column" justifyContent="space-around" mb={3}>
                  {side2Fields.map((item, index) => (
                    <MDBox
                      display="flex"
                      flexDirection="row"
                      mt={3}
                      ml="13%"
                      gap={2}
                      flexWrap="wrap"
                      key={item.id}
                    >
                      <ComboBox
                        name={`side2.[${index}].wiretype`}
                        label="Wire Type"
                        placeholder="Select a wire"
                        options={wiretypesOptions}
                        width="11rem"
                        control={methods.control}
                      />
                      <AdornmentInput
                        name={`side2.[${index}].cross_section`}
                        ind="mm²"
                        helperText="Cross section"
                        width="8rem"
                        control={methods.control}
                      />
                      {index !== 0 && (
                        <MDButton
                          variant="gradient"
                          color="error"
                          startIcon={<DeleteIcon />}
                          sx={{
                            height: "44.1334px",
                          }}
                          onClick={() => removeSide2(index)}
                        >
                          Remove
                        </MDButton>
                      )}
                    </MDBox>
                  ))}

                  <MDBox display="flex" justifyContent="center" mt={3} ml="13%">
                    <MDButton
                      variant="gradient"
                      color="info"
                      sx={{ width: "35%" }}
                      onClick={() => appendSide2({})}
                    >
                      Add ComboBox
                    </MDButton>
                  </MDBox>
                </MDBox>
              </section>
              <Divider orientation="vertical" flexItem />
            </Grid>
          )}
        </Grid>
        <section>
          <MDBox display="flex" flexDirection="column" justifyContent="space-around" mb={3}>
            <h5>Select Sleeve</h5>
            <MDBox display="flex" flexDirection="row" mt={3} mb={3} ml={5} gap={2} flexWrap="wrap">
              <ComboBox
                control={methods.control}
                name="Sleeve_Type"
                label="Sleeve Type"
                placeholder="Select sleeve"
                options={ShrinksleeveOptions}
                width="11rem"
              />
              <AdornmentInput
                name="Sleeve_Cross_Section"
                ind="mm²"
                helperText="Cross section"
                helper="Cross Section"
                width="8rem"
                control={methods.control}
              />
            </MDBox>
          </MDBox>
        </section>
        <section>
          <MDBox display="flex" flexDirection="column" justifyContent="space-around" mb={3}>
            <h5>Select Additional Glue</h5>
            <MDBox display="flex" flexDirection="row" mt={3} mb={3} ml={5} gap={2} flexWrap="wrap">
              <ComboBox
                control={methods.control}
                name="Additional_Glue"
                label="Additional Glue"
                placeholder="Select glue"
                options={glueOptions}
                width="11rem"
              />
            </MDBox>
          </MDBox>
          <MDBox display="flex" justifyContent="center" mb={3} mx="auto" sx={{ width: "70%" }}>
            {/* <DropzoneInput
            name="file"
            label="Upload Image"
            acceptedFiles={["image/*"]}
            dropzoneText="Please insert the design of the splice"
          /> */}
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
