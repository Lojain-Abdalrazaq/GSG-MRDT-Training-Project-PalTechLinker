import React from "react";
import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";
import Colors from "../../../Assets/Colors/Colors";
import CustomButton from "../../../CommonComponents/CustomButton";

const InternshipCard = ({ internship }) => {
  const getStatusStyles = (status) => {
    switch (status) {
      case "OPEN_FOR_APPLICATION":
        return {
          label: "Open for Application",
          color: "green",
          backgroundColor: "lightgreen",
          border: "1px solid green",
        };
      case "CLOSED_FOR_APPLICATION":
        return {
          label: "Closed for Application",
          color: "red",
          backgroundColor: "lightcoral",
          border: "1px solid red",
        };
      case "UNDER_REVIEW":
        return {
          label: "Under Review",
          color: "orange",
          backgroundColor: "lightyellow",
          border: "1px solid orange",
        };
      case "INTERVIEW_STAGE":
        return {
          label: "Interview Stage",
          color: "blue",
          backgroundColor: "lightblue",
          border: "1px solid blue",
        };
      case "OFFER_SENT":
        return {
          label: "Offer Sent",
          color: "purple",
          backgroundColor: "lavender",
          border: "1px solid purple",
        };
      case "CANCELED":
        return {
          label: "Canceled",
          color: "grey",
          backgroundColor: "lightgrey",
          border: "1px solid grey",
        };
      case "IN_PROGRESS":
        return {
          label: "In Progress",
          color: "orange",
          backgroundColor: "lightyellow",
          border: "1px solid orange",
        };
      case "COMPLETED":
        return {
          label: "Completed",
          color: "green",
          backgroundColor: "lightgreen",
          border: "1px solid green",
        };
      default:
        return {
          label: "Unknown",
          color: "black",
          backgroundColor: "lightgray",
        };
    }
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        padding: "1rem",
        backgroundColor: Colors.background,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        borderRadius: "15px",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
        },
      }}
    >
      {/* Company Logo */}
      <Avatar
        src={internship.company.imageUrl}
        alt={internship.company.name}
        sx={{ width: 100, height: 100, marginRight: "1.5rem" }}
      />

      {/* Internship Details */}
      <CardContent sx={{ flex: 1, textAlign: "left", position: "relative" }}>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "'Cairo', sans-serif",
            color: Colors.secondary,
            fontWeight: "bold",
          }}
        >
          {internship.name}
        </Typography>

        <Typography variant="body2" sx={{ fontFamily: "'Cairo', sans-serif" }}>
          {internship.company.name}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            fontFamily: "'Cairo', sans-serif",
            color: Colors.primary,
            fontWeight: "bold",
          }}
        >
          {internship.status}
        </Typography>

        <Box
          sx={{
            display: "inline-block",
            padding: "0px 20px",
            borderRadius: "15px",
            fontFamily: "'Cairo', sans-serif",
            fontWeight: "bold",
            right: 5,
            position: "absolute",
            ...getStatusStyles(internship.status),
          }}
        >
          {getStatusStyles(internship.status).label}
        </Box>

        <Typography
          variant="body2"
          sx={{
            marginTop: 5,
            fontFamily: "'Cairo', sans-serif",
          }}
        >
          {internship.description}
        </Typography>

        {/* Apply Now Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            marginTop: "1.5rem",
          }}
        >
          <CustomButton
            text="Apply Now"
            onClick={() => window.open(internship.applicationLink, "_blank")}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default InternshipCard;
