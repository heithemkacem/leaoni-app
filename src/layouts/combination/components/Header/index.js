import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import breakpoints from "assets/theme/base/breakpoints";

function Header({ children }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const location = useLocation();

  useEffect(() => {
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    window.addEventListener("resize", handleTabsOrientation);
    handleTabsOrientation();

    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, []);

  // const handleTabChange = (event, newValue) => {
  //   // Handle the tab change here if needed
  // };

  return (
    <MDBox position="relative" mb={5}>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={6} lg={6} sx={{ ml: "auto" }}>
          <AppBar position="static">
            <Tabs orientation={tabsOrientation} value={location.pathname}>
              <Tab
                label="Request Setup Parmaeters"
                icon={
                  <Icon fontSize="small" sx={{ mt: -0.25 }}>
                    filter_1
                  </Icon>
                }
                component={Link}
                to="RequestSetupParams/DocumentCreation"
                className="header-tab" // Add a custom class to the Tab component
              />

              <Tab
                label="Attributive Control Test"
                icon={
                  <Icon fontSize="small" sx={{ mt: -0.25 }}>
                    filter_2
                  </Icon>
                }
                component={Link}
                to="AttributiveTest"
                className="header-tab" // Add a custom class to the Tab component
              />

              <Tab
                label="Release Test"
                icon={
                  <Icon fontSize="small" sx={{ mt: -0.25 }}>
                    filter_3
                  </Icon>
                }
                component={Link}
                to="ReleaseTest"
                className="header-tab" // Add a custom class to the Tab component
              />
            </Tabs>
          </AppBar>
        </Grid>
      </Grid>
      {children}
    </MDBox>
  );
}

Header.defaultProps = {
  children: "",
};

Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
