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
import CompanyCard from "../Home/Companies/CompanyCard";
import Colors from "../../Assets/Colors/Colors";

const CompaniesPage = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]); // State for filtered companies
  const [currentPage, setCurrentPage] = useState(1); // State for the current page
  const [totalPages, setTotalPages] = useState(1); // State for the total number of pages
  const [nameSearch, setNameSearch] = useState(""); // State for name search input
  const [addressSearch, setAddressSearch] = useState(""); // State for address search input
  const companiesPerPage = 9; // Set 9 companies per page
  const navigate = useNavigate();

  // Fetch companies from the API
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/companies/read/all"
        );
        setCompanies(response.data.content);
        setFilteredCompanies(response.data.content);
        setTotalPages(
          Math.ceil(response.data.content.length / companiesPerPage)
        );
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  // Pagination handler
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Filter companies based on name and address search terms
  useEffect(() => {
    const results = companies.filter(
      (company) =>
        company.name.toLowerCase().includes(nameSearch.toLowerCase()) &&
        company.address.toLowerCase().includes(addressSearch.toLowerCase())
    );
    setFilteredCompanies(results);
    setTotalPages(Math.ceil(results.length / companiesPerPage));
    setCurrentPage(1); // Reset to first page when search term changes
  }, [nameSearch, addressSearch, companies]);

  // Calculate the companies to display on the current page
  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = filteredCompanies.slice(
    indexOfFirstCompany,
    indexOfLastCompany
  );

  const handleCardClick = (id) => {
    navigate(`/company/${id}`, {
      state: { company_id: id },
    });
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
      </Box>

      {/* Company Cards */}
      <Grid
        container
        spacing={4}
        justifyContent="center"
        sx={{ paddingInline: 5 }}
      >
        {currentCompanies.length > 0 ? (
          currentCompanies.map((company, index) => (
            <Grid item xs={12} sm={6} md={4} key={company.id}>
              <CompanyCard
                company={{
                  id: company.id,
                  logo: company.imageUrl,
                  name: company.name,
                  address: company.address,
                }}
                index={index}
                onClick={() => handleCardClick(company.id)}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="h6">No companies found</Typography>
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

export default CompaniesPage;
