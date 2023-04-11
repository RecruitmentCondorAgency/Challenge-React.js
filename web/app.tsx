import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Profile from "./views/Profile";
import Search from "./views/Search";
import SignIn from "./views/SignIn";
import University from "./views/University";

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
  {
    path: 'university/:id',
    element: <University />,
  },
]);

const App: React.FC = () => RouterProvider({router});

export default App;
