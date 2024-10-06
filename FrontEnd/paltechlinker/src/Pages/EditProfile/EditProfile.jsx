import React from "react";
import {
  Container,
  TextField,
  Typography,
  Paper,
  Box,
  Button,
  IconButton,
  Avatar,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Colors from "../../Assets/Colors/Colors";
import CustomButton from "../../CommonComponents/CustomButton";
import Image from "../../Assets/Images/login.png";
import { PhotoCamera } from "@mui/icons-material";
// Validation schema using Yup
const ProfileFormSchema = Yup.object().shape({
  companyName: Yup.string().required("Company name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  contactEmail: Yup.string().email("Invalid email format").required("Contact email is required"),
  address: Yup.string().required("Address is required"),
  companyWebsite: Yup.string().url("Invalid URL format").required("Company website is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  description: Yup.string().required("Description is required"),
  linkedInProfile: Yup.string().url("Invalid URL format").required("LinkedIn profile is required"),
});

const EditProfile = () => {
  const initialValues = {
    companyName: "",
    email: "",
    contactEmail: "",
    address: "",
    companyWebsite: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    description: "",
    linkedInProfile: "",
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
        {/* Left Side: Profile Form */}
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
              Edit Profile
            </Typography>

            <Formik
              initialValues={initialValues}
              validationSchema={ProfileFormSchema}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <Field
                    as={TextField}
                    label="Company Name"
                    name="companyName"
                    fullWidth
                    margin="normal"
                    error={touched.companyName && Boolean(errors.companyName)}
                    helperText={touched.companyName && errors.companyName}
                  />

                  <Field
                    as={TextField}
                    label="Email"
                    name="email"
                    fullWidth
                    margin="normal"
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />

                  <Field
                    as={TextField}
                    label="Contact Email"
                    name="contactEmail"
                    fullWidth
                    margin="normal"
                    error={touched.contactEmail && Boolean(errors.contactEmail)}
                    helperText={touched.contactEmail && errors.contactEmail}
                  />

                  <Field
                    as={TextField}
                    label="Address"
                    name="address"
                    fullWidth
                    margin="normal"
                    error={touched.address && Boolean(errors.address)}
                    helperText={touched.address && errors.address}
                  />

                  <Field
                    as={TextField}
                    label="Company Website"
                    name="companyWebsite"
                    fullWidth
                    margin="normal"
                    error={touched.companyWebsite && Boolean(errors.companyWebsite)}
                    helperText={touched.companyWebsite && errors.companyWebsite}
                  />

                  <Field
                    as={TextField}
                    label="Phone Number"
                    name="phoneNumber"
                    fullWidth
                    margin="normal"
                    error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                  />

                  <Field
                    as={TextField}
                    label="Password"
                    name="password"
                    type="password"
                    fullWidth
                    margin="normal"
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />

                  <Field
                    as={TextField}
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    fullWidth
                    margin="normal"
                    error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                  />

                  <Field
                    as={TextField}
                    label="Description"
                    name="description"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                  />

                  <Field
                    as={TextField}
                    label="LinkedIn Profile"
                    name="linkedInProfile"
                    fullWidth
                    margin="normal"
                    error={touched.linkedInProfile && Boolean(errors.linkedInProfile)}
                    helperText={touched.linkedInProfile && errors.linkedInProfile}
                  />

                  {/* Profile Image Upload */}
                  <Box display="flex" alignItems="center" mt={2}>
                    <Avatar sx={{ width: 80, height: 80 }} />
                    <IconButton
                      color="primary"
                      component="label"
                      style={{ marginLeft: "1rem" }}
                    >
                      <input hidden accept="image/*" type="file" />
                      <PhotoCamera />
                    </IconButton>
                    <Button variant="contained" component="label">
                      Upload Image
                      <input hidden accept="image/*" type="file" />
                    </Button>
                  </Box>

                  <CustomButton type="submit" text="Update" style={{ marginTop: "1rem" }} />
                </Form>
              )}
            </Formik>
          </Paper>
        </Box>

        {/* Right Side: Image Placeholder */}
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
            alt="profile"
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

export default EditProfile;
