import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Sử dụng Routes thay vì Switch
import RegisterForm from './views/register-form/register';
import LoginForm from './views/login-form/login';
import Homepage from './views/homepage/homepage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
// import DetailsBlog from "./DetailsBlog" (đường dẫn đến file đó)
import Blog from "./ui/Blog";
import BlogEditor from './ui/BlogEditor';
import Watch from './ui/WatchBlog';
function App() {
  return (
    <div className="App">
    
      {/* <DetailsBlog /> */} 
      {/* hoặc như này khi có 1 component được export với tên như vậy, và mình muốn hiển thị ở đây*/}
      {/* <Blog/> */}
      <Watch/>
      {/* <Edit/> */}
      {/* <BlogEditor/> */}
    </div>
  );
}

export default App;
