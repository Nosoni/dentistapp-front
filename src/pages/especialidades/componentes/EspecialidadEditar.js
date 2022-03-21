import React, { useEffect, useState } from 'react'
import { Input, Select, notification, Card } from 'antd';
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { especialidadCrear, especialidadEditar, especialidadListar } from '../../../services/especialidades';
import withPageActions from '../../HOC/withPageActions';
import BotoneraFooterActions from '../../components/BotoneraFooterActions';

const EspecialidadEditar = (props) => {
  const { onClickCancelar, validarPeticion, openNotification,
    usuarioData: { token }, pageData: { selected } } = props
  const [especialidad, setEspecialidad] = useState([])
  const existe = !!selected?.id
  let titulo = "Editar especialidad"
  const shape = {
    nombre: yup.string().required("Favor indicar el nombre"),
  }
  if (!existe) {
    titulo = "Crear especialidad"
  }
  const schema = yup.object(shape)
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: selected,
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    listarEspecialidades()
  }, [])

  useEffect(() => {
    if (errors) {
      Object.entries(errors).forEach(([key, value]) => {
        openNotification("error", value.message)
      });
    }
  }, [errors])

  const listarEspecialidades = async () => {
    validarPeticion(especialidadListar(token), actualizarListEspecialidad)
  }

  const actualizarListEspecialidad = (respuesta) => {
    const list = respuesta.datos.map(especialidad => {
      return {
        value: especialidad.id,
        label: especialidad.nombre
      }
    })
    setEspecialidad(list)
  }

  const onSubmit = async especialidad => {
    if (existe)
      validarPeticion(especialidadEditar(token, especialidad), () => { }, true)
    else
      validarPeticion(especialidadCrear(token, especialidad), () => { }, true)
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
            name="especialidad_padre_id"
            control={control}
            render={({ field }) => <div className="col-md-6">
              <label className="ant-form-item-label">Especialidad padre: </label>
              <Select
                {...field}
                allowClear
                options={especialidad}
              />
            </div>
            }
          />
        </div>
        <div className='row mb-2'>
          <Controller
            name="descripcion"
            control={control}
            render={({ field }) => <div className="col-md-12">
              <label className="ant-form-item-label">Descripción: </label>
              <Input
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

export default withPageActions(EspecialidadEditar)(null)

