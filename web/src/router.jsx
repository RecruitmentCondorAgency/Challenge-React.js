import { createBrowserRouter, Outlet } from 'react-router-dom';

import AuthLayout from './pages/layouts/AuthLayout';
import RootLayout from './pages/layouts/RootLayout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import University from './pages/University';
import Profile from './pages/Profile';

const ContextWrapper = () => {
  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <ContextWrapper />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: '/login', element: <Login /> },
          { path: '/signup', element: <Signup /> },
        ],
      },
      {
        element: <RootLayout />,
        children: [
          { index: true, element: <Home /> },
          {
            path: '/university/:slug',
            element: <University />,
          },
          {
            path: '/profile',
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);

export default router;
