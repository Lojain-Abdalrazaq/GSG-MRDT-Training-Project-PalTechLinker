import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Box } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../Assets/Images/logo2.png";
import Colors from "../Assets/Colors/Colors";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const currentPage = Pages.find((page) => page.link === location.pathname);
    if (currentPage) {
      setActiveButton(currentPage.title);
    } else {
      setActiveButton(Pages[0].title);
    }
  }, [location.pathname]);

  // Check if the company is logged in
  useEffect(() => {
    const companyId = localStorage.getItem("company_id");
    setIsLoggedIn(!!companyId); // Set to true if company_id exists
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8081/api/auth/logout", {}, {
        withCredentials: true, // Include credentials to ensure the session is valid
      });
      localStorage.removeItem("company_id");
      setIsLoggedIn(false);
      window.location.reload();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const Pages = [
    { title: "Home", link: "/" },
    { title: "Internships", link: "/internships" },
    { title: "Companies", link: "/companies" },
    ...(isLoggedIn
      ? [
          {
            title: "Profile",
            link: `/company/${localStorage.getItem("company_id")}`,
          },
          { title: "Log Out", link: "/login", onClick: handleLogout },
        ]
      : [
          { title: "Sign Up", link: "/signup" },
          { title: "Log In", link: "/login" },
        ]),
  ];

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
          {Pages.map(({ title, link, onClick }) => (
            <Box key={title} sx={{ position: "relative" }}>
              <Link
                to={link}
                style={{ textDecoration: "none" }}
                onClick={onClick}
              >
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
              </Link>
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
