import { InputAdornment, TextField } from "@mui/material";

import React from "react";

const SmInput = (props) => {
  const { label, onChange,type,icon,variant,color } = props;
  return (
    <>
      <TextField 
       InputProps={{
        startAdornment: (
          <InputAdornment position="start">
          {icon}
          </InputAdornment>
        ),
      }}
      color={color}
      type={type}
        sx={{ width: "230px" }}
        variant={variant}
        onChange={onChange}
        label={label}
      />
     
    </>
  );
};

export default SmInput;
