import React, { useState } from "react";
import {
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
import axios from "axios";
import Colors from "../../Assets/Colors/Colors";
import Image from "../../Assets/Images/login.png";
import CustomButton from "../../CommonComponents/CustomButton";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/auth/login",
        {
          email: values.email,
          password: values.password,
        }
      );

      // Handle success response
      if (response.status === 200) {
        const { company_id, message } = response.data;
        console.log("Login successful, Company ID:", company_id);

        //store the company_id in local storage
        localStorage.setItem("company_id", company_id);

        navigate(`/company/${company_id}`, {
          state: { company_id: company_id },
        });
      }
    } catch (error) {
      // Handle error response (e.g., 401 Unauthorized)
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid email or password");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
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
            {errorMessage && (
              <Typography
                variant="body2"
                color="error"
                style={{ marginBottom: "1rem", textAlign: "center" }}
              >
                {errorMessage}
              </Typography>
            )}
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

                  <CustomButton text="Log In" fullWidth={true} type="submit" />
                </Form>
              )}
            </Formik>
          </Paper>
        </Box>

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
            alt="Login"
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

export default Login;
