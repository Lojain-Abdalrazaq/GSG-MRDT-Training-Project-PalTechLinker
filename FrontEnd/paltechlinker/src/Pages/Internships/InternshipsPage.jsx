import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Container,
  Pagination,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Colors from "../../Assets/Colors/Colors";
import InternshipCard from "../Home/Internships/InternshipCard";

const InternshipsPage = () => {
  const [interns, setInterns] = useState([]);
  const [filteredInterns, setFilteredInterns] = useState([]); // State for filtered interns
  const [currentPage, setCurrentPage] = useState(1); // State for the current page
  const [totalPages, setTotalPages] = useState(1); // State for the total number of pages
  const [nameSearch, setNameSearch] = useState(""); // State for name search input
  const [addressSearch, setAddressSearch] = useState(""); // State for address search input
  const [statusSearch, setStatusSearch] = useState(""); // State for status search input
  const internsPerPage = 12; // Set 12 interns per page
  const navigate = useNavigate();

  // Fetch interns from the API
  useEffect(() => {
    const fetchInterns = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/interns/read/all"
        );
        setInterns(response.data.content);
        setFilteredInterns(response.data.content);
        setTotalPages(Math.ceil(response.data.content.length / internsPerPage));
      } catch (error) {
        console.error("Error fetching interns:", error);
      }
    };
    fetchInterns();
  }, []);

  // Pagination handler
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Filter interns based on name, address, and status search terms
  useEffect(() => {
    const results = interns.filter(
      (internship) =>
        internship.name.toLowerCase().includes(nameSearch.toLowerCase()) &&
        internship.company.address
          .toLowerCase()
          .includes(addressSearch.toLowerCase()) &&
        internship.status.toLowerCase().includes(statusSearch.toLowerCase())
    );
    setFilteredInterns(results);
    setTotalPages(Math.ceil(results.length / internsPerPage));
    setCurrentPage(1); // Reset to first page when search term changes
  }, [nameSearch, addressSearch, statusSearch, interns]);

  // Calculate the interns to display on the current page
  const indexOfLastInternship = currentPage * internsPerPage;
  const indexOfFirstInternship = indexOfLastInternship - internsPerPage;
  const currentInterns = filteredInterns.slice(
    indexOfFirstInternship,
    indexOfLastInternship
  );

  const handleCardClick = (id) => {
    navigate(`/interns/read/${id}`);
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
        paddingTop: 15,
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

      {/* Search Bars */}
      <Box sx={{ width: "60%", marginBottom: 4, display: "flex", gap: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by name"
          value={nameSearch}
          onChange={(e) => setNameSearch(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: Colors.primary, // Border color when focused
              },
            },
          }}
        />
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by address"
          value={addressSearch}
          onChange={(e) => setAddressSearch(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: Colors.primary,
              },
            },
          }}
        />
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by status"
          value={statusSearch}
          onChange={(e) => setStatusSearch(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: Colors.primary,
              },
            },
          }}
        />
      </Box>

      {/* internship Cards */}
      <Grid
        container
        spacing={4}
        justifyContent="center"
        sx={{ paddingInline: 5 }}
      >
        {currentInterns.length > 0 ? (
          currentInterns.map((internship) => (
            <Grid item xs={12} sm={6} md={4} key={internship.id}>
              <InternshipCard
                internship={internship}
                onClick={() => handleCardClick(internship.id)}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="h6">No interns found</Typography>
        )}
      </Grid>

      {/* Pagination */}
      <Box sx={{ marginTop: 5 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          sx={{
            display: "flex",
            justifyContent: "center",
            "& .MuiPaginationItem-root": {
              backgroundColor: Colors.primary,
              color: Colors.background,
            },
            "& .Mui-selected": {
              backgroundColor: Colors.secondary,
              color: Colors.background,
            },
          }}
        />
      </Box>
    </Container>
  );
};

export default InternshipsPage;
