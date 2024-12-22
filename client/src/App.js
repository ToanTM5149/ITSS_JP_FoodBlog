import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import AuthProvider from './context/auth_context.js';
import HeaderBar from './components/header/header.jsx';
function App() {
  return (
    <AuthProvider>
    <Router>
    <HeaderBar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/blog-details/:id" element={<WatchBlog/>} />
          <Route path='/createblog' element={<BlogEC/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Route Forgot Password */}
          <Route path="/forgot-password2" element={<ForgotPassword2 />} />
          <Route path="/new-password" element={<NewPassword />} />
          <Route path='/all-blogs' element={<AllBlog />} />
        </Routes>
      </div>
    </Router>
     </AuthProvider>
  );
}

export default App;

