import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import * as classes from "./LoginPage.styles";
import { AuthContext } from "../../app";
import { red } from "@mui/material/colors";

export function LoginPage() {
  const auth = React.useContext(AuthContext);
  const { usersAvailable } = auth;
  let [haveAccount, setHaveAccount] = React.useState<boolean>(true);
  let [pageTitle, setPageTitle] = React.useState<string>("Sign in");
  let [formError, setFormError] = React.useState<string>("");
  const validateLogin = (user: { email: string; password: string }) => {
    const foundUser = usersAvailable.find((item) => item.email === user.email);
    if (!foundUser) {
      return {
        success: false,
        msg: "User not found",
        foundUser: null,
      };
    }
    if (foundUser.password !== user.password) {
      return {
        success: false,
        msg: "Invalid password",
        foundUser: null,
      };
    }
    return {
      success: true,
      msg: "",
      foundUser,
    };
  };
  const validateRegister = (user: { email: string; password: string }) => {
    const foundUser = usersAvailable.find((item) => item.email === user.email);
    if (!user.email || !user.password) {
      return {
        success: false,
        msg: "Most enter email and password",
        foundUser: null,
      };
    }
    if (foundUser) {
      return {
        success: false,
        msg: "User already exist",
        foundUser: null,
      };
    }
    return {
      success: true,
      msg: "",
      foundUser: { ...user, id: usersAvailable.length + 1 },
    };
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      email: String(data.get("email")),
      password: String(data.get("password")),
    };
    if (haveAccount) {
      const validationResult = validateLogin(user);
      if (validationResult.success) {
        setFormError("");
        auth.signIn(validationResult.foundUser);
      } else {
        setFormError(validationResult.msg);
      }
    }
    if (!haveAccount) {
      const validationResult = validateRegister(user);
      if (validationResult.success) {
        setFormError("");
        auth.createNewUser(validationResult.foundUser);
      } else {
        setFormError(validationResult.msg);
      }
    }
  };

  return (
    <Container style={{ ...classes.LoginContainer, flexDirection: "column" }}>
      <CssBaseline />
      <Typography component="h1" variant="h5">
        {pageTitle}
      </Typography>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {formError.length > 0 && (
            <Typography component="span" color={red[900]}>
              {formError}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {pageTitle}
          </Button>
          <Grid container>
            {haveAccount && (
              <Grid item>
                <span
                  onClick={() => {
                    setHaveAccount(false);
                    setPageTitle("Sign up");
                  }}
                >
                  Don't have an account? Sign Up
                </span>
              </Grid>
            )}
            {!haveAccount && (
              <Grid item>
                <span
                  onClick={() => {
                    setHaveAccount(true);
                    setPageTitle("Sign in");
                  }}
                >
                  Have an account? Sign In
                </span>
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
