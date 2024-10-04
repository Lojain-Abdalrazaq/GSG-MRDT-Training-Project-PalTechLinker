import React from "react";
import { Card, CardContent, Avatar, Typography } from "@mui/material";
import Colors from "../../../Assets/Colors/Colors";

const CompanyCard = ({ company, index, onClick }) => {
  return (
    <Card
      onClick={onClick} 
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "1rem",
        backgroundColor: index % 2 === 0 ? Colors.gray : Colors.secondary,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        borderRadius: "15px",
        width: 380,
        height: 150,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
        },
      }}
    >
      <Avatar
        src={company.imageUrl || "https://via.placeholder.com/80"}
        alt={company.name}
        sx={{ width: 80, height: 80 }}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flexGrow: 1,
          marginLeft: "1rem",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: "'Cairo', sans-serif",
            color: Colors.primary,
            textAlign: "left",
          }}
        >
          {company.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontFamily: "'Cairo', sans-serif",
            color: index % 2 === 0 ? Colors.secondary : Colors.background,
            textAlign: "left",
          }}
        >
          {company.address}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;

