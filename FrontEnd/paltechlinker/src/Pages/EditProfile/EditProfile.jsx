import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Box,
  IconButton,
  Avatar,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import * as Yup from "yup";
import Colors from "../../Assets/Colors/Colors";
import CustomButton from "../../CommonComponents/CustomButton";
import axios from "axios";
import Image from "../../Assets/Images/login.png";
import { useLocation, useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const location = useLocation();
  const id = location.state?.company_id;

  const [initialValues, setInitialValues] = useState({
    companyName: "",
    companyEmail: "",
    contactEmail: "",
    address: "",
    website: "",
    phone: "",
    password: "",
    confirmPassword: "",
    description: "",
    linkedIn: "",
    avatar: null,
    numberOfEmployees: "",
  });

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/companies/read/${id}`
        );
        const companyData = response.data;

        setInitialValues({
          companyName: companyData.name,
          companyEmail: companyData.email,
          contactEmail: companyData.contactEmail,
          address: companyData.address,
          website: companyData.websiteLink,
          phone: companyData.phoneNumber,
          password: companyData.password,
          confirmPassword: companyData.password,
          description: companyData.description,
          linkedIn: companyData.socialAccount,
          avatar: companyData.imageUrl || "https://via.placeholder.com/80",
          numberOfEmployees: companyData.numberOfEmployees,
        });
      } catch (error) {
        console.error("Error fetching company details", error);
      }
    };

    if (id) {
      fetchCompanyDetails();
    }
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      const response = await axios.patch(
        `http://localhost:8081/api/companies/update/partial/${id}`,
        {
          name: values.companyName,
          email: values.companyEmail,
          contactEmail: values.contactEmail,
          address: values.address,
          websiteLink: values.website,
          phoneNumber: values.phone,
          password: values.password,
          description: values.description,
          socialAccount: values.linkedIn,
          numberOfEmployees: values.numberOfEmployees,
          imageUrl: values.avatar || "https://via.placeholder.com/80",
        }
      );
      console.log("Update successful", response.data);
      navigate(`/company/${id}`, {
        state: { company_id: id },
      });
    } catch (error) {
      console.error("Error updating company details", error);
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
              enableReinitialize
              initialValues={initialValues}
              validationSchema={Yup.object().shape({
                companyName: Yup.string().required("Company Name is required"),
                companyEmail: Yup.string()
                  .email("Invalid email address")
                  .required("Company Email is required"),
                contactEmail: Yup.string()
                  .email("Invalid email address")
                  .required("Contact Email is required"),
                address: Yup.string().required("Address is required"),
                website: Yup.string()
                  .url("Invalid URL")
                  .required("Company Website is required"),
                phone: Yup.string()
                  .required("Phone Number is required")
                  .matches(/^\d{10}$/, "Phone number must be 10 digits"),
                password: Yup.string().required("Password is required"),
                confirmPassword: Yup.string()
                  .oneOf([Yup.ref("password"), null], "Passwords must match")
                  .required("Confirm Password is required"),
                description: Yup.string().required("Description is required"),
                linkedIn: Yup.string()
                  .url("Invalid LinkedIn URL")
                  .required("LinkedIn is required"),
                numberOfEmployees: Yup.number()
                  .required("Number of Employees is required")
                  .positive("Must be a positive number")
                  .integer("Must be an integer"),
              })}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue, errors, touched }) => (
                <Form style={{ width: "100%", marginTop: "1rem" }}>
                  <Field
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="companyName"
                    label="Company Name"
                    error={touched.companyName && !!errors.companyName}
                    helperText={touched.companyName && errors.companyName}
                    inputProps={{
                      style: { fontFamily: "'Cairo', sans-serif" },
                    }}
                    InputLabelProps={{
                      style: { fontFamily: "'Cairo', sans-serif" },
                    }}
                  />

                  <Field
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    disabled
                    name="companyEmail"
                    label="Company Email"
                    error={touched.companyEmail && !!errors.companyEmail}
                    helperText={touched.companyEmail && errors.companyEmail}
                    inputProps={{
                      style: { fontFamily: "'Cairo', sans-serif" },
                    }}
                    InputLabelProps={{
                      style: { fontFamily: "'Cairo', sans-serif" },
                    }}
                  />

                  <Field
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="contactEmail"
                    label="Contact Email"
                    error={touched.contactEmail && !!errors.contactEmail}
                    helperText={touched.contactEmail && errors.contactEmail}
                    inputProps={{
                      style: { fontFamily: "'Cairo', sans-serif" },
                    }}
                    InputLabelProps={{
                      style: { fontFamily: "'Cairo', sans-serif" },
                    }}
                  />

                  <Field
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="address"
                    label="Address"
                    error={touched.address && !!errors.address}
                    helperText={touched.address && errors.address}
                    inputProps={{
                      style: { fontFamily: "'Cairo', sans-serif" },
                    }}
                    InputLabelProps={{
                      style: { fontFamily: "'Cairo', sans-serif" },
                    }}
                  />

                  <Field
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="phone"
                    label="Phone Number"
                    error={touched.phone && !!errors.phone}
                    helperText={touched.phone && errors.phone}
                    inputProps={{
                      style: { fontFamily: "'Cairo', sans-serif" },
                    }}
                    InputLabelProps={{
                      style: { fontFamily: "'Cairo', sans-serif" },
                    }}
                  />

                  <Field
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="numberOfEmployees"
                    label="Number of Employees"
                    type="number"
                    error={
                      touched.numberOfEmployees && !!errors.numberOfEmployees
                    }
                    helperText={
                      touched.numberOfEmployees && errors.numberOfEmployees
                    }
                    inputProps={{
                      style: { fontFamily: "'Cairo', sans-serif" },
                    }}
                    InputLabelProps={{
                      style: { fontFamily: "'Cairo', sans-serif" },
                    }}
                  />

                  <div style={{ position: "relative" }}>
                    <Field
                      as={TextField}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="password"
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      error={touched.password && !!errors.password}
                      inputProps={{
                        style: { fontFamily: "'Cairo', sans-serif" },
                      }}
                      InputLabelProps={{
                        style: { fontFamily: "'Cairo', sans-serif" },
                      }}
                    />
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      style={{
                        position: "absolute",
                        right: 0,
                        top: "55%",
                        transform: "translateY(-50%)",
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </div>

                  <div style={{ position: "relative" }}>
                    <Field
                      as={TextField}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type={showConfirmPassword ? "text" : "password"}
                      error={
                        touched.confirmPassword && !!errors.confirmPassword
                      }
                      helperText={
                        touched.confirmPassword && errors.confirmPassword
                      }
                      inputProps={{
                        style: { fontFamily: "'Cairo', sans-serif" },
                      }}
                      InputLabelProps={{
                        style: { fontFamily: "'Cairo', sans-serif" },
                      }}
                    />
                    <IconButton
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      style={{
                        position: "absolute",
                        right: 0,
                        top: "55%",
                        transform: "translateY(-50%)",
                      }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </div>

                  <Field
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="website"
                    label="Company Website"
                    error={touched.website && !!errors.website}
                    helperText={touched.website && errors.website}
                    inputProps={{
                      style: { fontFamily: "'Cairo', sans-serif" },
                    }}
                    InputLabelProps={{
                      style: { fontFamily: "'Cairo', sans-serif" },
                    }}
                  />

                  <Field
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="description"
                    label="Company Description"
                    multiline
                    rows={4}
                    error={touched.description && !!errors.description}
                    helperText={touched.description && errors.description}
                    inputProps={{
                      style: { fontFamily: "'Cairo', sans-serif" },
                    }}
                    InputLabelProps={{
                      style: { fontFamily: "'Cairo', sans-serif" },
                    }}
                  />

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "1rem",
                    }}
                  >
                    <LinkedInIcon
                      style={{
                        marginRight: "0.5rem",
                        color: Colors.secondary,
                      }}
                    />
                    <Field
                      as={TextField}
                      variant="outlined"
                      fullWidth
                      name="linkedIn"
                      label="LinkedIn Profile"
                      error={touched.linkedIn && !!errors.linkedIn}
                      helperText={touched.linkedIn && errors.linkedIn}
                      inputProps={{
                        style: { fontFamily: "'Cairo', sans-serif" },
                      }}
                      InputLabelProps={{
                        style: { fontFamily: "'Cairo', sans-serif" },
                      }}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "1.5rem",
                    }}
                  >
                    <Avatar
                      sx={{ width: 100, height: 100, marginRight: "5rem" }}
                    />
                    <Button
                      variant="contained"
                      component="label"
                      style={{
                        fontFamily: "'Cairo', sans-serif",
                        color: "#fff",
                        backgroundColor: Colors.primary,
                        "&:hover": {
                          backgroundColor: Colors.secondary,
                        },
                      }}
                    >
                      Upload Image
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={(event) =>
                          setFieldValue("avatar", event.currentTarget.files[0])
                        }
                      />
                    </Button>
                  </div>

                  <CustomButton
                    text="Update"
                    fullWidth={true}
                    type="submit"
                  />
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
