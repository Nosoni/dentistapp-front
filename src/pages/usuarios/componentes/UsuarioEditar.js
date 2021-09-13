import React, { useEffect, useState } from 'react'
import { Input, Button, Select, notification, Card } from 'antd';
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { funcionarioListar } from '../../../services/funcionarios';
import { useDispatch, useSelector } from 'react-redux';
import { usuarioCrear, usuarioEditar } from '../../../services/usuarios';
import { updateUsuarioData } from '../../../redux/usuario-data/actions';

const UsuarioEditar = ({ onClickCancelar }) => {
  const dispatch = useDispatch();
  const { selected } = useSelector((state) => state.pageData);
  const token = useSelector((state) => state.usuarioData.token);
  const [funcionarios, setFuncionarios] = useState([])
  const existe = !!selected?.id
  let titulo = "Editar usuario"
  const shape = {
    usuario: yup.string().required("Favor introduzca el Usuario")
  }
  if (!existe) {
    shape.password = yup.string().required("Favor introduzca la contraseña")
    shape.confirmar = yup.string().required("Favor confirme la contraseña")
    titulo = "Crear usuario"
  }
  const schema = yup.object(shape)
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: selected,
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (errors) {
      Object.entries(errors).forEach(([key, value]) => {
        openNotification("error", value.message)
      });
    }
  }, [errors])

  useEffect(() => {
    listarFuncionarios()
  }, [])

  const openNotification = (type, descripcion) => {
    notification[type]({
      description: descripcion,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  const validarPeticion = (respuesta, next) => {
    if (respuesta.error) {
      openNotification("error", respuesta.mensaje)
      if (respuesta.autenticado === false) {
        dispatch(updateUsuarioData({ authenticated: false }));
      }
    } else {
      next(respuesta)
    }
  }

  const listarFuncionarios = async () => {
    const respuesta = await funcionarioListar(token)
    validarPeticion(respuesta, actualizarListUsuario)
  }

  const actualizarListUsuario = (respuesta) => {
    const list = respuesta.datos.map(funcionario => {
      return {
        value: funcionario.id,
        label: (funcionario.nombres + " " + funcionario.apellidos)
      }
    })
    setFuncionarios(list)
  }

  const onSubmit = async usuario => {
    let respuesta;
    if (existe)
      respuesta = await usuarioEditar(token, usuario)
    else
      respuesta = await usuarioCrear(token, usuario)

    validarPeticion(respuesta, (respuesta) => {
      openNotification((respuesta.error ? "error" : "success"), respuesta.mensaje)
    })
  }

  // de muestra
  // const cardTitulo = () => {
  //   return <div className="row justify-content-between m-0 p-0">
  //     {titulo}
  //     <Button onClick={() => { }} shape='circle' className="bg-color-error">
  //       <span className='icofont icofont-ui-delete' />
  //     </Button>
  //   </div>
  // }

  return (
    <div className='row justify-content-center'>
      <Card title={titulo} className='col-md-6 col-sm-9 with-shadow'>
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
        <Controller
          name="password"
          control={control}
          render={({ field }) => <div className="mb-2">
            <label className="ant-form-item-label">Contraseña: </label>
            <Input
              {...field}
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
              type="password"
            />
          </div>
          }
        />
        <div className='mt-4 modal-footer d-flex justify-content-between'>
          <Button className='bg-color-info' onClick={onClickCancelar}>
            Volver
          </Button>
          <Button className='bg-color-success' onClick={handleSubmit(onSubmit)}>
            Aceptar
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default UsuarioEditar
