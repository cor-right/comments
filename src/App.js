import React,  { useEffect, useState }  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import CommentsPage from './pages/comments';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          isLoggedIn ? <CommentsPage /> : <LoginPage />
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/comments" element={<CommentsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
