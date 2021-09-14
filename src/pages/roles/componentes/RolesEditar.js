import React, { useEffect } from 'react'
import withPageActions from '../../HOC/withPageActions'
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, Input, notification } from 'antd';
import { rolCrear, rolEditar } from '../../../services/roles';
import BotoneraFooterActions from '../../components/BotoneraFooterActions';

const RolesEditar = (props) => {
  const { onClickCancelar, validarPeticion } = props
  const { token } = props.usuarioData;
  const { selected } = props.pageData;
  const existe = !!selected?.id
  let titulo = "Editar rol"
  const shape = {
    nombre: yup.string().required("Favor introduzca el nombre"),
  }
  if (!existe) {
    titulo = "Crear rol"
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

  const openNotification = (type, descripcion) => {
    notification[type]({
      description: descripcion
    });
  };

  const onSubmit = async rol => {
    let respuesta;
    if (existe)
      respuesta = await rolEditar(token, rol)
    else
      respuesta = await rolCrear(token, rol)

    validarPeticion(respuesta, () => { }, true)
  }

  return (
    <div className='row justify-content-center'>
      <Card title={titulo} className='col-md-6 col-sm-9 with-shadow'>
        <Controller
          name="nombre"
          control={control}
          render={({ field }) => <div className="mb-2">
            <label className="ant-form-item-label">Nombre: </label>
            <Input
              {...field}
            />
          </div>
          }
        />
        <Controller
          name="descripcion"
          control={control}
          render={({ field }) => <div className="mb-2">
            <label className="ant-form-item-label">Descripción: </label>
            <Input
              {...field}
            />
          </div>
          }
        />
        <div className="mt-4">
          <BotoneraFooterActions
            onClickCancelar={onClickCancelar}
            onClickAceptar={handleSubmit(onSubmit)}
          />
        </div>
      </Card>
    </div>
  )
}

export default withPageActions(RolesEditar)(null)
