import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const LoginPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);

        if (values.username === 'admin' && values.password === 'password') {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', values.username);

            if (values.remember) {
                localStorage.setItem('rememberMe', 'true');
            } else {
                localStorage.removeItem('rememberMe');
            }

            navigate('/comments');
        } else {
            alert('Login failed');
        }
    };

    React.useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const rememberMe = localStorage.getItem('rememberMe') === 'true';
        const registeredUsername = localStorage.getItem('registeredUsername');
    
        if (isLoggedIn && rememberMe) {
            navigate('/comments');
        } else if (registeredUsername) {
            form.setFieldsValue({ username: registeredUsername });
        }
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
