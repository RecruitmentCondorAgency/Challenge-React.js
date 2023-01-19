import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './src/pages/ErrorPage';
import LoginPage from './src/pages/login/LoginPage';
import PublicLayout from './src/layouts/Public';
import UniversitiesPage from './src/pages/universities/UniversitiesPage';
import PrivateLayout from './src/layouts/Private';
import SignUp from './src/pages/signup/SignUp';
import { App } from './src/app';
import React from 'react';
import { AuthProvider } from './src/lib/contexts/AuthContext';
import ProfilePage from './src/pages/profile/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: '/login',
    element: (
      <AuthProvider>
        <PublicLayout />
      </AuthProvider>
    ),
    children: [
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: 'signup',
        element: <SignUp />
      }
    ]
  },
  {
    path: '/search',
    element: (
      <AuthProvider>
        <PrivateLayout />
      </AuthProvider>
    ),
    children: [
      {
        path: '/search',
        element: <UniversitiesPage />
      }
    ]
  },
  {
    path: '/profile',
    element: (
      <AuthProvider>
        <PrivateLayout />
      </AuthProvider>
    ),
    children: [
      {
        path: '/profile',
        element: <ProfilePage />
      }
    ]
  }
]);

const app = document.getElementById('app');
ReactDOM.render(
  // <React.StrictMode>
  <RouterProvider router={router} />,
  // </React.StrictMode>,
  app
);
