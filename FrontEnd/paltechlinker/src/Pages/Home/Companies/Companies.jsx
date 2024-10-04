import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Container } from "@mui/material";
import axios from "axios";
import Colors from "../../../Assets/Colors/Colors";
import { useNavigate } from "react-router-dom";
import CompanyCard from "./CompanyCard";
import CustomButton from "../../../CommonComponents/CustomButton";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  // Fetch companies from the API
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/companies/read/all"
        );
        setCompanies(response.data.content);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/company/${id}`, {
      state: { company_id: id },
    });
  };

  const handleShowMore = () => {
    navigate(`/companies`);
  };

  return (
    <Container
      maxWidth="100%"
      sx={{
        backgroundColor: Colors.background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
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
          Companies
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

      {/* Company Cards */}
      <Grid
        container
        spacing={4}
        justifyContent="center"
        sx={{ paddingInline: 5 }}
      >
        {companies.slice(0, 6).map((company, index) => (
          <Grid item xs={12} sm={6} md={4} key={company.id}>
            <CompanyCard
              company={company}
              index={index}
              onClick={() => handleCardClick(company.id)}
            />
          </Grid>
        ))}
      </Grid>

      {/* Show More Button */}
      <CustomButton
        text="Show More"
        onClick={handleShowMore}
        fullWidth={false}
      />
    </Container>
  );
};

export default Companies;
