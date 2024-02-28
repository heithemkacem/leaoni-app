import React from "react";
import { Radio, FormControl, FormControlLabel } from "@mui/material";
import { useController, UseControllerReturn, useForm } from "react-hook-form";
import { InputProps } from "./TextInput";

export default function RadioInput({ name, label, value }: InputProps) {
  const { control } = useForm();

  const controller: UseControllerReturn = useController({
    name,
    control,
    defaultValue: "",
  });

  return (
    <FormControl fullWidth>
      <FormControlLabel
        label={label}
        control={
          <Radio
            onChange={controller.field.onChange}
            onBlur={controller.field.onBlur}
            name={controller.field.name}
            value={value}
            ref={controller.field.ref}
          />
        }
      />
    </FormControl>
  );
}
