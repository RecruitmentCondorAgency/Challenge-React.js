import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './src/app';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './src/pages/ErrorPage';
import LoginPage from './src/pages/login/LoginPage';
import PublicLayout from './src/layouts/Public';

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
  }
]);

const app = document.getElementById('app');
ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  app
);
