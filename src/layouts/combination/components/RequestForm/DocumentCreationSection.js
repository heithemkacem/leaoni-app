/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import CheckboxInput from "components/MyComponents/CheckboxInput";
import { ComboBox } from "components/MyComponents/ComboBox";
import { useFormContext } from "react-hook-form";

export default function DocumentCreationSection() {
  const UserMethodData = [
    { name: "Creation", value: "Creation" },
    { name: "Modification", value: "Modification" },
  ];

  const [machineOptions, setMachineOptions] = useState([]);

  const [pfOptions, setPfOptions] = useState([]);

  const setupParametersData = [
    { name: "Creation", value: "Creation" },
    { name: "Modification", value: "Modification" },
    { name: "Requalification", value: "Requalification" },
  ];

  useEffect(() => {
    const fetchPfs = async () => {
      try {
        const response = await fetch("http://localhost:4000/showPf");

        if (response.ok) {
          const data = await response.json();
          setPfOptions(data);
        } else {
          console.error("Failed to fetch pfs:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error fetching pfs:", error);
      }
    };
    fetchPfs();
  }, []);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await fetch("http://localhost:4000/showMachine");

        if (response.ok) {
          const data = await response.json();
          setMachineOptions(data);
        } else {
          console.error("Failed to fetch machines:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error fetching machines:", error);
      }
    };
    fetchMachines();
  }, []);

  const methods = useFormContext();

  return (
    <div>
      <MDBox component="form" role="form">
        <MDTypography variant="h4" fontWeight="medium" textTransform="capitalize" mb={5}>
          Document Creation
        </MDTypography>
        <MDBox display="flex" flexDirection="row" justifyContent="space-between" mx={10}>
          <section>
            <MDBox
              display="flex"
              flexDirection="column"
              justifyContent="space-around"
              mt={3}
              mb={3}
            >
              <h5> Setup parameters (PR)</h5>
              <MDBox
                display="flex"
                flexDirection="column"
                justifyContent="flex-start"
                mt={3}
                ml={2}
              >
                <CheckboxInput
                  className="col-span-2"
                  name="Setup_Parameters"
                  options={setupParametersData}
                  control={methods.control}
                />
              </MDBox>
            </MDBox>
          </section>
          <section>
            <MDBox
              display="flex"
              flexDirection="column"
              justifyContent="space-around"
              mt={3}
              mb={3}
            >
              <h5> User Method (MU)</h5>
              <MDBox
                display="flex"
                flexDirection="column"
                justifyContent="flex-start"
                mt={3}
                ml={2}
              >
                <CheckboxInput
                  className="col-span-2"
                  name="User_Method"
                  options={UserMethodData}
                  control={methods.control}
                />
              </MDBox>
            </MDBox>
          </section>
          <section>
            <MDBox
              display="flex"
              flexDirection="column"
              justifyContent="space-around"
              mt={3}
              mb={3}
            >
              <h5>Select PF and Machine</h5>
              <MDBox
                display="flex"
                flexDirection="column"
                mt={3}
                mb={3}
                ml={2}
                gap={2}
                flexWrap="wrap"
              >
                <ComboBox
                  control={methods.control}
                  name="pf"
                  label="PF"
                  placeholder="Select PF"
                  options={pfOptions}
                />
                <ComboBox
                  control={methods.control}
                  name="machine"
                  label="Machine"
                  placeholder="Select Machine"
                  options={machineOptions}
                />
              </MDBox>
            </MDBox>
          </section>
        </MDBox>
        <MDBox sx={{ display: "flex", justifyContent: "flex-end", marginRight: "5rem" }}>
          <MDButton sx={{ width: "10%" }} variant="gradient" color="error" type="submit">
            Save
          </MDButton>
        </MDBox>
      </MDBox>
    </div>
  );
}
