import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './src/pages/ErrorPage';
import LoginPage from './src/pages/login/LoginPage';
import PublicLayout from './src/layouts/Public';
import UniversitiesPage from './src/pages/universities/UniversitiesPage';
import PrivateLayout from './src/layouts/Private';
import SignUp from './src/pages/signup/SignUp';
import React from 'react';
import { AuthProvider } from './src/lib/contexts/AuthContext';
import ProfilePage from './src/pages/profile/Profile';
import './styles.css';
import CountryDetailsPage from './src/pages/country/CountryDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <PrivateLayout />
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <UniversitiesPage />
      }
    ]
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
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/search',
        element: <UniversitiesPage />
      },
      {
        path: 'country/:countryName',
        element: <CountryDetailsPage />
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
