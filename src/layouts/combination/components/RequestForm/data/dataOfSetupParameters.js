/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function data() {
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  // const Job = ({ title, description }) => (
  //   <MDBox lineHeight={1} textAlign="left">
  //     <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
  //       {title}
  //     </MDTypography>
  //     <MDTypography variant="caption">{description}</MDTypography>
  //   </MDBox>
  // );

  return {
    columns: [
      { Header: " ", accessor: "numbers", width: "5%", align: "left" },
      { Header: "values", accessor: "values", align: "center" },
      { Header: "technician", accessor: "user", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        numbers: (
          <MDTypography display="block" variant="button" fontWeight="medium">
            1
          </MDTypography>
        ),
        user: <Author image={team2} name="Alexa Liras" email="" />,
        values: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            0
          </MDTypography>
        ),
        action: (
          <MDBox>
            <MDTypography
              component="a"
              href="#"
              variant="caption"
              color="text"
              fontWeight="medium"
              mr={2}
            >
              Edit
            </MDTypography>
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              Delete
            </MDTypography>
          </MDBox>
        ),
      },
      {
        numbers: (
          <MDTypography display="block" variant="button" fontWeight="medium">
            2
          </MDTypography>
        ),

        user: <Author image={team3} name="Alexa Liras" email="" />,
        values: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            0
          </MDTypography>
        ),
        action: (
          <MDBox>
            <MDTypography
              component="a"
              href="#"
              variant="caption"
              color="text"
              fontWeight="medium"
              mr={2}
            >
              Edit
            </MDTypography>
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              Delete
            </MDTypography>
          </MDBox>
        ),
      },
      {
        numbers: (
          <MDTypography display="block" variant="button" fontWeight="medium">
            3
          </MDTypography>
        ),

        user: <Author image={team4} name="Alexa Liras" email="" />,
        values: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            0
          </MDTypography>
        ),
        action: (
          <MDBox>
            <MDTypography
              component="a"
              href="#"
              variant="caption"
              color="text"
              fontWeight="medium"
              mr={2}
            >
              Edit
            </MDTypography>
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              Delete
            </MDTypography>
          </MDBox>
        ),
      },
    ],
  };
}
