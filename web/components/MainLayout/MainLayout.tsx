import * as React from "react";
import { Outlet, Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { AuthContext } from "../../providers/auth.provider";
import { LoginPage } from "../../pages/LoginPage/LoginPage";

export function MainLayout() {
  const auth = React.useContext(AuthContext);
  if (auth.usersAvailable.length === 0) {
    auth.getAllUsers();
  }
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <NavBar />
      <Outlet />
    </div>
  );
}
