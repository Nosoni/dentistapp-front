import React from 'react';
import { Button, Form, Input } from 'antd';
import { LoginOutlined } from '@ant-design/icons/lib';
import PublicLayout from '../../layout/public/Public';
import { useForm } from 'antd/es/form/Form';
import { useDispatch } from 'react-redux';
import { setUsuarioData } from '../../redux/usuario-data/actions';
import { autenticar } from '../../services/autenticar';
import { useHistory } from 'react-router-dom'

const { Item } = Form;

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = useForm();

  const handleOnClickLogin = async () => {
    const datosForm = await form.validateFields();
    const usuario = await autenticar(datosForm);
    dispatch(setUsuarioData(usuario))
    history.push("/inicio/dashboard")
  };

  return (
    <PublicLayout bgImg={`${window.origin}/content/login-page.jpg`}>
      <h4 className='mt-0 mb-1'>Autenticación</h4>

      <p className='text-color-200'>Ingresar al sistema con sus credenciales</p>

      <Form form={form} layout='vertical' className='mb-4'>
        <Item name='usuario' rules={[{ required: true, message: <></> }]}>
          <Input placeholder='Usuario' />
        </Item>
        <Item name='password' rules={[{ required: true, message: <></> }]}>
          <Input placeholder='Contraseña' type='password' />
        </Item>

        <Button
          className="mt-3"
          block={false}
          type='primary'
          onClick={handleOnClickLogin}
          htmlType='submit'
          icon={<LoginOutlined style={{ fontSize: '1.3rem' }} />}
        >
          Login
        </Button>
      </Form>
      <br />
    </PublicLayout>
  );
};

export default Login;