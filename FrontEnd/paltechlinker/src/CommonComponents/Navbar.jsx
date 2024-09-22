import React, { useState } from "react";
import { AppBar, Toolbar, Box } from "@mui/material";
import Logo from "../Assets/Images/logo.png";
import Colors from "../Assets/Colors/Colors";

const Pages = [
  { title: "Home", link: "/" },
  { title: "Jobs", link: "/" },
  { title: "Companies", link: "/" },
  { title: "Log In", link: "/" },
  { title: "Sign Up", link: "/" },
];

const Navbar = () => {
  const [activeButton, setActiveButton] = useState(Pages[0].title);

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        padding: "5px",
        backgroundColor: Colors.background,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img
          src={Logo}
          alt="Logo"
          style={{ height: "80px", marginRight: "20px" }}
        />

        <Box sx={{ display: "flex", gap: "30px" }}>
          {Pages.map(({ title }) => (
            <Box key={title} sx={{ position: "relative" }}>
              <Box
                onClick={() => handleButtonClick(title)}
                sx={{
                  color: activeButton === title ? Colors.primary : "black",
                  backgroundColor: "white",
                  textTransform: "none",
                  fontSize: "20px",
                  fontFamily: "cairo",
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-3px)", 
                    color: Colors.primary,
                  },
                }}
              >
                {title}
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  right: "0",
                  height: "3px",
                  backgroundColor: Colors.secondary,
                  transition: "transform 0.3s ease",
                  transform: activeButton === title ? "scaleX(1)" : "scaleX(0)", 
                  transformOrigin: "left",
                  "&:hover": {
                    transform: "scaleX(1)", 
                  },
                }}
              />
            </Box>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
