import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, Flex, message } from 'antd';

const LoginPage = () => {
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log('Form values:', values); // 添加调试信息

        // 模拟登录验证
        if (values.username === 'admin' && values.password === 'password') {
            // 登录成功，保存登录态到 localStorage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', values.username);

            // 重定向到首页或其他页面
            navigate('/comments');
        } else {
            message.error('Login failed'); // 使用 antd 的 message 组件显示错误信息
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo); // 添加失败时的调试信息
    };

    return (
        <Form
            name="login"
            initialValues={{
                remember: true,
            }}
            style={{
                maxWidth: 360,
                margin: 'auto',
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed} // 添加 onFinishFailed 处理程序
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username or E-mail!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined />} placeholder="Username or E-mail" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item>
                <Flex justify="space-between" align="center">
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                </Flex>
            </Form.Item>

            <Form.Item>
                <Button block type="primary" htmlType="submit">
                    Log in
                </Button>
                or <Link to='/register'>Register now!</Link>
            </Form.Item>
        </Form>
    );
};

export default LoginPage;



