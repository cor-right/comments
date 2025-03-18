// src/mock/user.js
import Mock from 'mockjs';

Mock.mock('/api/login', 'post', (req) => {
  const { userName, email, password } = JSON.parse(req.body);
  if ((userName === 'admin' || email === 'admin@163.com') && password === 'password') {
    return {
      success: 'true',
      data: {
        token: 'mock-token',
        id: 1,
        userId: 'admin_id',
        userName: 'admin',
        email: 'admin@163.com',
      },
    };
  } else {
    return {
        success: 'false',
        errorCode: 'error',
        errorMsg: '用户名或密码错误',
    };
  }
});