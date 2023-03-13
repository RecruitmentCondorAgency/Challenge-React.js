import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { LogoSvg } from "../../assets/icons";
import { useAuth } from "../../providers/auth/auth.hook";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "../../common/constants/paths.constants";

export const Header: FC = () => {
  const navigate = useNavigate();
  const [{ authenticated }, { logout }] = useAuth();

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: "white",
        width: "100vw",
        padding: "20px 160px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow:
          "0px 3px 6px rgba(0, 0, 0, 0.06), 0px 3px 9px rgba(0, 0, 0, 0.1)",
      }}
    >
      <LogoSvg />
      <Box
        sx={{
          display: "flex",
          gap: "50px",
        }}
      >
        <Link to={paths.UNIVERSITY.SEARCH}>Search</Link>
        {authenticated && (
          <>
            <Link to={paths.USER.PROFILE}>Profile</Link>
            <Typography
              variant="inherit"
              sx={{ cursor: "pointer" }}
              onClick={logout}
            >
              Logout
            </Typography>
          </>
        )}
        {!authenticated && (
          <Typography
            variant="inherit"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(paths.LOGIN)}
          >
            Login
          </Typography>
        )}
      </Box>
    </Box>
  );
};
