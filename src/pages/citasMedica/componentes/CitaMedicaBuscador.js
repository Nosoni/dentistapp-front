import React, { useEffect, useState } from 'react'
import { Controller, useForm } from "react-hook-form";
import { DatePicker, Select, Button } from 'antd';
import withPageActions from '../../HOC/withPageActions';
import { citaMedicaFiltrar } from '../../../services/citas_medicas';
import { estadoMovimientoListarTablaGrouping } from '../../../services/estados_movimientos';
import { objectHasValue } from '../../../utils/helpers';
import { pacienteFiltrar } from '../../../services/pacientes';
import '../../components/css/datetimepicker.css';

const CitaMedicaBuscador = (props) => {
  const { validarPeticion, actualizarEstadoPagina, openNotification,
    usuarioData: { token }, pageData: { list, deleted } } = props;
  const { handleSubmit, reset, control } = useForm();
  const [estados, setEstados] = useState([])
  const [pacientes, setPacientes] = useState([])
  const { Option } = Select;

  useEffect(() => {
    getEstados()
  }, [])

  const getEstados = async () => {
    validarPeticion(estadoMovimientoListarTablaGrouping(token, 'citas_medicas'),
      (respuesta) => {
        const list = respuesta.datos.map(estado_movimiento => {
          return {
            value: estado_movimiento.estado_actual,
            label: estado_movimiento.estado_actual
          }
        })
        setEstados(list)
      })
  }

  const filtrarCitaMedica = async (filtro) => {
    validarPeticion(citaMedicaFiltrar(token, filtro), (respuesta) => {
      actualizarEstadoPagina({ list: respuesta.datos })
    })
  }

  const onSubmit = async (filtro) => {
    if (objectHasValue(filtro)) {
      if (filtro.pacientes) {
        let paciente_seleccionado = []
        filtro.pacientes.map(paciente => paciente_seleccionado.push(paciente.value))
        filtro.paciente_id = paciente_seleccionado
      }
      filtrarCitaMedica(filtro)
    } else {
      openNotification('error', 'Favor seleccionar un filtro de búsqueda.')
    }
  };

  const handleSearch = value => {
    if (value.key === 'Enter') {
      validarPeticion(pacienteFiltrar(token, value.target.value),
        (respuesta) => {
          const pacientes = respuesta.datos.map(paciente => {
            return {
              value: paciente.id,
              label: `${paciente.apellidos}, ${paciente.nombres}`
            }
          })
          setPacientes(pacientes)
        })
    } else {
      setPacientes([]);
    }
  };

  return <>
    <label className='mb-4'
      style={{
        fontSize: '20px',
        fontWeight: 500,
        letterSpacing: '0.2px'
      }}>
      Filtro de búsqueda
    </label>
    <Controller
      name='pacientes'
      control={control}
      render={({ field }) => <div className='col-md-12 mb-2'>
        <label className='ant-form-item-label'>Seleccionar paciente: </label>
        <Select
          className='mb-lg-0 mb-4'
          placeholder='Seleccione un paciente'
          mode='multiple'
          optionFilterProp='children'
          allowClear
          showSearch
          defaultActiveFirstOption={true}
          showArrow={true}
          labelInValue
          onInputKeyDown={handleSearch}
          notFoundContent="No hay pacientes para mostrar"
          {...field}
        >
          {pacientes.map(paciente => <Option value={paciente.value}>{paciente.label}</Option>)}
        </Select>
      </div>
      }
    />
    <Controller
      name='fecha_inicio'
      control={control}
      render={({ field }) => <div className='col-md-12 mb-2'>
        <label className='ant-form-item-label'>Fecha desde: </label>
        <DatePicker
          placeholder='Desde'
          format='DD/MM/YYYY'
          className='mr-2'
          {...field}
        />
      </div>
      }
    />
    <Controller
      name='fecha_fin'
      control={control}
      render={({ field }) => <div className='col-md-12 mb-2'>
        <label className='ant-form-item-label'>Fecha hasta: </label>
        <DatePicker
          placeholder='Hasta'
          format='DD/MM/YYYY'
          className='mr-2'
          {...field}
        />
      </div>
      }
    />
    <Controller
      name='estado_actual'
      control={control}
      render={({ field }) => <div className='col-md-12 mb-2'>
        <label className='ant-form-item-label'>Estado: </label>
        <Select
          className='mb-lg-0'
          placeholder='Estado de la cita'
          mode='multiple'
          optionFilterProp='children'
          allowClear
          {...field}
        >
          {estados.map(estado => <Option value={estado.value} key={estado.value}>{estado.label}</Option>)}
        </Select>
      </div>
      }
    />
    <Button className='bg-color-info mt-2 float-right'
      onClick={handleSubmit(onSubmit)}
    >
      Buscar
    </Button>
  </>
}

export default withPageActions(CitaMedicaBuscador)(null)
