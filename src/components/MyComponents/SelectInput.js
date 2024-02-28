import React from "react";
import { FormControl, InputLabel, MenuItem, Select, Box } from "@mui/material";
import { useController, UseControllerReturn, useForm } from "react-hook-form";
import { InputProps } from "./TextInput";

export interface SelectInputOption {
  value: string;
  title: string;
}

export interface SelectInputProps extends InputProps {
  options: SelectInputOption[];
}

export function SelectInput({ name, label, placeholder, options }: SelectInputProps) {
  const { control } = useForm();

  const controller: UseControllerReturn = useController({
    name,
    control,
  });

  const selectStyles = {
    sx: {
      "& .MuiSelect-icon": {
        fontSize: "2rem",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
      },
      "& .MuiSelect-nativeInput": {
        height: "100%",
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        opacity: 0,
        cursor: "pointer",
      },
      "& .MuiSelect-select": {
        height: "100%",
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        cursor: "pointer",
      },
      "& .MuiSelect-root": {
        height: "100%",
        width: "100%",
        position: "relative",
      },
      "& .MuiInputBase-root": {
        height: "100%",
      },
      "& .MuiInputBase-input": {
        height: "100%",
        cursor: "pointer",
        textAlign: "left",
      },
    },
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ width: "200px", height: "50px", mr: "20px" }}>
        <InputLabel>{label}</InputLabel>
        <Select
          value={controller.field.value}
          label={label}
          onChange={controller.field.onChange}
          placeholder={placeholder}
          onBlur={controller.field.onBlur}
          name={controller.field.name}
          ref={controller.field.ref}
          sx={{
            width: "100%",
            height: "100%",
            ...selectStyles.sx,
          }}
          style={{ cursor: "pointer" }}
          MenuProps={{
            sx: { height: "100%" },
          }}
        >
          {options.map((option: SelectInputOption) => (
            <MenuItem key={option.value} value={option.value}>
              {option.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
