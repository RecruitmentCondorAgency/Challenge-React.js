import { yupResolver } from "@hookform/resolvers/yup";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Alert,
  Box,
  Button,
  Container,
  InputAdornment,
  TextField,
} from "@mui/material";
import { FC, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { keys } from "../../common/constants/keys.constants";
import { paths } from "../../common/constants/paths.constants";
import { localstorageManager } from "../../common/utils";
import { withAuthProvider } from "../../providers/auth/auth.hoc";
import { useAuth } from "../../providers/auth/auth.hook";
import { LoginVariables } from "../../providers/auth/types";
import { validationSchema } from "./Login.validation";

const Login: FC = () => {
  const navigate = useNavigate();
  const [{ authenticated, loginData, loginError, loginLoading }, { login }] =
    useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginVariables>({ resolver: yupResolver(validationSchema) });

  useEffect(() => {
    if (authenticated) {
      navigate(paths.UNIVERSITY.SEARCH);
    }
  }, [authenticated, navigate]);

  const onSubmit = useCallback(
    (values: LoginVariables) => {
      login(values);
    },
    [login]
  );

  useEffect(() => {
    if (loginData?.[0]?.id) {
      localstorageManager.setItem(keys.USER_ID, String(loginData[0].id));
      navigate(paths.UNIVERSITY.SEARCH);
    }
  }, [loginData, navigate]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          maxWidth: 548,
          padding: "24px 16px",
          background: "white",
          boxShadow:
            "0px 6px 12px rgba(0, 0, 0, 0.06), 0px 12px 18px rgba(0, 0, 0, 0.1)",
          borderRadius: 1,
        }}
      >
        {loginError && <Alert severity="error">{loginError}</Alert>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            error={Boolean(errors.email?.message)}
            label="Email"
            helperText={errors.email?.message ?? ""}
            InputProps={{
              endAdornment: <InputAdornment position="end">*</InputAdornment>,
            }}
            fullWidth
            sx={{}}
            {...register("email")}
          />
          <TextField
            error={Boolean(errors.password?.message)}
            label="Password"
            helperText={errors.password?.message ?? ""}
            InputProps={{
              endAdornment: <InputAdornment position="end">*</InputAdornment>,
            }}
            fullWidth
            type="password"
            sx={{
              marginTop: 2.5,
            }}
            {...register("password")}
          />
          <Button
            sx={{
              marginTop: 2.5,
            }}
            variant="contained"
            fullWidth
            type="submit"
            size="large"
            endIcon={<ArrowForwardIcon />}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default withAuthProvider(Login);
