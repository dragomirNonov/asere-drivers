import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleMenu = () => {
    setOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="bg-gray-800">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Name */}
          <div className="flex items-center">
            <img src={logo} className="h-12 w-auto" alt="Logo" />
            <a href="/" className="text-yellow-500 ml-2 text-2xl">
              Asere CDL
            </a>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Add any additional nav links here */}
            <button
              onClick={handleLogout}
              className="flex items-center text-yellow-500 hover:bg-gray-700 px-4 py-2 rounded-md text-md font-medium transition-colors duration-300 border border-yellow-500">
              <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>

          {/* Hamburger button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={handleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-yellow-400 hover:bg-gray-700">
              <span className="sr-only">Open Main Menu</span>
              {open ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Add any additional mobile nav links here */}
            <button
              onClick={handleLogout}
              className="flex items-center w-full text-yellow-500 hover:bg-gray-700 px-3 py-2 rounded-md text-md font-medium transition-colors duration-300">
              <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
