import { MDInput, MenuItem } from "@mui/material";

<MDBox mb={2}>
  <MDInput
    size="large"
    select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Gender"
    InputProps={{
      classes: { root: "select-input-styles" },
    }}
    fullWidth
  >
    <MenuItem value="Male">Male</MenuItem>
    <MenuItem value="Female">Female</MenuItem>
  </MDInput>
</MDBox>;
