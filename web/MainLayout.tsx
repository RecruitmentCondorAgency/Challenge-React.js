import * as React from "react";
import { Outlet, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import { AuthContext } from "./app";
import { LoginPage } from "./pages/LoginPage/LoginPage";

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
      <div style={{ height: "100%", width: "100%" }}>
        <LoginPage />
      </div>
      <Outlet />
    </div>
  );
}
