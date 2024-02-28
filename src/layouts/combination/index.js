// Material Dashboard 2 React components
import React from "react";
import { Outlet } from "react-router-dom";
// import { useParams } from "react-router-dom";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { FormProvider, useForm } from "react-hook-form";

// import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Overview page components
import Card from "@mui/material/Card";

import Header from "./components/Header";
// import { RequestForm } from "./forms/requestForm";
// import ReleaseFrom from "./forms/releaseForm";

function Overview() {
  // const { formName } = useParams();

  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
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
                Form Fill Up
              </MDTypography>
            </MDBox>
            <div style={{ marginTop: "20px", marginInline: "1rem" }}>
              <Header />
            </div>
            {/* <div>{formName === "RequestSetupParams" ? <RequestForm /> : null}</div>
            <div>{formName === "ReleaseTest" ? <ReleaseFrom /> : null}</div> */}
            <Outlet />
          </Card>
        </MDBox>
      </DashboardLayout>
    </FormProvider>
  );
}

export default Overview;
