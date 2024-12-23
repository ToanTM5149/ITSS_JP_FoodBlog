import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(); // Tạo AuthContext

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoggedIn = () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    setIsLoggedIn(!!loggedInUser);
  };

  useEffect(() => {
    // Kiểm tra trạng thái lần đầu
    checkLoggedIn();

    // Lắng nghe sự kiện thay đổi localStorage
    window.addEventListener('storage', checkLoggedIn);

    // Dọn dẹp sự kiện khi component unmount
    return () => {
      window.removeEventListener('storage', checkLoggedIn);
    };
  }, []);

  const handleLogin = (user) => {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    setIsLoggedIn(true); // Cập nhật trạng thái
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false); // Cập nhật trạng thái
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
