// @ts-ignore
import { useEffect } from 'react';
import logo from '../logo.png';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { saveUser } from '../store/userSlice';

export function Root() {
  const navigate = useNavigate();
  const prevUser = localStorage.getItem('condor-user');

  const handleLogOut = () => {
    localStorage.removeItem('condor-user');
    //TODO: remove user from context
    navigate('/login');
  };

  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id === 0) {
      const prevUser = localStorage.getItem('condor-user');
      if (prevUser) {
        const userSaved = JSON.parse(prevUser);
        dispatch(saveUser(userSaved));
      }
    }
    return () => {};
  }, []);

  return (
    <>
      <header className='flex px-10 py-8 drop-shadow-lg items-center bg-white mb-5'>
        <Link to='/'>
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
                to='/'
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
