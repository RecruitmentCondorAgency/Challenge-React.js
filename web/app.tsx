import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./views/Login";
import Profile from "./views/Profile";
import Register from "./views/Register";
import Search from "./views/Search";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Search />,
  },
  {
    path: 'register',
    element: <Register />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'profile',
    element: <Profile />,
  },
]);

const App: React.FC = () => RouterProvider({router});

export default App;
