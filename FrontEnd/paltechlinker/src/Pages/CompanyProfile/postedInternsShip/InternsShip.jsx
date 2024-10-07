import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";
import Colors from "../../../Assets/Colors/Colors";
import InternshipCard from "../../Home/Internships/InternshipCard";
import axios from "axios";
import CustomButton from "../../../CommonComponents/CustomButton";
import { useNavigate } from "react-router-dom";

const CompaniesIntern = ({ companyId }) => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const storedCompanyId = localStorage.getItem("company_id");

  // Fetch internships data from the API
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/interns/read/all/company/${companyId}`
        );
        setInternships(response.data);
      } catch (error) {
        console.error("Error fetching company data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, [companyId]);

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

  return (
    <Container
      maxWidth="100%"
      sx={{
        backgroundColor: Colors.background,
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
          Posted Internships
        </Typography>
        <span
          style={{
            content: '""',
            display: "block",
            width: 280,
            height: "4px",
            backgroundColor: Colors.secondary,
            position: "absolute",
            bottom: "-10px",
          }}
        />
      </Box>

      {/* Internships Cards */}
      <Grid container spacing={4} justifyContent="center">
        {internships.length > 0 ? (
          internships.map((internship) => (
            <Grid item xs={12} sm={6} md={4} key={internship.id}>
              <InternshipCard internship={internship} />
            </Grid>
          ))
        ) : (
          <Typography sx={{ marginTop: 3 }}>
            No internships available for this company.
          </Typography>
        )}
      </Grid>
      {storedCompanyId && storedCompanyId === companyId && (
        <CustomButton
          text="Add Internships"
          fullWidth={false}
          sx={{
            fontSize: "1.2rem",
            padding: "0.8rem 2.5rem",
            borderRadius: "10px",
          }}
          onClick={() =>
            navigate(`/AddInternShip/${companyId}`, {
              state: { company_id: companyId },
            })
          }
        />
      )}
    </Container>
  );
};

export default CompaniesIntern;
