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
import { usuarioCrear, usuarioEditar } from '../../../services/usuarios';

const UsuarioEditar = ({ usuario, onClickCancelar }) => {
  const existe = !!usuario?.id
  const [funcionarios, setFuncionarios] = useState([])
  const shape = {
    usuario: yup.string().required("Favor introduzca el Usuario")
  }
  if (!existe) {
    shape.password = yup.string().required("Favor introduzca la contraseña")
    shape.confirmar = yup.string().required("Favor confirme la contraseña")
  }
  const schema = yup.object(shape)
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

  const onSubmit = async usuario => {
    if (existe)
      await usuarioEditar(token, usuario).then(() => openNotification("success", "Usuario editado con exito"))
    else
      await usuarioCrear(token, usuario).then(() => openNotification("success", "Usuario creado con exito"))
  }

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
              disabled={existe}
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
        {!existe &&
          <>
            <Controller
              name="password"
              control={control}
              render={({ field }) => <div className="mb-2">
                <label className="ant-form-item-label">Contraseña: </label>
                <Input
                  {...field}
                  disabled={existe}
                  type="password"
                />
              </div>
              }
            />
            <Controller
              name="confirmar"
              control={control}
              render={({ field }) => <div className="mb-2">
                <label className="ant-form-item-label">Confirmar contraseña: </label>
                <Input
                  {...field}
                  disabled={existe}
                  type="password"
                />
              </div>
              }
            />
          </>
        }
        <div className='mt-2 modal-footer d-flex justify-content-between'>
          <Button className='bg-color-info' onClick={onClickCancelar}>
            Cancelar
          </Button>
          <Button className='bg-color-success' onClick={handleSubmit(onSubmit)}>
            Aceptar
          </Button>
        </div>
      </form>
    </div>
  )
}

export default UsuarioEditar
