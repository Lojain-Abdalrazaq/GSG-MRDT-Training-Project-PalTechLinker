import React from "react";
import { Grid, Container, Typography, Box } from "@mui/material";
import InternshipCard from "./InternshipCard";
import Colors from "../../../Assets/Colors/Colors";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../CommonComponents/CustomButton";

const internships = [
  {
    id: 1,
    image: "",
    title: "Frontend Developer Internship",
    company: "ITG Software, Inc.",
    type: "Onsite",
    status: "open",
    description: "Work as a frontend developer intern focusing on React.js.",
  },
  {
    id: 2,
    image: "",
    title: "Backend Developer Internship",
    company: "Foothill Technology Solutions",
    type: "Remotely",
    status: "closed",
    description:
      "Join our team to assist with backend development using Node.js.",
  },
  {
    id: 3,
    image: "",
    title: "UI/UX Designer Internship",
    company: "Fratello Software House",
    type: "Hybrid",
    status: "in progress",
    description: "Contribute to design systems and UI/UX components.",
  },
  {
    id: 4,
    image: "",
    title: "UI/UX Designer Internship",
    company: "Fratello Software House",
    type: "Hybrid",
    status: "in progress",
    description: "Contribute to design systems and UI/UX components.",
  },
  {
    id: 5,
    image: "",
    title: "UI/UX Designer Internship",
    company: "Fratello Software House",
    type: "Hybrid",
    status: "in progress",
    description: "Contribute to design systems and UI/UX components.",
  },
  {
    id: 6,
    image: "",
    title: "UI/UX Designer Internship",
    company: "Fratello Software House",
    type: "Hybrid",
    status: "in progress",
    description: "Contribute to design systems and UI/UX components.",
  },
];

const Internships = () => {
  const navigate = useNavigate();

  const handleShowMore = () => {
    navigate("/companies");
  };

  return (
    <Container
      maxWidth="100%"
      sx={{
        backgroundColor: Colors.light,
        paddingBottom: 5,
        paddingTop: 5,
      }}
    >
      {/* Title */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          marginBottom: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'Cairo', sans-serif",
            fontWeight: "bold",
          }}
        >
          Internships
        </Typography>
        <span
          style={{
            content: '""',
            display: "block",
            width: 160,
            height: "4px",
            backgroundColor: Colors.secondary,
            position: "absolute",
            bottom: "-10px",
          }}
        />
      </Box>

      {/* Internship Cards */}
      <Grid container spacing={4} justifyContent="center">
        {internships.map((internship) => (
          <Grid item xs={12} sm={6} md={4} key={internship.id}>
            <InternshipCard internship={internship} />
          </Grid>
        ))}
      </Grid>

      {/* Show More Button */}
      <CustomButton
        text="Show More"
        onClick={handleShowMore}
        fullWidth={false}
        sx={{
          backgroundColor: Colors.secondary,
          "&:hover": {
            backgroundColor: Colors.primary,
          },
        }}
      />
    </Container>
  );
};

export default Internships;
