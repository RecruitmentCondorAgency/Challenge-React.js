import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './src/app';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './src/pages/ErrorPage';
import LoginPage from './src/pages/login/LoginPage';
import PublicLayout from './src/layouts/Public';
import UniversitiesPage from './src/pages/universities/UniversitiesPage';
import PrivateLayout from './src/layouts/Private';
import Details from './src/pages/universities/Details';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: '/login',
    element: <PublicLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/login',
        element: <LoginPage />
      }
    ]
  },
  {
    path: '/universities',
    element: <PrivateLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/universities',
        element: <UniversitiesPage />
      },
      {
        path: 'details/:universityId',
        element: <Details />
      }
    ]
  }
]);

const app = document.getElementById('app');
ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  app
);
