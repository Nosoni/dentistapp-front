import React, { useEffect } from 'react'
import { Input, notification, Card } from 'antd';
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { tratamientoServicioCrear, tratamientoServicioEditar } from '../../../services/tratamientos_servicios';
import withPageActions from '../../HOC/withPageActions';
import BotoneraFooterActions from '../../components/BotoneraFooterActions';

const TratamientoServicioEditar = (props) => {
  const { onClickCancelar, validarPeticion, openNotification,
    usuarioData: { token }, pageData: { selected } } = props
  const existe = !!selected?.id
  let titulo = "Editar tratamientos y servicios"
  const shape = {
    nombre: yup.string().required("Favor indicar el nombre"),
    precio: yup.number().required("Favor indicar el precio"),
  }
  if (!existe) {
    titulo = "Crear tratamientos y servicios"
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

  const onSubmit = async tratamiento_servicio => {
    if (existe)
      validarPeticion(tratamientoServicioEditar(token, tratamiento_servicio), () => { }, true)
    else
      validarPeticion(tratamientoServicioCrear(token, tratamiento_servicio), () => { }, true)
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
              <label className="ant-form-item-label">Descripci??n: </label>
              <Input
                {...field}
              />
            </div>
            }
          />
        </div>
        <div className='row mb-2'>
          <Controller
            name="precio"
            control={control}
            render={({ field }) => <div className="col-md-6">
              <label className="ant-form-item-label">Precio: </label>
              <Input
                type='number'
                {...field}
              />
            </div>
            }
          />
          <Controller
            name="tiempo"
            control={control}
            render={({ field }) => <div className="col-md-6">
              <label className="ant-form-item-label">Tiempo: </label>
              <Input
                type="time"
                placeholder="Tiempo de atenci??n"
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

export default withPageActions(TratamientoServicioEditar)(null)

