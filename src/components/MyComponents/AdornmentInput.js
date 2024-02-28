import React from "react";
import { OutlinedInput, InputAdornment, FormHelperText, FormControl } from "@mui/material";
import { Controller } from "react-hook-form";
import { InputProps } from "./TextInput";

export default function AdornmentInput({
  name,
  placeholder,
  label,
  ind,
  width,
  control,
  helperText,
}: InputProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        pattern: {
          value: /^[0-9]*(\.[0-9]+)?$/,
          message: "Please enter a valid number or float",
        },
      }}
      render={({ field, fieldState }) => (
        <FormControl variant="outlined" {...field}>
          <OutlinedInput
            sx={{ width, height: "2.688rem" }}
            label={label}
            placeholder={placeholder}
            error={!!fieldState.error}
            endAdornment={<InputAdornment position="end"> {ind}</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              "aria-label": "weight",
            }}
          />
          <FormHelperText id="outlined-weight-helper-text">{helperText}</FormHelperText>
        </FormControl>
      )}
    />
  );
}
