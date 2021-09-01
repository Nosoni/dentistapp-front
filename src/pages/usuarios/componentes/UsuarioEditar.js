import React, { useEffect, useState } from 'react'
import { Input, Form, Button, Select, notification } from 'antd';
import {
  PlusOutlined
} from '@ant-design/icons';
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { funcionarioListar } from '../../../services/funcionarios';
import { useSelector } from 'react-redux';

const UsuarioEditar = ({ usuario }) => {
  const [funcionarios, setFuncionarios] = useState([])
  const schema = yup.object({
    usuario: yup.string().required("Favor introduzca el Usuario")
  })
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: usuario,
    resolver: yupResolver(schema)
  });
  const token = useSelector((state) => state.usuarioData.token);

  useEffect(() => {
    if (errors) {
      Object.entries(errors).forEach(([key, value]) => {
        openNotification("error", value.message)
      });
    }
  }, [errors])

  useEffect(() => {
    console.log()
    if (!funcionarios.length) {
      listarFuncionarios()
    }
  }, [funcionarios])

  const listarFuncionarios = async () => {
    const respuesta = await funcionarioListar(token)
    const list = respuesta.map(funcionario => {
      return {
        value: funcionario.id,
        label: (funcionario.nombres + " " + funcionario.apellidos)
      }
    })
    console.log(list)
    setFuncionarios(list)
  }

  const openNotification = (type, descripcion) => {
    notification[type]({
      description: descripcion,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  const onSubmit = data => console.log("data", data);

  return (
    <div>
      <form className="ant-form ant-form-horizontal">
        <Controller
          name="usuario"
          control={control}
          render={({ field }) => <div className="mb-2">
            <label className="ant-form-item-label">Usuario: </label>
            <Input
              {...field}
              disabled
            />
          </div>
          }
        />
        <Controller
          name="funcionario_id"
          control={control}
          render={({ field }) => <div className="mb-2">
            <label className="ant-form-item-label">Funcionario: </label>
            <Select
              {...field}
              options={funcionarios}
            />
          </div>
          }
        />
        <Button onClick={handleSubmit(onSubmit)} className='bg-color-info' icon={<PlusOutlined />} />
      </form>
    </div>
  )
}

export default UsuarioEditar
