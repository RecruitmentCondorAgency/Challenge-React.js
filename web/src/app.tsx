import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import './styles.css';
// @ts-ignore
import logo from './logo.png';
import { Auth } from './components/Auth';
import Search from './components/Search';
import { Profile } from './components/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'login',
        element: <Auth />,
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}

function Root() {
  return (
    <>
      <header className='flex px-10 py-8 drop-shadow-lg items-center bg-white mb-5'>
        <img src={logo} className='w-8' />
        <a href='#' className='ml-auto'>
          Search
        </a>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
