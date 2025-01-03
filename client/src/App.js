import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import RegisterForm from './views/register-form/register';
import LoginForm from './views/login-form/login';
import Homepage from './views/homepage/homepage';
import WatchBlog from './views/blog-details/blog.jsx';
import BlogEC from './views/createblog/Blog.jsx';
import Profile from './views/profile/profile.jsx';
import AllBlog from './views/all-blogs/all_blogs.jsx';
import AuthProvider from './context/auth_context.js'; // Quản lý trạng thái đăng nhập
import DataProvider from './context/data_context.js'; // Quản lý dữ liệu JSON
import HeaderBar from './components/header/header.jsx';
import Footer from './components/footer/footer.jsx';
import OtherProfile from './views/profile/profile2.jsx';
import ManagerBlog from './views/admin/contentmanage.jsx'
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
              <Route path="/profile/:id" element={<OtherProfile />} />

              {/* Admin */}
              <Route path='/admin/content-manage' element={<ManagerBlog />} />
            </Routes>
          </Layout>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

function Layout({ children }) {
  const location = useLocation();
  const noHeaderPaths = ["/login", "/register"];
  const shouldShowHeader = !noHeaderPaths.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <HeaderBar />}
      {children}
      {<Footer/>}
    </>
  );
}


export default App;
