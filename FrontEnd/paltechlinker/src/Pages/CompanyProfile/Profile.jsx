import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Container,
  Avatar,
  Card,
  CardContent,
  Divider,
  CircularProgress,
} from "@mui/material";
import Colors from "../../Assets/Colors/Colors";
import CustomButton from "../../CommonComponents/CustomButton";
import axios from "axios";

const Profile = ({ companyId }) => {
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/companies/read/${companyId}`
        );
        setCompanyData(response.data);
      } catch (error) {
        console.error("Error fetching company data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanyData();
  }, [companyId]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
      style={{
        backgroundColor: Colors.background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 80,
        paddingTop: 150,
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          maxWidth: 1000,
          margin: "auto",
          padding: 3,
          boxShadow: 2,
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        {/* Company Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
            position: "relative",
            width: "100%",
            "&::before, &::after": {
              content: '""',
              position: "absolute",
              top: "50%",
              width: "40%",
              height: "1px",
              backgroundColor: Colors.secondary,
            },
            "&::before": {
              left: 0,
              marginRight: "1rem",
            },
            "&::after": {
              right: 0,
              marginLeft: "1rem",
            },
          }}
        >
          {companyData?.imageUrl && (
            <Avatar
              src={companyData.imageUrl}
              alt={companyData.name}
              sx={{ width: 100, height: 100 }}
            />
          )}
        </Box>

        {/* Edit Profile Button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CustomButton text="Edit Profile" />
        </Box>

        <Box sx={{ marginBottom: 5 }}>
          <Typography
            align="center"
            gutterBottom
            variant="h4"
            sx={{
              fontFamily: "'Cairo', sans-serif",
              fontWeight: "bold",
            }}
          >
            {companyData?.name}
          </Typography>

          <Typography variant="subtitle1" align="center" gutterBottom>
            {companyData?.address}
          </Typography>
        </Box>

        {/* Company Information: Description and Contact Cards */}
        <Grid container spacing={3}>
          {/* Description Card */}
          <CardInfoCard title="Description" content={companyData?.description} />

          {/* Contact Information Card */}
          <CardInfoCard
            title="Contact Information"
            content={
              <>
                <Typography>Phone: {companyData?.phoneNumber}</Typography>
                <Typography>Email: {companyData?.contactEmail}</Typography>
                <Typography>Website: {companyData?.websiteLink}</Typography>
                <Typography>LinkedIn: {companyData?.socialAccount}</Typography>
              </>
            }
          />
        </Grid>
      </Box>
    </Container>
  );
};

// Reusable Card Component
const CardInfoCard = ({ title, content }) => (
  <Grid item xs={12} md={6}>
    <Card
      sx={{
        boxShadow: 2,
        height: 300,
        maxWidth: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "15px",
        padding: 2,
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        {title}
      </Typography>
      <Divider sx={{ width: "100%", mb: 2 }} />
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          textAlign: "center",
        }}
      >
        {content || "No information available"}
      </CardContent>
    </Card>
  </Grid>
);

export default Profile;
