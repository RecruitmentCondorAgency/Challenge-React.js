import React from "react";
import { Link } from "react-router-dom";
const logo = new URL("../../logo.png", import.meta.url);
const NavBar = () => {
  const handleLogout = () => {
    localStorage.removeItem("auth");
    window.location.href = "/login";
  };
  return (
    <div className="navBar">
      <img src={logo} alt="logo" />
      <div className="options">
        {localStorage.getItem("auth") === "true" && (
          <>
            <Link to="/" className="navBarItem">
              Search
            </Link>
            <Link to="/profile" className="navBarItem">
              Profile
            </Link>
            <button onClick={handleLogout} className="navBarItem">
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
