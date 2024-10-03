import React from "react";
import { Box, Grid, Typography, Container } from "@mui/material";
import Colors from "../../../Assets/Colors/Colors";
import CompanyCard from "./PostesInternshipCadr";
import CustomButton from "../../../CommonComponents/CustomButton";
import  { useEffect, useState } from 'react';



const CompaniesIntern = (companyId) => {
  const [companies, setCompanies] = useState([]); 
  useEffect(() => {
    fetch(`/company/${companyId}`)
          .then(response => response.json())
      .then(data => setCompanies(data))
      .catch(error => console.error('Error fetching companies:', error));
  }, []);
  return (
    <Container
      maxWidth="lg"
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
        spacing={6} 
        justifyContent="center"
      >
        {companies.map((company, index) => (
          <Grid item xs={12} sm={6} md={5} lg={5} key={company.id}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <CompanyCard company={company} index={index} />
          </Grid>
        ))}
      </Grid>

      {/* Show More Button */}
      <Box mt={4}>
        <CustomButton text="Show More" fullWidth={false} />
      </Box>
    </Container>
  );
};

export default CompaniesIntern;
