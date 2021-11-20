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
import { estadoMovimientoFiltrar } from '../../../services/estados_movimientos';

const CitaMedica = (props) => {
  const { onClickCancelar, validarPeticion, openNotification,
    usuarioData: { token, usuario }, pageData: { selected } } = props
  const [pacientes, setPacientes] = useState([])
  const [estados, setEstados] = useState([])
  const existe = !!selected.extendedProps?.cita_medica_id
  const puede_avanzar = !!selected.extendedProps?.puede_avanzar
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
    defaultValues: {
      ...selected.extendedProps,
      fecha_inicio: existe ? moment(selected.extendedProps.fecha_inicio) : moment()
    },
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    listarPacientes()
  }, [])

  useEffect(() => {
    if (existe) {
      getEstados(selected.extendedProps?.estado_cita_id)
    }
  }, [selected])

  useEffect(() => {
    if (errors) {
      Object.entries(errors).forEach(([key, value]) => {
        openNotification('error', value.message)
      });
    }
  }, [errors])

  const getEstados = async (estado_cita_id) => {
    validarPeticion(estadoMovimientoFiltrar(token, { tabla_id: 'citas_medicas', estado_anterior_id: estado_cita_id }),
      (respuesta) => {
        console.log(respuesta.datos)
        const list = respuesta.datos.map(estado_movimiento => {
          return {
            value: estado_movimiento.id,
            label: estado_movimiento.estado_actual
          }
        })
        setEstados(list)
      })
  }

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
    if (existe)
      validarPeticion(citaMedicaEditar(token, {
        id: cita_medica.cita_medica_id,
        ...cita_medica,
      }), () => { }, true)
    else
      validarPeticion(citaMedicaCrear(token, cita_medica), () => { }, true)

    onClickCancelar()
  }

  return (
    <div className='row justify-content-center'>
      <Card title={titulo} className='col-md-12' style={{ marginBottom: '0px' }}>
        <div className='row mb-2'>
          <Controller
            name='paciente_id'
            control={control}
            render={({ field }) => <div className='col-md-8'>
              <label className='ant-form-item-label'>Paciente: </label>
              <Select
                {...field}
                options={pacientes}
                allowClear
                notFoundContent="No se encontró pacientes"
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
        </div>
        <div className='row'>
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
          {existe &&
            <Controller
              name="estado_nuevo_id"
              control={control}
              render={({ field }) => <div className="col-md-6">
                <label className="ant-form-item-label">Actualizar estado: </label>
                <Select
                  {...field}
                  options={estados}
                  notFoundContent="No hay estados"
                />
              </div>
              }
            />
          }
        </div>
        <BotoneraFooterActions
          onClickCancelar={onClickCancelar}
          aceptarEnable={existe ? !puede_avanzar : false}
          onClickAceptar={handleSubmit(onSubmit)}
        />
      </Card>
    </div>
  )
}

export default withPageActions(CitaMedica)(null)

