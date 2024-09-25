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
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as Yup from "yup";
import Colors from "../../Assets/Colors/Colors";
import Image from "../../Assets/Images/signup.jpg";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values) => {
    // Handle login logic here
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
        paddingTop: 120,
        minHeight: "100vh", 
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start", 
          justifyContent: "space-between", 
          width: "100%",
          maxWidth: "1200px",
          height: "auto", 
        }}
      >
        {/* Left Side: Login Form */}
        <Box sx={{ width: { xs: "100%", md: "50%" }, paddingRight: "2rem" }}>
          <Paper
            elevation={3}
            style={{
              padding: "2rem",
              borderRadius: "8px",
              backgroundColor: Colors.background,
              minHeight: "500px", 
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              fontFamily={"'Cairo', sans-serif"}
              align="center"
            >
              Log In
            </Typography>
            <Typography
              variant="body2"
              style={{
                margin: "1rem 0",
                textAlign: "center",
                fontFamily: "'Cairo', sans-serif",
              }}
            >
              Don't have an account?{" "}
              <Link
                href="/signup"
                variant="body2"
                fontFamily={"'Cairo', sans-serif"}
              >
                Sign Up here
              </Link>
              .
            </Typography>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
                password: Yup.string().required("Password is required"),
              })}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form style={{ width: "100%", marginTop: "1rem" }}>
                  <Field
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="email"
                    label="Email"
                    error={touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
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
                      helperText={touched.password && errors.password}
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
                    Log In
                  </Button>
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
            marginTop: { xs: "2rem", md: "0" },
          }}
        >
          <img
            src={Image}
            alt="Login"
            style={{
              width: "100%", 
              maxWidth: "500px",
              height: "auto",
              minHeight: "500px", 
              borderRadius: "8px",
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
