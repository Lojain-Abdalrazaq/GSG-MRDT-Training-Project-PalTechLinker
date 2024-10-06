import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Paper,
  Box,
  MenuItem,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Colors from "../../Assets/Colors/Colors";
import Image from "../../Assets/Images/login.png";
import CustomButton from "../../CommonComponents/CustomButton";
import axios from "axios";
import { useLocation } from "react-router-dom";

const InternshipFormSchema = Yup.object().shape({
  internshipName: Yup.string().required("Internship name is required"),
  type: Yup.string().required("Type is required"),
  status: Yup.string().required("Status is required"),
  description: Yup.string().required("Internship description is required"),
  ApplicationLink: Yup.string()
    .url("Invalid URL format")
    .required("Application link is required"),
});

const Edit = () => {
  const [statuses, setStatuses] = useState([]);
  const [types, setTypes] = useState([]);
  const [companyId, setCompanyId] = useState(null);
  const location = useLocation();
  const id = location.state?.internship_id;

  const [initialValues, setInitialValues] = useState({
    internshipName: "",
    type: "",
    status: "",
    description: "",
    ApplicationLink: "",
  });

  // Fetch internship details
  useEffect(() => {
    const fetchInternshipDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/interns/read/${id}`
        );
        const data = response.data;
        setInitialValues({
          internshipName: data.name,
          type: data.type,
          status: data.status,
          description: data.description,
          ApplicationLink: data.applicationLink,
        });

        // Set company ID from the response
        setCompanyId(data.company.id);
      } catch (error) {
        console.error("Error fetching internship details:", error);
      }
    };

    if (id) {
      fetchInternshipDetails();
    }
  }, [id]);

  // Fetch internship statuses and types
  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/interns/application-status"
        );
        setStatuses(response.data);
      } catch (error) {
        console.error("Error fetching statuses:", error);
      }
    };

    const fetchTypes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/interns/internship-type"
        );
        setTypes(response.data);
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    };

    fetchStatuses();
    fetchTypes();
  }, []);

  const handleSubmit = async (values) => {
    const internshipData = {
      name: values.internshipName,
      applicationLink: values.ApplicationLink,
      description: values.description,
      status: values.status,
      type: values.type,
      company: {
        id: companyId,
      },
    };

    try {
      const response = await axios.patch(
        `http://localhost:8081/api/interns/update/partial/${id}`,
        internshipData
      );
      if (response.status === 200) {
        console.log("Internship updated successfully!");
      }
    } catch (error) {
      console.error("Error updating internship:", error);
    }
  };

  return (
    <Container
      maxWidth="100%"
      style={{
        backgroundColor: Colors.light,
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: "1000px",
          height: "auto",
          backgroundColor: Colors.background,
          padding: "2rem",
          borderRadius: "8px",
        }}
      >
        {/* Left Side: Internship Form */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            paddingRight: { md: "2rem" },
          }}
        >
          <Paper
            elevation={3}
            style={{
              padding: "2rem",
              borderRadius: "8px",
              backgroundColor: Colors.background,
              minHeight: "400px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              fontFamily={"'Cairo', sans-serif"}
              align="center"
            >
              Edit Internship
            </Typography>

            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={InternshipFormSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, handleChange, values }) => (
                <Form>
                  <Field
                    as={TextField}
                    label="Internship Name"
                    name="internshipName"
                    fullWidth
                    margin="normal"
                    error={
                      touched.internshipName && Boolean(errors.internshipName)
                    }
                    helperText={touched.internshipName && errors.internshipName}
                  />

                  <Field
                    as={TextField}
                    label="Type"
                    name="type"
                    select
                    fullWidth
                    margin="normal"
                    value={values.type}
                    onChange={handleChange}
                    error={touched.type && Boolean(errors.type)}
                    helperText={touched.type && errors.type}
                  >
                    {types.map((type, index) => (
                      <MenuItem key={index} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Field>

                  <Field
                    as={TextField}
                    label="Application Link"
                    name="ApplicationLink"
                    fullWidth
                    margin="normal"
                    error={
                      touched.ApplicationLink && Boolean(errors.ApplicationLink)
                    }
                    helperText={
                      touched.ApplicationLink && errors.ApplicationLink
                    }
                  />

                  <Field
                    as={TextField}
                    label="Status"
                    name="status"
                    select
                    fullWidth
                    margin="normal"
                    value={values.status}
                    onChange={handleChange}
                    error={touched.status && Boolean(errors.status)}
                    helperText={touched.status && errors.status}
                  >
                    {statuses.map((status, index) => (
                      <MenuItem key={index} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Field>

                  <Field
                    as={TextField}
                    label="Internship Description"
                    name="description"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                  />

                  <CustomButton
                    type="submit"
                    text="Edit"
                    style={{ marginTop: "1rem" }}
                  />
                </Form>
              )}
            </Formik>
          </Paper>
        </Box>

        {/* Right Side: Image */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={Image}
            alt="Internship"
            style={{
              width: "100%",
              maxWidth: "500px",
              height: "auto",
              borderRadius: "8px",
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Edit;
