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
        <h1 className="text-2xl font-bold text-gray-700">RealtySynth</h1>
      </Link>
    </header>
  );
};

export default Header;