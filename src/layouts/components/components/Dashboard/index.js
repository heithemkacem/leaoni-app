/* eslint-disable no-console */

import { useState } from "react";

import axios from "axios";

import Header from "layouts/components/components/Header";

// @mui material components
import Card from "@mui/material/Card";
// import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
// import Tooltip from "@mui/material/Tooltip";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";

import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";

// Material Dashboard 2 React components

import MDBox from "components/MDBox";

import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import { useForm, FormProvider } from "react-hook-form";
import DataTable from "examples/Tables/DataTable";
import { TextInput } from "components/MyComponents/TextInput";
import { ComboBox } from "components/MyComponents/ComboBox";
import { useNavigate } from "react-router-dom";
import machinesData from "./Machines";

function Dashboard() {
  const navigate = useNavigate();

  const methods = useForm();

  const {
    columns: pColumns,
    rows: pRows,
    fetchMachines,
    isEditModalOpen,
    setIsEditModalOpen,
    editMachineData,
  } = machinesData();

  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);

  const handleInsert = () => {
    // Open the modal
    setIsInsertModalOpen(true);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setIsInsertModalOpen(false);
  };

  const shrinkCategoryOptions = [
    { name: "Single Shrink", value: "Single Shrink" },
    { name: "Multiple Shrink", value: "Multiple Shrink" },
  ];

  const submit = (data) => {
    console.log(data);

    axios({
      method: "POST",
      data,
      withCredentials: true,
      url: "http://localhost:4000/machine",
    })
      .then((res) => {
        console.log(res);
        if (res.data.Login) {
          navigate("/home"); // Navigate to the home page
        }
        fetchMachines();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    height: "45%",
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

  return (
    <FormProvider {...methods}>
      <Card id="delete-account">
        <MDBox
          mx={2}
          mt={-3}
          py={3}
          px={2}
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
        >
          <MDTypography variant="h6" fontWeight="medium" color="white">
            Modify Components
          </MDTypography>
        </MDBox>
        <div style={{ marginTop: "20px", marginInline: "1rem" }}>
          <Header />
        </div>
        <MDBox p={2}>
          <MDBox display="flex" justifyContent="flex-end" marginRight="1rem">
            <MDButton variant="gradient" color="dark" onClick={handleInsert}>
              <Icon sx={{ fontWeight: "bold" }}>add</Icon>
              &nbsp;add new Machine
            </MDButton>
          </MDBox>
          <DataTable table={{ columns: pColumns, rows: pRows }} />
        </MDBox>
        {(isInsertModalOpen || isEditModalOpen) && (
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isInsertModalOpen || isEditModalOpen}
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
            <Fade in={isInsertModalOpen || isEditModalOpen}>
              <Box sx={style}>
                {isInsertModalOpen && (
                  <MDTypography
                    id="transition-modal-title"
                    variant="h4"
                    component="h2"
                    sx={{ mb: "2rem" }}
                  >
                    Insert a new machine
                  </MDTypography>
                )}

                {isEditModalOpen && (
                  <MDTypography
                    id="transition-modal-title"
                    variant="h4"
                    component="h2"
                    sx={{ mb: "2rem" }}
                  >
                    Edit Machine
                  </MDTypography>
                )}
                <MDBox
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  height="100%"
                >
                  {isInsertModalOpen && (
                    <MDBox display="flex" flexWrap="wrap" gap="1rem" justifyContent="center">
                      <MDBox width="48%">
                        <MDTypography variant="h6">Name</MDTypography>
                        <TextInput
                          name="name"
                          placeholder="insert machine's name"
                          control={methods.control}
                          width="100%"
                        />
                      </MDBox>
                      <MDBox width="48%">
                        <MDTypography variant="h6">Supplier</MDTypography>
                        <TextInput
                          name="supplier"
                          placeholder="insert machine's supplier"
                          control={methods.control}
                          width="100%"
                        />
                      </MDBox>
                      <MDBox width="48%">
                        <MDTypography variant="h6">Category</MDTypography>
                        <TextInput
                          name="category"
                          placeholder="insert machine's category"
                          control={methods.control}
                          width="100%"
                        />
                      </MDBox>
                      <MDBox width="48%">
                        <MDTypography variant="h6">Shrink Category</MDTypography>
                        <ComboBox
                          name="shrinkCategory"
                          placeholder="insert machine's shrink category"
                          options={shrinkCategoryOptions}
                          control={methods.control}
                          width="100%"
                        />
                      </MDBox>
                    </MDBox>
                  )}
                  {isEditModalOpen && (
                    <MDBox display="flex" flexWrap="wrap" gap="1rem" justifyContent="center">
                      <MDBox width="48%">
                        <MDTypography variant="h6">Name</MDTypography>
                        <TextInput
                          name="name"
                          placeholder="insert machine's name"
                          control={methods.control}
                          defaultValue={editMachineData.name}
                          width="100%"
                        />
                      </MDBox>
                      <MDBox width="48%">
                        <MDTypography variant="h6">Supplier</MDTypography>
                        <TextInput
                          name="supplier"
                          placeholder="insert machine's supplier"
                          control={methods.control}
                          defaultValue={editMachineData.supplier}
                          width="100%"
                        />
                      </MDBox>
                      <MDBox width="48%">
                        <MDTypography variant="h6">Category</MDTypography>
                        <TextInput
                          name="category"
                          placeholder="insert machine's category"
                          control={methods.control}
                          defaultValue={editMachineData.category}
                          width="100%"
                        />
                      </MDBox>
                      <MDBox width="48%">
                        <MDTypography variant="h6">Shrink Category</MDTypography>
                        <ComboBox
                          name="shrinkCategory"
                          placeholder="insert machine's shrink category"
                          options={shrinkCategoryOptions}
                          control={methods.control}
                          defaultValue={editMachineData.shrinkCategory}
                          width="100%"
                        />
                      </MDBox>
                    </MDBox>
                  )}

                  {isInsertModalOpen && (
                    <MDBox
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginRight: "1rem",
                      }}
                    >
                      <MDButton
                        sx={{ width: "9%" }}
                        variant="gradient"
                        color="info"
                        type="submit"
                        onClick={methods.handleSubmit(submit)}
                      >
                        Save
                      </MDButton>
                    </MDBox>
                  )}
                  {isEditModalOpen && (
                    <MDBox
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginRight: "1rem",
                      }}
                    >
                      <MDButton
                        sx={{ width: "9%" }}
                        variant="gradient"
                        color="info"
                        type="submit"
                        onClick={methods.handleSubmit(submit)}
                      >
                        Edit
                      </MDButton>
                    </MDBox>
                  )}
                </MDBox>
              </Box>
            </Fade>
          </Modal>
        )}
      </Card>
    </FormProvider>
  );
}

export default Dashboard;
