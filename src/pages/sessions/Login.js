import React from 'react';
import { Button, Form, Input, notification } from 'antd';
import { LoginOutlined } from '@ant-design/icons/lib';
import PublicLayout from '../../layout/public/Public';
import { useForm } from 'antd/es/form/Form';
import { useDispatch } from 'react-redux';
import { setUsuarioData } from '../../redux/usuario-data/actions';
import { autenticar } from '../../services/autenticar';
import { useHistory } from 'react-router-dom'
import withPageActions from '../HOC/withPageActions';

const { Item } = Form;

const Login = (props) => {
  const { validarPeticion } = props
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = useForm();

  const openNotification = (type, descripcion) => {
    notification[type]({
      description: descripcion,
    });
  };

  const handleOnClickLogin = async () => {
    try {
      const datosForm = await form.validateFields();
      //const autenticacion = await autenticar(datosForm);
      validarPeticion(autenticar(datosForm),
        (autenticacion) => {
          dispatch(setUsuarioData(autenticacion.datos))
          history.push("/inicio/dashboard")
        },
        true)
    } catch (error) {
      openNotification("error", "No es posible conectar con el servidor.")
    }
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
        <div className="row justify-content-center">
          <Button
            className="bg-color-info"
            block={false}
            type='primary'
            onClick={handleOnClickLogin}
            htmlType='submit'
          >
            Iniciar sesión
          </Button>
        </div>
      </Form>
      <br />
    </PublicLayout>
  );
};

export default withPageActions(Login)(null)
