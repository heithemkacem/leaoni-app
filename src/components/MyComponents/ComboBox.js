import React from "react";
import { Autocomplete, TextField, styled } from "@mui/material";
import { Controller } from "react-hook-form";
import { InputProps } from "./TextInput";

export interface ComboBoxOption {
  name: string;
  value: string;
  category: string;
}

export interface ComboBoxProps extends InputProps {
  options: ComboBoxOption[];
}

export function ComboBox({
  name,
  label,
  placeholder,
  options,
  defaultValue,
  width,
  control,
}: InputProps) {
  const StyledTextField = styled(TextField)`
    .MuiInputBase-input {
      height: 10px; /* Adjust the height value as per your requirement */
      cursor: pointer;
      text-align: left;
    }
  `;

  const optionsWithCategory = options.map((option) => {
    if (option.category) {
      return {
        ...option,
        categoryHeader: option.category.toUpperCase(),
      };
    }
    return option;
  });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <Autocomplete
          options={optionsWithCategory.sort((a, b) => {
            if (a.categoryHeader && b.categoryHeader) {
              return -b.categoryHeader.localeCompare(a.categoryHeader);
            }
            return 0;
          })}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option: ComboBoxOption, value) => option.value === value.value}
          onChange={(event, item) => {
            onChange(item?.value);
            console.log("item:", item?.value);
          }}
          groupBy={(option) => option.categoryHeader}
          defaultValue={options.find((option) => option.value === defaultValue)}
          renderInput={(params) => (
            <StyledTextField
              sx={{ width }}
              {...params}
              label={label}
              placeholder={placeholder}
              variant="outlined"
            />
          )}
        />
      )}
    />
  );
}
