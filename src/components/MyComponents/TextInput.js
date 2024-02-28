import React from "react";
import { FormControl, TextField } from "@mui/material";

import { Controller } from "react-hook-form";

export interface InputProps {
  name: string;
  placeholder?: string;
  label?: string;
}

export function TextInput({ name, control, placeholder, label, defaultValue, width }: InputProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl sx={{ width }} {...field}>
          <TextField
            variant="outlined"
            label={label}
            placeholder={placeholder}
            defaultValue={defaultValue}
          />
        </FormControl>
      )}
    />
  );
}
