import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const checkLoggedIn = () => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    setIsLoggedIn(!!user);
    setLoggedInUser(user);
  };

  useEffect(() => {
    checkLoggedIn();

    window.addEventListener('storage', checkLoggedIn);
    return () => {
      window.removeEventListener('storage', checkLoggedIn);
    };
  }, []);

  const handleLogin = (user) => {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    setIsLoggedIn(true);
    setLoggedInUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
    setLoggedInUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, loggedInUser, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
