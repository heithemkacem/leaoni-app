import React from "react";
import { Radio, FormControlLabel, RadioGroup } from "@mui/material";
import { Controller } from "react-hook-form";
import { InputProps } from "./TextInput";

export interface CheckBoxOption {
  name: string;
  value: string;
}

export interface CheckBoxProps extends InputProps {
  options: CheckBoxOption[];
}

export default function CheckboxInput({ name, control, options, onChange }: InputProps) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field }) => (
        <RadioGroup {...field}>
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio />}
              label={option.name}
              onChange={onChange}
            />
          ))}
        </RadioGroup>
      )}
    />
  );
}
