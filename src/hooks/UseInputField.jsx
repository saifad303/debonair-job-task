import { TextField } from "@mui/material";
import React from "react";
import * as Yup from "yup";

export const Validation = (message) => Yup.string().required(message);

export const UseInputField = (props) => {
  const { id, name, label, value, onChange, error, helperText } = props;

  return (
    <>
      <TextField
        id={id}
        fullWidth
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        error={error}
        helperText={helperText}
      />
    </>
  );
};
