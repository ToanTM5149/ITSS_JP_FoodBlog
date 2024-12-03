import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Sử dụng Routes thay vì Switch
import RegisterForm from './views/register-form/register';
import LoginForm from './views/login-form/login';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
