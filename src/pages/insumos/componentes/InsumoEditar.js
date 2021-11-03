import React, { useEffect } from 'react'
import { Input, notification, Card } from 'antd';
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { insumoCrear, insumoEditar } from '../../../services/insumos';
import withPageActions from '../../HOC/withPageActions';
import BotoneraFooterActions from '../../components/BotoneraFooterActions';

const InsumoEditar = (props) => {
  const { onClickCancelar, validarPeticion,
    usuarioData: { token }, pageData: { selected } } = props
  const existe = !!selected?.id
  let titulo = "Editar insumos"
  const shape = {
    nombre: yup.string().required("Favor indicar el nombre"),
    codigo: yup.string().required("Favor indicar el código"),
  }
  if (!existe) {
    titulo = "Crear insumos"
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

  const onSubmit = async insumo => {
    if (existe)
      validarPeticion(insumoEditar(token, insumo), () => { }, true)
    else
      validarPeticion(insumoCrear(token, insumo), () => { }, true)
  }

  return (
    <div className='row justify-content-center'>
      <Card title={titulo} className='col-md-6 col-sm-9 with-shadow'>
        <div className='row mb-2'>
          <Controller
            name="nombre"
            control={control}
            render={({ field }) => <div className="col-md-6">
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
            render={({ field }) => <div className="col-md-6">
              <label className="ant-form-item-label">Descripción: </label>
              <Input
                {...field}
              />
            </div>
            }
          />
        </div>
        <div className='row mb-2'>
          <Controller
            name="codigo"
            control={control}
            render={({ field }) => <div className="col-md-6">
              <label className="ant-form-item-label">Código: </label>
              <Input
                {...field}
              />
            </div>
            }
          />
          <Controller
            name="cantidad_minima"
            control={control}
            render={({ field }) => <div className="col-md-6">
              <label className="ant-form-item-label">Cantidad mínima: </label>
              <Input
                type='number'
                {...field}
              />
            </div>
            }
          />
        </div>
        <BotoneraFooterActions
          onClickCancelar={onClickCancelar}
          onClickAceptar={handleSubmit(onSubmit)}
        />
      </Card>
    </div>
  )
}

export default withPageActions(InsumoEditar)(null)

