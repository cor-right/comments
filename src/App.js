import React,  { useEffect, useState }  from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import CommentsPage from './pages/comments';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 检查 localStorage 中的登录状态
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
           isLoggedIn ?  <Navigate to="/comments" /> : <Navigate to="/login" />
        } />
        <Route path="/login" element={
           <LoginPage />
        } />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/comments" element={<CommentsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
