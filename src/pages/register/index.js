import "antd/dist/antd.min.css";
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


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

    const handleSubmit = async (values) => {
        const username = values.nickname;
        const password = values.password;
        const email = values.email;

        const response = await axios.post('https://127.0.0.1:443/user/register', {
            userName: username,
            password: password,
            email: email
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('Response: ', response)

        if (response.data.success === true) {
            alert('注册成功！');

            return true;
        } else {
            alert(response.data.errorMsg);
            return false;
        }

    }

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);

        const loginSuccess = await handleSubmit(values);

        if (loginSuccess) {
            sessionStorage.setItem('registeredUsername', values.nickname);

            navigate('/login');
        } else {

        }
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
                label="用户名"
                rules={[
                    {
                        required: true,
                        message: '请输入用户名！',
                    },
                    {
                        pattern: /^[A-Za-z0-9]+$/,
                        message: '用户名中只能包含字母或数字！',
                    },
                    {
                        min: 5,
                        message: '用户名长度至少为5个字符！',
                    },
                    {
                        max: 20,
                        message: '用户名长度不可超过20个字符！',
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
                        message: '邮箱格式不正确！',
                    },
                    {
                        required: true,
                        message: '请输入邮箱！',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="密码"
                rules={[
                    {
                        required: true,
                        message: '请输入密码！',
                    },
                    {
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
                        message: '密码必须在8~20个字符之间，且至少包含一个大写字母、一个小写字母、一个数字和一个特殊符号（[@$!%*?&）！',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="确认密码"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: '请再次输入密码！',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('确认密码与原始密码不一致！'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    注册
                </Button>
                <br/>
                <Link to='/login'>已有帐号？立即登录！</Link>
            </Form.Item>
        </Form>
    );
};

export default RegisterPage;



