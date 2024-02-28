/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-console */

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

import { useState, useEffect } from "react";

// @mui material components
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
// import LogoAsana from "assets/images/small-logos/logo-asana.svg";
// import logoGithub from "assets/images/small-logos/github.svg";
// import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
// import logoSlack from "assets/images/small-logos/logo-slack.svg";
// import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
// import logoInvesion from "assets/images/small-logos/logo-invision.svg";

import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

// import PDF from "assets/images/small-logos/PDF.svg";
import Ferrari from "assets/images/small-logos/logo-Ferrari.png";
import BMW from "assets/images/small-logos/logo-BMW.png";
import VW from "assets/images/small-logos/logo-VW.png";
import Mercedes from "assets/images/small-logos/logo-Mercedes.png";

export default function getDocumentTableData() {
  const [documentOptions, setDocumentOptions] = useState([]);
  // const doc = ["Document 1", "Document n", "Document 3"];
  const logos = { Ferrari, BMW, VW, Mercedes };
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch("http://localhost:4000/showDocument");

        if (response.ok) {
          const data = await response.json();
          setDocumentOptions(data);
        } else {
          console.error("Failed to fetch shrinksleeves:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error fetching shrinksleeves:", error);
      }
    };
    fetchDocuments();
  }, []);

  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <MDAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));
  const Project = ({ image, name, width, height }) => (
    <MDBox display="flex" alignItems="center" justifyContent="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" width={width} height={height} />
      {/* <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {doc[name]}
      </MDTypography> */}
    </MDBox>
  );
  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal open/close

  // Function to handle the click on "Another action" menu item
  const handleAnotherActionClick = () => {
    // Open the modal
    setIsModalOpen(true);
  };

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Download</MenuItem>
      <MenuItem onClick={handleAnotherActionClick}>View Document</MenuItem>
    </Menu>
  );

  const rows = documentOptions.map((option) => ({
    machine: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {option.machine}
      </MDTypography>
    ),
    PF: (
      <MDBox
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Project image={logos[option.pf]} width="40px" height="40px" />
        {/* <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {option.pf}
        </MDTypography> */}
      </MDBox>
    ),
    members: (
      <MDBox display="flex" py={1}>
        {avatars([
          [team1, "Ryan Tompson"],
          [team2, "Romina Hadid"],
          [team3, "Alexander Smith"],
          [team4, "Jessica Doe"],
        ])}
      </MDBox>
    ),
    combination: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {option.reference}
      </MDTypography>
    ),
    status: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        {option.status}
      </MDTypography>
    ),
    completion: <Progress color="info" value={option.completion} />,
    action: (
      <MDBox>
        <MDBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer" }} fontSize="small" onClick={openMenu}>
            more_vert
          </Icon>
        </MDBox>
        {renderMenu}
      </MDBox>
    ),
  }));

  return {
    columns: [
      { Header: "PF", accessor: "PF", width: "10%", align: "left" },
      { Header: "machine", accessor: "machine", width: "20%", align: "left" },
      { Header: "combination", accessor: "combination", align: "center" },
      { Header: "members", accessor: "members", width: "10%", align: "center" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "completion", accessor: "completion", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows,
    isModalOpen,
    setIsModalOpen,
  };
}
