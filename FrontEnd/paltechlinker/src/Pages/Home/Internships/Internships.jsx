import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import InternshipCard from "./InternshipCard";
import Colors from "../../../Assets/Colors/Colors";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../CommonComponents/CustomButton";
import axios from "axios";

const Internships = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch internships data from the API
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/interns/read/all"
        );
        setInternships(response.data.content);
      } catch (error) {
        setError("Failed to load internships.");
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  const handleShowMore = () => {
    navigate("/internships");
  };

  const handleCardClick = (id) => {
    navigate(`/interns/read/${id}`);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" sx={{ color: "red", textAlign: "center" }}>
        {error}
      </Typography>
    );
  }

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
        {internships.slice(0, 6).map((internship) => (
          <Grid item xs={12} sm={6} md={4} key={internship.id}>
            <InternshipCard
              internship={internship}
              onClick={() => handleCardClick(internship.id)}
            />
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
