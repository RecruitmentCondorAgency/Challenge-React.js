import * as React from 'react';
import { useContext, useState, ChangeEvent, FormEvent } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Header from "../../shared/Header/header";
import { validateForm } from "../../utils/helper";
import { request } from "../../utils/fetch";

interface SignupFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

function Signup() {
  const navigate = useNavigate();
  const { isAuthenticated, loginCtx } = useContext(AuthContext);
  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const validationRules = {
    email: ["required"],
    password: ["required", "minLength8"],
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setApiError(null);

    if (validateForm(formData, validationRules, setValidationErrors)) {
      try {
        const response = await request({
            baseUrl: 'http://localhost:3031',
            endPoint: '/users',
            method: 'POST',
            data: formData,
            header: { 'Content-Type': 'application/json' },            
        });
        if (response?.accessToken) {
            localStorage.setItem('token', JSON.stringify(response.accessToken));
            localStorage.setItem('userId', JSON.stringify(response.user.id));
            loginCtx(response?.accessToken);
            navigate('/dashboard', { replace: true });
        }
    } catch (error) {
        if (error.message) {
          setApiError(error.message);
        } else {
          setApiError("Signup failed. Please check your credentials and try again.");
        }
    }
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <React.Fragment>
      <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 16,
          }}
        >
          {apiError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              <AlertTitle>Error</AlertTitle>
              {apiError}
            </Alert>
          )}
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={(e) => handleSubmit(e)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  onChange={(e) => handleChange(e)}
                  error={Boolean(validationErrors.firstName)}
                  value={formData.firstName}
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  onChange={(e) => handleChange(e)}
                  value={formData.lastName}
                  error={Boolean(validationErrors.lastName)}
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  onChange={(e) => handleChange(e)}
                  error={Boolean(validationErrors.email)}
                  value={formData.email}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                {validationErrors.email && <span style={{ color: "red", fontSize: "14px" }}>{validationErrors.email}</span>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={(e) => handleChange(e)}
                  value={formData.password}
                  error={Boolean(validationErrors.password)}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                {validationErrors.password && <span style={{ color: "red", fontSize: "14px" }}>{validationErrors.password}</span>}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Signup;