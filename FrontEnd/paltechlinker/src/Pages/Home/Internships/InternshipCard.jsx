import React from "react";
import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";
import Colors from "../../../Assets/Colors/Colors";
import CustomButton from "../../../CommonComponents/CustomButton";

const InternshipCard = ({ internship }) => {
  const getStatusStyles = (status) => {
    switch (status) {
      case "open":
        return {
          color: "green",
          backgroundColor: "lightgreen",
          border: "1px solid green",
        };
      case "closed":
        return {
          color: "red",
          backgroundColor: "lightcoral",
          border: "1px solid red",
        };
      case "in progress":
        return {
          color: "orange",
          backgroundColor: "lightyellow",
          border: "1px solid orange",
        };
      default:
        return { color: "black", backgroundColor: "lightgray" };
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
        src={internship.image}
        alt={internship.title}
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
          {internship.title}
        </Typography>

        <Typography variant="body2" sx={{ fontFamily: "'Cairo', sans-serif" }}>
          {internship.company}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            fontFamily: "'Cairo', sans-serif",
            color: Colors.primary,
            fontWeight: "bold",
          }}
        >
          {internship.type}
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
          {internship.status}
        </Box>

        {/* Internship Description */}
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
          <CustomButton text="Apply Now" onClick={() => console.log("Apply")} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default InternshipCard;
