import React from 'react';

import { Button, Form, Input, Switch } from 'antd';

import PublicLayout from '../../layout/public/Public';
import { Link } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
import { navigateHome } from '../../utils/naviagate-home';

const { Item } = Form;

const SignUp = () => {
  const [form] = useForm();

  const signUp = () => {
    form
      .validateFields()
      .then(() => navigateHome())
      .catch(() => null);
  };

  return (
    <PublicLayout bgImg={`${window.origin}/content/register-page.jpg`}>
      <h4 className='mt-0 mb-1'>Sign up</h4>
      <p className='text-color-200'>Create your Account</p>

      <Form form={form} layout='vertical' className='mb-5'>
        <Item name='name' rules={[{ required: true, message: <></> }]}>
          <Input placeholder='Name' />
        </Item>

        <Item
          name='email'
          rules={[
            { required: true, message: <></> },
            { type: 'email', message: <></> }
          ]}
        >
          <Input placeholder='Email address' type='mail' />
        </Item>

        <Item name='password' rules={[{ required: true, message: <></> }]}>
          <Input placeholder='Password' type='password' />
        </Item>

        <div className='d-flex align-items-center mb-4'>
          <Switch defaultChecked /> <span className='ml-2'>I agree to the Terms and Privacy.</span>
        </div>

        <Button
          type='primary'
          onClick={signUp}
          icon={<span className='icofont icofont-plus mr-2' style={{ fontSize: '1.2rem' }} />}
        >
          Register
        </Button>
      </Form>

      <p>
        Have an account? <Link to='sign-in'>Sign in!</Link>
      </p>
    </PublicLayout>
  );
};

export default SignUp;
