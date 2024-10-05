import React from "react";
import { Box, Typography, Link, IconButton } from "@mui/material";
import { Facebook, LinkedIn, WhatsApp } from "@mui/icons-material";
import Logo from "../Assets/Images/logo2.png";
import Colors from "../Assets/Colors/Colors";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: "2rem",
        backgroundColor: Colors.background,
        borderTopLeftRadius: "30px",
        borderTopRightRadius: "30px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
      }}
    >
      <Box sx={{ flex: 1, marginRight: "2rem", textAlign: "right" }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            marginBottom: "0.5rem",
            fontFamily: "'Cairo', sans-serif",
          }}
        >
          Contact Us
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "'Cairo', sans-serif",
          }}
        >
          <Typography variant="h6" sx={{ fontFamily: "'Cairo', sans-serif" }}>
            Email:
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontFamily: "'Cairo', sans-serif" }}
          >
            {" "}
            paltechlinker@gmail.com
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6" sx={{ fontFamily: "'Cairo', sans-serif" }}>
            Phone:
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontFamily: "'Cairo', sans-serif" }}
          >
            {" "}
            +123 456 7890
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6" sx={{ fontFamily: "'Cairo', sans-serif" }}>
            Address:
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontFamily: "'Cairo', sans-serif" }}
          >
            Jenin, Palestine
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginInline:"50px"
        }}
      >
        <img
          src={Logo}
          alt="Logo"
          style={{ width: "100%", height: "120px", marginBottom: "1rem" }}
        />
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <IconButton
            href="https://www.linkedin.com"
            target="_blank"
            aria-label="LinkedIn"
            sx={{ color: Colors.secondary }}
          >
            <LinkedIn />
          </IconButton>
          <IconButton
            href="https://www.facebook.com"
            target="_blank"
            aria-label="Facebook"
            sx={{ color: Colors.secondary }}
          >
            <Facebook />
          </IconButton>
          <IconButton
            href="https://www.whatsapp.com"
            target="_blank"
            aria-label="WhatsApp"
            sx={{ color: Colors.secondary }}
          >
            <WhatsApp />
          </IconButton>
        </Box>
        <Typography
          variant="body2"
          align="center"
          sx={{
            marginTop: "20px",
            fontWeight: "600",
            fontFamily: "'Cairo', sans-serif",
          }}
        >
          &copy; All rights reserved.
        </Typography>
      </Box>

      <Box sx={{ flex: 1, marginLeft: "2rem", textAlign: "left" }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            marginBottom: "0.5rem",
            fontFamily: "'Cairo', sans-serif",
          }}
        >
          Pages
        </Typography>
        <Link
          href="/"
          variant="h6"
          sx={{
            display: "block",
            textDecoration: "none",
            color: "#000",
            marginTop: "10px",
            fontFamily: "'Cairo', sans-serif",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Home
        </Link>
        <Link
          href="/internships"
          variant="h6"
          sx={{
            display: "block",
            textDecoration: "none",
            color: "#000",
            marginTop: "10px",
            fontFamily: "'Cairo', sans-serif",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Internships
        </Link>
        <Link
          href="/companies"
          variant="h6"
          sx={{
            display: "block",
            textDecoration: "none",
            color: "#000",
            marginTop: "10px",
            fontFamily: "'Cairo', sans-serif",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Companies
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
