import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/logo.png";

interface NavButtonProps {
  label: string;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ label, onClick }) => (
  <button className="text-gray-700 mr-4 focus:outline-none" onClick={onClick}>
    {label}
  </button>
);

const Header: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleProfileClick = useCallback(() => {
    navigate("/university-detail");
  }, []);

  const handleLogoutClick = useCallback(() => {
    auth.logout();
  }, [auth]);

  const navigateToHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  if (!auth.user) {
    return null;
  }

  return (
    <header className="bg-white p-4 flex justify-between items-center border-b border-gray-300 shadow-md">
      <div className="flex items-center">
        <img
          className="h-8 w-8 rounded-full mr-2 cursor-pointer"
          src={logo}
          alt="Logo"
          onClick={navigateToHome}
        />
      </div>
      <div className="flex items-center">
        <NavButton label="Search" onClick={navigateToHome} />
        <NavButton label="Profile" onClick={handleProfileClick} />
        <NavButton label="Logout" onClick={handleLogoutClick} />
      </div>
    </header>
  );
};

export default Header;
