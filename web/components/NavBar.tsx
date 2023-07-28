import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as classes from "./NavBar.styles";
import { Link } from "react-router-dom";
import { AuthContext } from "../app";
// import {Logo} from "./logo.png";

const pages = [
  {
    label: "Search",
    url: "/search",
  },
  {
    label: "Profile",
    url: "/profile",
  },
];

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function useAuth() {
  return;
}

function NavBar() {
  const auth = React.useContext(AuthContext);
  const { user } = auth;
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Container style={classes.NavBarContainer}>
      <AppBar position="absolute" style={classes.NavBarStyle}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 0 }}>
              <IconButton sx={{ p: 0 }}>
                <img
                  src={require("./logo.png")}
                  alt="logo"
                  style={classes.Logo}
                />
              </IconButton>
            </Box>
            {user !== null && (
              <Box
                sx={{
                  flexGrow: 0,
                  marginLeft: "10px",
                  display: { xs: "none", md: "flex" },
                }}
              >
                <Typography textAlign="center" style={classes.NavBarText}>
                  Bienvenido, {user.email}
                </Typography>
              </Box>
            )}
            {/* Menú mobile */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link to="/search">
                    <Typography textAlign="center" style={classes.NavBarLink}>
                      Search
                    </Typography>
                  </Link>
                </MenuItem>
                {user !== null && (
                  <>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Link to="/profile">
                        <Typography
                          textAlign="center"
                          style={classes.NavBarLink}
                        >
                          Profile
                        </Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Link to="/" onClick={() => console.log('1111')}>
                        <Typography
                          textAlign="center"
                          style={classes.NavBarLink}
                        >
                          Logout
                        </Typography>
                      </Link>
                    </MenuItem>
                  </>
                )}
              </Menu>
            </Box>
            {/* Menú web */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-end",
              }}
            >
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: "block" }}
              >
                <Link to="/search" style={classes.NavBarLink}>
                  Search
                </Link>
              </Button>
              {user !== null && (
                <>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, display: "block" }}
                  >
                    <Link to="/profile" style={classes.NavBarLink}>
                      Profile
                    </Link>
                  </Button>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, display: "block" }}
                  >
                    <Link onClick={() => auth.signout()} to="/" style={classes.NavBarLink}>
                      Logout
                    </Link>
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Container>
  );
}

export default NavBar;
