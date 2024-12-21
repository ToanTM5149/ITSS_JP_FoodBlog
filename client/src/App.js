import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './views/register-form/register';
import LoginForm from './views/login-form/login';
import Homepage from './views/homepage/homepage';
import WatchBlog from './views/blog-details/blog.js';
import BlogEC from './views/createblog/Blog.jsx';
import Profile from './views/profile/profile.jsx';
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
          <Route path='/all-blogs' element={<AllBlog />} />
          <Route path="/blog-details/:id" element={<WatchBlog/>} />
          <Route path='/createblog' element={<BlogEC/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;

