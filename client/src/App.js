import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Sử dụng Routes thay vì Switch
import RegisterForm from './views/register-form/register';
import LoginForm from './views/login-form/login';
import Homepage from './views/homepage/homepage';
import Profile from './views/profile/profile.jsx';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
