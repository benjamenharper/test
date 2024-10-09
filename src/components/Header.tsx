import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUsername('JohnDoe');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-200">
      <Link to="/" className="flex items-center">
        <svg className="w-8 h-8 mr-2 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 10.182V22h18V10.182L12 2z"/>
        </svg>
        <h1 className="text-2xl font-bold text-gray-700">RealtySynth</h1>
      </Link>
      <div className="flex items-center">
        {isLoggedIn ? (
          <>
            <span className="mr-2 text-gray-700">{username}</span>
            <img
              src="https://via.placeholder.com/32"
              alt="Profile"
              className="w-8 h-8 rounded-full mr-2"
            />
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;