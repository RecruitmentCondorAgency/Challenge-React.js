import {
    createBrowserRouter,
  } from "react-router-dom";

import Login from "../pages/Login";
import Profile from "../pages/profile";
import Register from "../pages/Register";
import Search from "../pages/Search";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
        path: "profile",
        element: <Profile />
    },
    {
        path: "search",
        element: <Search />
    },
    {
      path: "register",
      element: <Register />
    }

]);

export default router