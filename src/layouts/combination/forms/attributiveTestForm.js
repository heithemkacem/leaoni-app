import React from "react";
import { FormProvider, useForm } from "react-hook-form";

import MDBox from "components/MDBox";

// import TableInput from "components/MyComponents/TableInput";
// import VerticalTabs from "components/MyComponents/Tabs";

import AttributiveTestSection from "../components/AttributiveForm/AttributiveTestSection";

function attributiveTestFrom() {
  const submitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <FormProvider {...useForm}>
      <MDBox
        component="form"
        role="form"
        onSubmit={submitHandler}
        display="flex"
        flexDirection="column"
        mx={5}
        my={3}
      >
        <AttributiveTestSection />
      </MDBox>
    </FormProvider>
  );
}

export default attributiveTestFrom;
