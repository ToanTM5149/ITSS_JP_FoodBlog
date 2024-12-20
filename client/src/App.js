import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './views/register-form/register';
import LoginForm from './views/login-form/login';
import Homepage from './views/homepage/homepage';
import WatchBlog from './views/watchblog/WatchBlog.js';
import BlogEC from './views/createblog/Blog.jsx';
import Profile from './views/profile/profile.jsx';
import UserManage from './views/admin/usermanage.jsx';
import BlogManage from './views/admin/contentmanage.jsx';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/watchblog" element={<WatchBlog/>} />
          <Route path='/createblog' element={<BlogEC/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/admin/usermanage" element={<UserManage/>} />
          <Route path="/admin/blogmanage" element={<BlogManage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

