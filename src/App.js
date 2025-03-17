import React,  { useEffect, useState }  from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate    } from 'react-router-dom';
import { PageHeader } from 'antd';
import { UserOutlined } from '@ant-design/icons'; // 导入默认图标

import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import CommentsPage from './pages/comments';


const AppContent = ({ isLoggedIn, username, email }) => {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => navigate(-1)} // 使用 navigate(-1) 返回到上一个页面
        title={isLoggedIn ? username : <Link to="/login">Login</Link>}
        subTitle={isLoggedIn ? email : ''}
        avatar={{ icon: <UserOutlined />, size: 'large' }} // 添加默认图标
      />
    </>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (loggedIn) {
      setUsername(localStorage.getItem('username'));
      setEmail(localStorage.getItem('email'));
    }
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <>
      <Router>
        <AppContent isLoggedIn={isLoggedIn} username={username} email={email} />
        <Routes>
          <Route path="/" element={
            // isLoggedIn ?  <Navigate to="/comments" /> : <Navigate to="/login" />
            <Navigate to="/comments" />
          } />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} setEmail={setEmail} />} />
        <Route path="/register" element={<RegisterPage />} />
          <Route path="/comments" element={<CommentsPage />} />
        </Routes>
      </Router>
    </>
    
  );
};

export default App;
