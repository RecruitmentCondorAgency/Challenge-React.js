import * as React from "react";
import { Outlet, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import { AuthContext } from "./app";

export function MainLayout() {
  const auth = React.useContext(AuthContext);
  return (
    <div>
      <NavBar />
      <div
        onClick={() => {
          auth.toggle(()=>{}, Boolean(auth.user))
        }}
        style={{ marginTop: "85px" }}
      >toggle user</div>
      <Outlet />
    </div>
  );
}
