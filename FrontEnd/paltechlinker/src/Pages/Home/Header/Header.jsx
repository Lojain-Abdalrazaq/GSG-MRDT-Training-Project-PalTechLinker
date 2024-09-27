import React from "react";
import { Box, Typography, Container } from "@mui/material";
import Image from "../../../Assets/Images/header.png";
import Colors from "../../../Assets/Colors/Colors";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../CommonComponents/CustomButton";

const Header = () => {
  const navigate = useNavigate();

  const handleApplyNow = () => {
    navigate("/internships");
  };

  return (
    <Container
      maxWidth="100%"
      sx={{
        backgroundColor: Colors.light,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 10,
        paddingTop: 20,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          backgroundColor: Colors.background,
          padding: "50px 0px 50px 50px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          borderRadius: "8px",
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          <Typography
            variant="h2"
            sx={{ fontFamily: "'Cairo', sans-serif", fontWeight: "600" }}
            gutterBottom
          >
            Welcome to PalTechLinker Community
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontFamily: "'Cairo', sans-serif", color: Colors.secondary }}
            paragraph
          >
            Discover the latest internship opportunities posted by leading local
            companies in the tech industry. Stay updated, apply easily, and take
            the next step in your career.
          </Typography>

          <CustomButton
            text="Apply Now"
            onClick={handleApplyNow}
            fullWidth={false}
          />
        </Box>

        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={Image}
            alt="Local Companies"
            style={{
              width: "600px",
              height: "auto",
              borderRadius: "8px",
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Header;
