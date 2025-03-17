import "antd/dist/antd.min.css";
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  Button,
  Form,
  Input,
} from 'antd';

const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

const RegisterPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);

        localStorage.setItem('registeredUsername', values.nickname);

        alert('Registration successful');

        // 重定向到 /comments 页面
        navigate('/login')
    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
                prefix: '86',
            }}
            style={{
                maxWidth: 600,
                margin: 'auto',
                align: 'center',
                flexDirection : 'column',
                alignItems: 'center',
                verticalAlign: 'middle',
            }}
            scrollToFirstError
        >
            <Form.Item
                name="nickname"
                label="UserName"
                tooltip="What do you want others to call you?"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                    {
                        pattern: /^[A-Za-z0-9]+$/,
                        message: 'Username can only contain letters and numbers!',
                    },
                    {
                        min: 5,
                        message: 'Username must be at least 5 characters!',
                    },
                    {
                        max: 20,
                        message: 'Username cannot exceed 20 characters!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    {
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
                        message: 'Password must be between 8 and 20 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The new password that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
                <br/>
                or <Link to='/login'>Login now!</Link>
            </Form.Item>
        </Form>
    );
};

export default RegisterPage;



