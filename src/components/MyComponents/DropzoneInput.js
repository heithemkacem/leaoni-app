import React, { useState } from "react";
import { FormControl } from "@mui/material";
import { useController, UseControllerReturn, useForm } from "react-hook-form";
import { DropzoneArea } from "material-ui-dropzone";
import { InputProps } from "./TextInput";
import "./DropzoneInput.css"; // Import the CSS file for custom styles

export default function DropzoneInput({ name, label, acceptedFiles, dropzoneText }: InputProps) {
  const { control } = useForm();

  const controller: UseControllerReturn = useController({
    name,
    control,
  });

  const [logoUploaded, setLogoUploaded] = useState(null);

  const handleFileAdded = (newFileObjs) => {
    controller.field.onChange(newFileObjs[0]);
    setLogoUploaded(newFileObjs[0]);
  };

  const handleFileRemoved = () => {
    controller.field.onChange(null);
    setLogoUploaded(null);
  };

  return (
    <FormControl
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "30%",
        height: "30%",
      }}
    >
      <DropzoneArea
        acceptedFiles={acceptedFiles}
        filesLimit={1}
        onAdd={handleFileAdded}
        onDelete={handleFileRemoved}
        dropzoneText={!logoUploaded ? dropzoneText : ""}
        onAlert={(message, variant) => console.log(`${variant}: ${message}`)}
        label={!logoUploaded ? label : ""}
        showPreviews={false}
        previewGridProps={{
          item: { xs: 12 },
          container: { spacing: 1 },
          direction: "row",
          justify: "center",
          alignItems: "center", // Added to vertically center the thumbnail
        }}
        previewGridClasses={{
          item: "custom-preview-item",
          container: "custom-preview-container",
        }}
        previewText="Uploaded Files"
        // Icon=""
      />
    </FormControl>
  );
}
