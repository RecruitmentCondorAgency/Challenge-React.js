import {
  createBrowserRouter,
  Link,
  Outlet,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import './styles.css';

import { Login } from './components/Login';
import Search from './components/Search';
import { Profile } from './components/Profile';
import { Register } from './components/Register';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Root } from './components/Layout';
import { Provider } from 'react-redux';
import { store } from './store/store';

const redirectIfUser = () => {
  const prevUser = localStorage.getItem('condor-user');
  if (prevUser) return redirect('/');
  return null;
};
const redirectIfNoUser = () => {
  const prevUser = localStorage.getItem('condor-user');
  if (!prevUser) return redirect('/login');
  return null;
};
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'login',
        loader: redirectIfUser,
        element: <Login />,
      },
      {
        path: 'register',
        loader: redirectIfUser,
        element: <Register />,
      },
      {
        index: true,
        loader: redirectIfNoUser,
        element: <Search />,
      },
      {
        path: 'profile',
        loader: redirectIfNoUser,
        element: <Profile />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

export function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  );
}
