import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Colors from "../../../Assets/Colors/Colors";
import CustomButton from "../../../CommonComponents/CustomButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const InternshipCard = ({ internship, onClick }) => {
  const storedCompanyId = localStorage.getItem("company_id");
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Get status styles for internship
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

  // Handle opening the confirmation dialog
  const handleDeleteClick = () => {
    setOpenDialog(true);
  };

  // Handle confirming the deletion
  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await axios.delete(
        `http://localhost:8081/api/interns/delete/${internship.id}`
      );
      if (response.status === 204) {
        console.log("Internship deleted successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting internship:", error);
    } finally {
      setIsDeleting(false);
      setOpenDialog(false);
    }
  };

  return (
    <>
      <Card
        onClick={onClick}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          padding: "1rem",
          backgroundColor: Colors.background,
          height: 350,
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
        <CardContent
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
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

          <Typography
            variant="body2"
            sx={{ fontFamily: "'Cairo', sans-serif" }}
          >
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
            {internship.type}
          </Typography>

          <Box
            sx={{
              display: "inline-block",
              padding: "0px 20px",
              borderRadius: "15px",
              fontFamily: "'Cairo', sans-serif",
              fontWeight: "bold",
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

          {/* Conditionally Render Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              marginTop: "auto",
            }}
          >
            {storedCompanyId ? (
              storedCompanyId == internship.company.id ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <CustomButton
                    text="Edit"
                    fullWidth={false}
                    onClick={() =>
                      navigate(`/EditInternShip/${internship.id}`, {
                        state: { internship_id: internship.id },
                      })
                    }
                  />
                  <CustomButton
                    text="Delete"
                    fullWidth={false}
                    onClick={handleDeleteClick}
                  />
                </Box>
              ) : null
            ) : (
              <CustomButton
                text="Apply Now"
                onClick={() =>
                  window.open(internship.applicationLink, "_blank")
                }
              />
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontFamily: "'Cairo', sans-serif" }}>
            Are you sure you want to delete this internship?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CustomButton text="Cancel" onClick={() => setOpenDialog(false)} />
          <CustomButton
            text={isDeleting ? "Deleting..." : "Confirm"}
            onClick={handleConfirmDelete}
            disabled={isDeleting}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InternshipCard;
