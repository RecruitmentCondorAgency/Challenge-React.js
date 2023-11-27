import * as React from 'react';
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Header from "../../containers/Header/header";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { AuthContext } from "../../routes/AuthContext";
import { validateForm } from "../../utils/utils";
import { request } from "../../api/requestAction";

function Login() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const validationRules = {
        email: ["required"],
        password: ["required", "minLength8"],
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    async function handleSubmit(e) {
        e.preventDefault()
        if (validateForm(formData, validationRules, setErrors)) {
            try {
                const response = await request({
                    baseUrl: 'http://localhost:3031',
                    endPoint: '/login',
                    method: 'POST',
                    data: formData,
                    header: { 'Content-Type': 'application/json' },            
                });
                if (response?.accessToken) {
                    localStorage.setItem('token', JSON.stringify(response.accessToken));
                    localStorage.setItem('userId', JSON.stringify(response.user.id));
                    login(response?.accessToken);
                    navigate('/dashboard', { replace: true });
                }
            } catch (error) {
                setErrorMessage('Login failed. Please check your credentials and try again.');
                console.error('Error during login:', error);
            }
        }
    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: "" });
    }

    return (
        <React.Fragment>
            <Header />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        mt: 16,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {errorMessage && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {errorMessage}
                        </Alert>
                    )}
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main', mt: 5 }}>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign In
                    </Typography>
                    <Box component="form" onSubmit={e => handleSubmit(e)} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            value={formData.email}
                            onChange={e => handleChange(e)}
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            error={!!errors.email}
                        />
                        {errors.email && <span style={{ color: "red", fontSize: "14px" }}>{errors.email}</span>}

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            value={formData.password}
                            onChange={e => handleChange(e)}
                            label="Password"
                            id="password"
                            autoComplete="current-password"
                            error={!!errors.password}
                            type={showPassword ? "text" : "password"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleTogglePassword} edge="end">
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {errors.password && <span style={{ color: "red", fontSize: "14px" }}>{errors.password}</span>}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent={"center"}>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </React.Fragment>
    )
}

export default Login;
