'use client'
import React, { useState, useEffect } from 'react';
import type { FormItemProps, FormProps} from 'antd';
import {
  Button,
  Form,
  Input,
  Spin 
} from 'antd';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const formItemLayout: FormProps = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout: FormItemProps = {
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

const RegisterForm: React.FC = () => {
  const [form] = Form.useForm();


  const [mounted, setMounted] = useState(false);

  useEffect(()=> {
    setMounted(true);
  }, []);

  if (!mounted) return <div className=' flex justify-center items-center h-[100vh]'><Spin size="large" /></div>

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
      style={{width: '100%', maxWidth: '600px', margin: '0 auto'}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      scrollToFirstError
    >

    <Form.Item
        name="Full Name"
        label="Full Name"
        rules={[{ required: true, message: 'Please input your Full Name! ', whitespace: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail! ',
          },
          {
            required: true,
            message: 'Please input your E-mail! ',
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
        label="Confirm Password "
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
      </Form.Item>
    </Form>
  );
};


export default RegisterForm;
