/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
// import authorsTableData from "layouts/home/data/authorsTableData";
import documentsTableData from "layouts/home/data/documentsTableData";

// Dashboard components
// import Projects from "layouts/dashboard/components/Projects";
// import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

import react from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import PDFViewer from "./PDFViewer";

function Home() {
  // const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows, isModalOpen, setIsModalOpen } = documentsTableData();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();
  react.useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/valid",
    })
      .then((res) => {
        if (res.data.valid) {
          navigate("/home"); // Navigate to the home page
        } else {
          navigate("/authentication/sign-in"); // Navigate to the home page
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [navigate]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "80%",
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
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
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
                <MDTypography variant="h6" color="white">
                  Splice Designs
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Fade in={isModalOpen}>
            <Box sx={style}>
              <MDTypography id="transition-modal-title" variant="h6" component="h2">
                File-Name
              </MDTypography>
              <MDTypography id="transition-modal-description" sx={{ mt: 2 }}>
                Description
              </MDTypography>
              <PDFViewer />
            </Box>
          </Fade>
        </Modal>
      )}
      {/* <MDBox pt={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
              <PDFViewer />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox> */}
    </DashboardLayout>
  );
}

export default Home;
