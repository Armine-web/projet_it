'use client'

import type { FormProps} from 'antd';
import { Button, Checkbox, Form, Input, Spin } from 'antd';
import { useState, useEffect } from 'react';

import '@ant-design/v5-patch-for-react-19';

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


const LoginForm: React.FC = () => {

  const [mounted, setMounted] = useState(false);

  useEffect(()=>{
  setMounted(true);
}, [])

if (!mounted) return <div className=' flex justify-center items-center h-[100vh]'><Spin size="large" /></div>

  return(
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
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

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
};

export default LoginForm;
