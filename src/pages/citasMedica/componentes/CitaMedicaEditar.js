import React, { useEffect, useState } from 'react'
import { Input, Card, Select, DatePicker } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { citaMedicaCrear, citaMedicaEditar } from '../../../services/citas_medicas';
import withPageActions from '../../HOC/withPageActions';
import BotoneraFooterActions from '../../components/BotoneraFooterActions';
import { pacienteListar } from '../../../services/pacientes';
import moment from 'moment';

const CitaMedica = (props) => {
  const { onClickCancelar, validarPeticion, openNotification,
    usuarioData: { token }, pageData: { selected } } = props
  const [pacientes, setPacientes] = useState([])
  const existe = !!selected?.extendedProps.cita_medica_id
  let titulo = 'Editar cita médica'
  const shape = {
    paciente_id: yup.string().required('Favor seleccionar un paciente'),
    fecha_inicio: yup.date().required('Favor seleccionar la fecha y hora'),
  }
  if (!existe) {
    titulo = 'Crear cita médica'
  }

  const schema = yup.object(shape)
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { ...selected.extendedProps, fecha_inicio: moment(selected.extendedProps.fecha_inicio) },
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    listarPacientes()
  }, [])

  useEffect(() => {
    if (errors) {
      Object.entries(errors).forEach(([key, value]) => {
        openNotification('error', value.message)
      });
    }
  }, [errors])

  const listarPacientes = async () => {
    validarPeticion(pacienteListar(token), actualizarListPaciente)
  }

  const actualizarListPaciente = (respuesta) => {
    const list = respuesta.datos.map(paciente => {
      return {
        value: paciente.id,
        label: `${paciente.documento} - ${paciente.apellidos}, ${paciente.nombres}`
      }
    })
    setPacientes(list)
  }

  const onSubmit = async cita_medica => {
    console.log("cita_medica", cita_medica)
    if (existe)
      validarPeticion(citaMedicaEditar(token, { id: cita_medica.cita_medica_id, ...cita_medica }), () => { }, true)
    else
      validarPeticion(citaMedicaCrear(token, cita_medica), () => { }, true)
  }

  return (
    <div className='row justify-content-center'>
      <Card title={titulo}>
        <div className='row'>
          <Controller
            name='paciente_id'
            control={control}
            render={({ field }) => <div className='col-md-8'>
              <label className='ant-form-item-label'>Paciente: </label>
              <Select
                {...field}
                options={pacientes}
                allowClear
              />
            </div>
            }
          />
          <Controller
            name='fecha_inicio'
            control={control}
            render={({ field }) => <div className='col-md-4'>
              <label className='ant-form-item-label'>Fecha y hora: </label>
              <DatePicker
                placeholder='Seleccione la fecha'
                format='DD/MM/YYYY HH:mm'
                showTime
                {...field}
              />
            </div>
            }
          />
          <Controller
            name='observacion'
            control={control}
            render={({ field }) => <div className='col-md-6'>
              <label className='ant-form-item-label'>Observación: </label>
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

export default withPageActions(CitaMedica)(null)

