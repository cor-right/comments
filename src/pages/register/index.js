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

        // 将用户名和密码保存到 localStorage
        localStorage.setItem('registeredUsername', values.nickname);

        alert('Registration successful');

        // 重定向到 /comments 页面
        navigate('/login')
    };

    return (
        // <div style={{
        //     maxWidth: '100',
        //     display: 'flex', 
        //     justifyContent: 'center', 
        //     alignItems: 'center', 
        //     height: '100vh', 
        // }}>
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
                            message: 'Please input your nickname!',
                            whitespace: true,
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
        // </div>
    );
};

export default RegisterPage;



