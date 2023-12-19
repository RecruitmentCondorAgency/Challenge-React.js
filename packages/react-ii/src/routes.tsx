import { Navigate, useLocation, useRoutes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';

export default function Router() {
    const routes = useRoutes([
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/',
        element: <LoginPage />
      },
      {
        path: '/register',
        element: <RegisterPage />
      },
      {
        path: '/profile',
        element: <ProfilePage />
      },
      {
        path: '/search',
        element: <SearchPage />
      },
      
    ]);
  
    return routes;
  }