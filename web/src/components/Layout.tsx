// @ts-ignore
import logo from '../logo.png';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';

export function Root() {
  const navigate = useNavigate();
  const prevUser = localStorage.getItem('condor-user');

  const handleLogOut = () => {
    localStorage.removeItem('condor-user');
    //TODO: remove user from context
    navigate('/login');
  };

  return (
    <>
    
      <header className='flex px-10 py-8 drop-shadow-lg items-center bg-white mb-5'>
        <Link to='/search'>
          <img src={logo} className='w-8' />
        </Link>
        <div className='ml-auto flex items-center gap-4'>
          {!prevUser && (
            <NavLink
              to='/register'
              className={({ isActive }) =>
                isActive
                  ? 'text-gray-400 underline'
                  : 'text-gray-400 no-underline'
              }
            >
              Register
            </NavLink>
          )}
          {prevUser && (
            <>
              <NavLink
                to='/search'
                className={({ isActive }) =>
                  isActive
                    ? 'text-gray-400 underline'
                    : 'text-gray-400 no-underline'
                }
              >
                Search
              </NavLink>
              <NavLink
                to='/profile'
                className={({ isActive }) =>
                  isActive
                    ? 'text-gray-400 underline'
                    : 'text-gray-400 no-underline'
                }
              >
                Profile
              </NavLink>
              <button
                onClick={handleLogOut}
                className='border border-sky-500 text-sky-500 hover:text-white hover:bg-sky-500 transition-colors rounded-md px-4'
              >
                Logout
              </button>
            </>
          )}
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
