import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import RegisterForm from './views/register-form/register';
import LoginForm from './views/login-form/login';
import Homepage from './views/homepage/homepage';
import WatchBlog from './views/blog-details/blog.js';
import BlogEC from './views/createblog/Blog.jsx';
import Profile from './views/profile/profile.jsx';
import ForgotPassword from './views/forgot-password/forgot-password.jsx'; // Import ForgotPassword
import ForgotPassword2 from './views/forgot-password/password-code/password-code.jsx';
import NewPassword from './views/forgot-password/new-password/new-password.jsx'; // Import NewPassword
import AllBlog from './views/all-blogs/all_blogs.js';
import AuthProvider from './context/auth_context.js'; // Quản lý trạng thái đăng nhập
import DataProvider from './context/data_context.js'; // Quản lý dữ liệu JSON
import HeaderBar from './components/header/header.jsx';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Layout>
            <Routes>
        <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/all-blogs" element={<AllBlog />} />
          <Route path="/blog-details/:id" element={<WatchBlog />} />
          <Route path="/createblog" element={<BlogEC />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Route Forgot Password */}
          <Route path="/forgot-password2" element={<ForgotPassword2 />} />
          <Route path="/new-password" element={<NewPassword />} />
          </Routes>
          </Layout>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

function Layout({ children }) {
  const location = useLocation();
  const noHeaderPaths = ["/login", "/register", "/forgot-password", "/forgot-password2", "/new-password"]; // Các trang không cần header
  const shouldShowHeader = !noHeaderPaths.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <HeaderBar />}
      {children}
    </>
  );
}


export default App;

