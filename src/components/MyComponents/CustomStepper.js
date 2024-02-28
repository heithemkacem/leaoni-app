import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepIcon from "@mui/material/StepIcon";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import colors from "assets/theme/base/colors";
// import pxToRem from "assets/theme/functions/pxToRem";

import PropTypes from "prop-types";

const localTheme = createTheme({
  components: {
    MuiStepper: {
      styleOverrides: {
        root: {
          background: colors.transparent.main,
          padding: "24px 0 16px",
          borderRadius: "12px",
          // boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiStep: {
      styleOverrides: {
        root: {
          padding: "0 6px",
        },
      },
    },

    MuiStepIcon: {
      styleOverrides: {
        root: {
          background: colors.white.main,
          // fill: colors.secondary.main,
          // stroke: "#9fc9ff",
          // strokeWidth: pxToRem(1),
          // width: pxToRem(13),
          // height: pxToRem(13),
          borderRadius: "50%",
          zIndex: 99,
          // transition: "all 200ms linear",

          "&.Mui-active": {
            background: colors.white.main,
            // fill: colors.white.main,
            stroke: colors.white.main,
            borderColor: colors.white.main,
            // boxShadow: boxShadow([0, 0], [0, 2], colors.white.main, 1),
          },

          "&.Mui-completed": {
            // background: colors.success.main,

            fill: colors.success.main,
            // stroke: colors.success.main,
            borderColor: colors.black.main,
            // boxShadow: boxShadow([0, 0], [0, 2], colors.white.main, 1),
          },
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          marginTop: "8px !important",
          fontWeight: "500",
          fontSize: "12px",
          color: colors.secondary.main,
          textTransform: "uppercase",
          "&.Mui-active": {},
          "&.Mui-completed": {},
        },
      },
    },
  },
});

export default function CustomStepper({ activeStep, steps }) {
  return (
    <ThemeProvider theme={localTheme}>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step) => (
            <Step key={step.label}>
              <StepLabel StepIconComponent={StepIcon}>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </ThemeProvider>
  );
}

CustomStepper.propTypes = {
  activeStep: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      component: PropTypes.node.isRequired,
    })
  ).isRequired,
};

// import * as React from "react";
// import Box from "@mui/material/Box";
// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";

// // import StepIcon from "@mui/material/StepIcon";

// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import Button from "@mui/material/Button";

// // import PropTypes from "prop-types";

// import colors from "assets/theme/base/colors";
// import borders from "assets/theme/base/borders";
// import boxShadows from "assets/theme/base/boxShadows";

// // Material Dashboard 2 React helper functions
// import pxToRem from "assets/theme/functions/pxToRem";
// import linearGradient from "assets/theme/functions/linearGradient";

// const { transparent, gradients } = colors;
// const { borderRadius } = borders;
// const { colored } = boxShadows;
// const { borderWidth } = borders;

// const steps = ["Select master blaster campaign settings", "Create an ad group", "Create an ad"];

// const localTheme = createTheme({
//   components: {
//     MuiStepper: {
//       styleOverrides: {
//         root: {
//           background: linearGradient(gradients.info.main, gradients.info.state),
//           padding: `${pxToRem(24)} 0 ${pxToRem(16)}`,
//           borderRadius: borderRadius.lg,
//           boxShadow: colored.info,

//           "&.MuiPaper-root": {
//             backgroundColor: transparent.main,
//           },
//         },
//       },
//     },
//     MuiStep: {
//       styleOverrides: {
//         root: {
//           padding: `0 ${pxToRem(6)}`,
//         },
//       },
//     },
//     MuiStepLabel: {
//       styleOverrides: {
//         label: {
//           marginTop: "8px !important",
//           fontWeight: "500",
//           fontSize: "12px",
//           color: colors.white.main,
//           textTransform: "uppercase",
//         },
//       },
//     },
//     MuistepConnector: {
//       styleOverrides: {
//         root: {
//           color: "#9fc9ff",
//           transition: "all 200ms linear",

//           "&.Mui-active": {
//             color: colors.white.main,
//           },

//           "&.Mui-completed": {
//             color: colors.white.main,
//           },
//         },

//         alternativeLabel: {
//           top: "14%",
//           left: "-50%",
//           right: "50%",
//         },

//         line: {
//           borderWidth: `${borderWidth[2]} !important`,
//           borderColor: "currentColor",
//           opacity: 0.5,
//         },
//       },
//     },
//     MuiStepIcon: {
//       styleOverrides: {
//         root: {
//           background: colors.dark.main,
//           // fill: colors.secondary.main,
//           // stroke: "#9fc9ff",
//           // strokeWidth: pxToRem(1),
//           width: pxToRem(13),
//           height: pxToRem(13),
//           borderRadius: "50%",
//           zIndex: 99,
//           transition: "all 200ms linear",

//           "&.Mui-active": {
//             background: colors.white.main,
//             // fill: colors.white.main,
//             stroke: colors.white.main,
//             borderColor: colors.white.main,
//             // boxShadow: boxShadow([0, 0], [0, 2], colors.white.main, 1),
//           },

//           "&.Mui-completed": {
//             background: colors.black.main,

//             // fill: colors.white.main,
//             // stroke: colors.white.main,
//             // borderColor: colors.black.main,
//             // boxShadow: boxShadow([0, 0], [0, 2], colors.white.main, 1),
//           },
//         },
//       },
//     },
//   },
// });

// function CustomStepper() {
//   const [activeStep, setActiveStep] = React.useState(0);

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   return (
//     <ThemeProvider theme={localTheme}>
//       <Box sx={{ width: "100%" }}>
//         <Stepper activeStep={activeStep} alternativeLabel>
//           {steps.map((label) => (
//             <Step key={label}>
//               <StepLabel>{label}</StepLabel>
//             </Step>
//           ))}
//         </Stepper>
//       </Box>
//       <Box sx={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
//         <Button disabled={activeStep === 0} onClick={handleBack} sx={{ marginRight: "8px" }}>
//           Back
//         </Button>
//         <Button disabled={activeStep === steps.length} onClick={handleNext}>
//           {activeStep === steps.length || activeStep === steps.length - 1 ? "Complete" : "Next"}
//         </Button>
//       </Box>
//     </ThemeProvider>
//   );
// }

// export default CustomStepper;
