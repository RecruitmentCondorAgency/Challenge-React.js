import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Profile from "./views/Profile";
import Search from "./views/Search";
import SignIn from "./views/SignIn";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Search />,
  },
  {
    path: 'register',
    element: <SignIn type="register" />,
  },
  {
    path: 'login',
    element: <SignIn type="login" />,
  },
  {
    path: 'profile',
    element: <Profile />,
  },
]);

const App: React.FC = () => RouterProvider({router});

export default App;
