import "antd/dist/antd.min.css";

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const LoginPage = ({ setIsLoggedIn, setUsername, setEmail }) => {
    const navigate = useNavigate();
    const [form] = Form.useForm();


    const isEmail = (str) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(str);
    };

    const handleSubmit = async (values) => {
        console.log('Handle submit: ', values);

        try {
            const inp_username = isEmail(values.username) ? null : values.username;
            const inp_password = values.password;
            const inp_email = isEmail(values.username) ? values.username : null;

            const response = await axios.post('https://127.0.0.1:443/user/login', {
                userName: inp_username,
                email: inp_email,
                password: inp_password,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Login response: ', response.data);

            if (response.data.success === 'true') {
                const user = response.data.data;

                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', user.userName);
                localStorage.setItem('email', user.email);
                localStorage.setItem('user_id', user.userId);

                localStorage.setItem('token', user.token);

                if (values.remember) {
                    localStorage.setItem('rememberMe', 'true');
                } else {
                    localStorage.removeItem('rememberMe');
                }

                setUsername(user.userName);
                setEmail(user.email);
                setIsLoggedIn(true);

                message.info('Hello, Ant Design!');

                return true;

            } else {
                return false;
            }
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);

        const loginSuccess = await handleSubmit(values);

        if (loginSuccess) {
            navigate('/comments');
        } else {
        }
    };

    React.useEffect(() => {
        const username = localStorage.getItem('username');
        const registeredUsername = localStorage.getItem('registeredUsername');

        form.setFieldsValue({ username: username ? username : registeredUsername });

    }, [navigate, form]);

    return (
        <Form
            form={form}
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            style={{
                maxWidth: 360,
                margin: 'auto'
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                Or <Link to='/register'>register now!</Link>
            </Form.Item>
        </Form>
    );
};

export default LoginPage;
