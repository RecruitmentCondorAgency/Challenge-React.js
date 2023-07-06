import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import AppContext from '../context/AppContext';
import { useContext } from 'react';

const Navbar = () => {

    const { user, updateUser } = useContext(AppContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        updateUser(null);
        navigate("/login", {
            replace: true,
        })
    }

    return (
        <nav className="fixed bg-white w-screen h-[100px] shadow-lg shadow-gray-300">
            <div className="p-5 px-10 flex items-center justify-between">
                <div className="flex items-center">
                    <img src={logo} className="mx-auto h-14 px-5" alt="Logo" />
                </div>

                <ul className="flex space-x-4">
                    <li>
                        <Link to="/search" className="hover:text-gray-300">
                            Search
                        </Link>
                    </li>

                    {user && (
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                    )}

                    {user ? (
                        <li>
                            <button
                                className="hover:text-gray-300 bg-transparent"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </li>
                    ) : (

                        <li>
                            <Link to="/login" className="hover:text-gray-300">
                                Login
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
