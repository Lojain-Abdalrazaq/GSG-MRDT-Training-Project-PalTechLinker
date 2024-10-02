import React from "react";
import { Card, CardContent, Avatar, Typography, Box } from "@mui/material";
import Colors from "../../../Assets/Colors/Colors";
import CustomButton from "../../../CommonComponents/CustomButton";

const CompanyCard = ({ company, index }) => {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "1.5rem", 
        backgroundColor: index % 2 === 0 ? Colors.gray : Colors.secondary,
        boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        borderRadius: "20px", 
        width: 450, 
        height: 180, 
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
        "&": {
          transform: "translateY(-5px)",
          boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
        },
      }}
    >
      <Avatar
        src={company.logo}
        alt={company.name}
        sx={{ width: 100, height: 100 }} 
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flexGrow: 1,
        }}
      >
         <Box
          sx={{
            display: "inline-block",
            padding: "0px 20px",
            borderRadius: "15px",
            fontFamily: "'Cairo', sans-serif",
            fontWeight: "bold",
            right: 5,
            position: "absolute",
           
          }}
        >
          {company.status}
        </Box>
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
        {/* أزرار تعديل وحذف */}
        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 1 }}>
          <CustomButton text="edit" fullWidth={false} />
          <CustomButton text="delete" fullWidth={false} />
        </Box>
      </CardContent>
    </Card>
        
        
  );
};

export default CompanyCard;
