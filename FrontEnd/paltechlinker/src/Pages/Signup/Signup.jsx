import React, { useState } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  Link,
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
import Image from "../../Assets/Images/signup.jpg";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (values) => {
    // Handle submit logic here
  };

  return (
    <Container
      maxWidth="100%"
      style={{
        backgroundColor: Colors.light,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingBottom: 80,
        paddingTop: 120,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "50%" }, paddingRight: "2rem" }}>
          <Paper
            elevation={3}
            style={{
              padding: "2rem",
              borderRadius: "8px",
              backgroundColor: Colors.background,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                component="h1"
                variant="h5"
                fontFamily={"'Cairo', sans-serif"}
              >
                Register Account
              </Typography>
              <Typography
                variant="body2"
                style={{
                  margin: "1rem 0",
                  textAlign: "center",
                  fontFamily: "'Cairo', sans-serif",
                }}
              >
                If you already have an account with us, please login at the{" "}
                <Link
                  href="/login"
                  variant="body2"
                  fontFamily={"'Cairo', sans-serif"}
                >
                  Login page
                </Link>
                .
              </Typography>
              <Formik
                initialValues={{
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
                }}
                validationSchema={Yup.object().shape({
                  companyName: Yup.string().required(
                    "Company Name is required"
                  ),
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
                  avatar: Yup.mixed().required("Company Avatar is required"),
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
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
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
                            setFieldValue(
                              "avatar",
                              event.currentTarget.files[0]
                            )
                          }
                        />
                      </Button>
                    </div>

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      sx={{
                        marginTop: "1.5rem",
                        fontFamily: "'Cairo', sans-serif",
                        backgroundColor: Colors.primary,
                        "&:hover": {
                          backgroundColor: Colors.secondary,
                        },
                      }}
                    >
                      Register
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
          </Paper>
        </Box>
        {/* <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            display:"flex",
            justifyContent:"flex-end",
            flexDirection:"column",
            alignItems:"flex-end",
            marginTop:20
        }}
        >
          <img
            src={Image}
            alt="Register"
            style={{
              width: "100%",
              maxWidth: "500px",
              height: "auto",
              borderRadius: "8px",
            }}
          />
        </Box> */}
      </Box>
    </Container>
  );
};

export default Register;
