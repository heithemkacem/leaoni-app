import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MDBox from "components/MDBox";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import CustomStepper from "components/MyComponents/CustomStepper";
import MaterialsAccordingDesign from "../components/RequestForm/MaterialsAccordingDesign";
import DocumentCreationSection from "../components/RequestForm/DocumentCreationSection";
import VerificationOfTemperature from "../components/RequestForm/VerificationOfTemperature";
import SetupParameters from "../components/RequestForm/SetupParameters";

export const getPercentage = (activeStep, steps) => {
  const completedSections = activeStep + 1;
  return (completedSections / steps.length) * 100;
};

export function RequestForm() {
  const { page } = useParams();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      page: "DocumentCreation",
      label: "Document Creation",
      component: <DocumentCreationSection />,
    },
    {
      page: "MaterialsAccordingDesign",
      label: "Materials According to Design",
      component: <MaterialsAccordingDesign />,
    },
    {
      page: "VerificationOfTemperature",
      label: "Verification of Temperature",
      component: <VerificationOfTemperature />,
    },
    {
      page: "SetupParameters",
      label: "Setup Parameters",
      component: <SetupParameters />,
    },
  ];

  const renderSection = () => {
    const step = steps.find((s) => s.page === page);
    return step ? step.component : null;
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const nextPage = activeStep + 1 < steps.length ? steps[activeStep + 1].page : null;
    if (nextPage) {
      navigate(`/combination/RequestSetupParams/${nextPage}`);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    const prevPage = activeStep - 1 >= 0 ? steps[activeStep - 1].page : null;
    if (prevPage) {
      navigate(`/combination/RequestSetupParams/${prevPage}`);
    }
  };

  const handleComplete = () => {
    // Handle form submission and any other actions upon form completion
    navigate("/home"); // Redirect to success page or any other route
  };

  return (
    <MDBox display="flex" flexDirection="column" mx={5} my={3}>
      <CustomStepper steps={steps} activeStep={activeStep} getPercentage={getPercentage} />
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
        <Button disabled={activeStep === 0} onClick={handleBack} sx={{ marginRight: "8px" }}>
          Back
        </Button>
        <Button
          disabled={activeStep === steps.length}
          onClick={activeStep === steps.length - 1 ? handleComplete : handleNext}
        >
          {activeStep === steps.length || activeStep === steps.length - 1 ? "Complete" : "Next"}
        </Button>
      </Box>
      <Box>{renderSection()}</Box>
    </MDBox>
  );
}
