import React from "react";
import {
  Container,
  TextField,
  Typography,
  Paper,
  Box,
  MenuItem
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Colors from "../../Assets/Colors/Colors";
import Image from "../../Assets/Images/login.png";
import CustomButton from "../../CommonComponents/CustomButton";


const InternshipFormSchema = Yup.object().shape({
  internshipName: Yup.string().required("Internship name is required"),
  type: Yup.string().required("Type is required"),
  status: Yup.string().required("Status is required"),
  description: Yup.string().required("Internship description is required"),
  ApplicationLink: Yup.string()
  .url("Invalid URL format") 
  .required("Application link is required"), 

});

const Add = () => {
  const initialValues = {
    internshipName: '',
    type: '',
    status: 'green', 
    description: '',
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
              Add InternShip
            </Typography>

            <Formik
              initialValues={initialValues}
              validationSchema={InternshipFormSchema}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {({ errors, touched, handleChange, values }) => (
                <Form>
                  <Field
                    as={TextField}
                    label="Internship Name"
                    name="internshipName"
                    fullWidth
                    margin="normal"
                    error={touched.internshipName && Boolean(errors.internshipName)}
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
                    <MenuItem value="on-site">On-Site</MenuItem>
                    <MenuItem value="remotely">Remotely</MenuItem>
                    <MenuItem value="hybrid">Hybrid</MenuItem>
                  </Field>
                  <Field
                    as={TextField}
                    label="Application Link"
                    name="ApplicationLink"
                    fullWidth
                    margin="normal"
                    error={touched.ApplicationLink && Boolean(errors.ApplicationLink)}
                    helperText={touched.ApplicationLink && errors.ApplicationLink}
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
                    style={{
                      backgroundColor: values.status === 'green' ? 'lightgreen' : 'lightcoral',
                    }}
                    error={touched.status && Boolean(errors.status)}
                    helperText={touched.status && errors.status}
                  >
                    <MenuItem value="green">Active</MenuItem>
                    <MenuItem value="red">Inactive</MenuItem>
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
                    text="Submit"
                    style={{ marginTop: '1rem' }}
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

export default Add;
