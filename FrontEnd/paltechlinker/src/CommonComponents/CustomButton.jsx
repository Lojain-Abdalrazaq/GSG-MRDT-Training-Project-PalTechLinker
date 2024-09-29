import React from "react";
import { Button } from "@mui/material";
import Colors from "../Assets/Colors/Colors";

const CustomButton = ({ text, onClick, fullWidth = false, sx = {} }) => {
  return (
    <Button
      variant="contained"
      fullWidth={fullWidth}
      sx={{
        backgroundColor: Colors.primary,
        fontFamily: "'Cairo', sans-serif",
        marginTop: "2rem",
        "&:hover": {
          backgroundColor: Colors.secondary,
        },
        ...sx,
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
