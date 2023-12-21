import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import logo from '../../assets/logo.png';

// Props for the navigation button component
interface NavButtonProps {
  label: string;
  onClick: () => void;
}

// Navigation button component
const NavButton: React.FC<NavButtonProps> = ({ label, onClick }) => (
  <button className="text-gray-700 mr-4 focus:outline-none" onClick={onClick}>
    {label}
  </button>
);

// Header component
const Header: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  // Handle click on the profile button
  const handleProfileClick = useCallback(() => {
    navigate('/detail');
  }, [navigate]);

  // Handle click on the logout button
  const handleLogoutClick = useCallback(() => {
    auth.logout();
  }, [auth]);

  // Handle click on the search button
  const handleSearchClick = useCallback(() => {
    navigate('/');
  }, [navigate]);

  // Render null if no user is authenticated
  if (!auth.user) {
    return null;
  }

  return (
    <header className="bg-white p-4 flex justify-between items-center border-b border-gray-300 shadow-md">
      <div className="flex items-center">
        {/* Logo */}
        <img
          className="h-8 w-8 rounded-full mr-2 cursor-pointer"
          src={logo}
          alt="Logo"
        />
      </div>
      <div className="flex items-center">
        {/* Search button */}
        <NavButton label="Search" onClick={handleSearchClick} />
        {/* Profile button */}
        <NavButton label="Profile" onClick={handleProfileClick} />
        {/* Logout button */}
        <NavButton label="Logout" onClick={handleLogoutClick} />
      </div>
    </header>
  );
};

export default Header;
