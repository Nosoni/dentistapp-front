import React, { useState, useEffect } from 'react'
import { useForm, Controller } from "react-hook-form";
import { Select, Table } from 'antd'
import { getHistorialInicial } from '../../../services/pacientes_dientes_historial';
import ButtonsTooltips from '../../components/ButtonsTooltips';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

const PresupuestoDetalle = (props) => {
  const { detalle, disabled, pacienteSeleccionado, openNotification,
    agregarValoresDetalle, validarPeticion, usuarioData: { token } } = props
  const shape = {
    paciente_diente_historial: yup.object().required("Favor seleccionar el tratamiento o servicio"),
  }
  const schema = yup.object(shape)
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const [historialPaciente, setHistorialPaciente] = useState([])
  const [list, setList] = useState([])
  const [valores, setValores] = useState([])
  const { Option } = Select

  useEffect(() => {
    if (detalle) {
      setList(detalle)
    }
  }, [])

  useEffect(() => {
    if (pacienteSeleccionado) {
      getDetalle()
    }
  }, [pacienteSeleccionado])

  useEffect(() => {
    if (errors) {
      Object.entries(errors).forEach(([key, value]) => {
        openNotification("error", value.message)
      });
    }
  }, [errors])

  const acciones = (detalle) => {
    return <ButtonsTooltips
      onClick={() => removerLista(detalle)}
      shape='circle'
      className="bg-color-error"
      tooltipsTitle="Eliminar"
      disabled={disabled}>
      <span className='icofont icofont-ui-delete' />
    </ButtonsTooltips>
  }

  const columns = [{
    key: 'historial',
    dataIndex: 'historial',
    title: 'Historial',
  }, {
    key: 'precio',
    dataIndex: 'precio',
    title: 'Precio',
  },
  {
    key: 'actiones',
    title: '',
    render: acciones,
  }]

  const removerLista = (elemento) => {
    const new_list = list.filter(e => e != elemento)
    const new_value = valores.filter(e => e.paciente_diente_historial_id != elemento.paciente_diente_historial_id)
    setList(new_list)
    agregarValoresDetalle(new_value)
  }

  const getDetalle = async () => {
    validarPeticion(getHistorialInicial(token, pacienteSeleccionado),
      (respuesta) => {
        const list = respuesta.datos.map(histPaciente => {
          return {
            value: histPaciente.historial_id,
            label: `${histPaciente.tratamiento_servicio_nombre} - ${histPaciente.tratamiento_servicio_descripcion}`,
            precio: histPaciente.precio
          }
        })
        setHistorialPaciente(list)
      })
  }

  const agregarValores = (data) => {
    //validar que ya está incluido lo que se está queriendo meter al detalle
    const new_value = {
      paciente_diente_historial_id: data.paciente_diente_historial.value[0],
      precio: data.paciente_diente_historial.value[1],
    }

    const new_list = {
      paciente_diente_historial_id: data.paciente_diente_historial.value[0],
      historial: data.paciente_diente_historial.label,
      precio: data.paciente_diente_historial.value[1],
    }

    setValores([...valores, new_value])
    setList([...list, new_list])
    agregarValoresDetalle([...valores, new_value])
  }

  return <div className='col-12 mt-2 mb-2'>
    <label style={{ fontStyle: 'oblique' }}>Agregar detalle</label>
    <div className='row mb-2'>
      <Controller
        name='paciente_diente_historial'
        control={control}
        render={({ field }) => <div className='col-4'>
          <label className='ant-form-item-label'>Tratamiento o servicio: </label>
          <Select
            placeholder='Seleccione el tratamiento o servicio'
            notFoundContent="No hay tratamiento o servicio para mostrar"
            optionFilterProp='children'
            allowClear
            showSearch
            showArrow
            labelInValue
            {...field}>
            {
              historialPaciente.map(histPaciente => {
                return <Option
                  key={histPaciente.value}
                  value={[histPaciente.value, histPaciente.precio]}>
                  {histPaciente.label}
                </Option>
              })
            }
          </Select>
        </div>
        }
      />
      <div className='col-1'
        style={{ marginTop: '26px' }}
      >
        <ButtonsTooltips
          shape='round'
          className="bg-color-success"
          tooltipsTitle="Insertar"
          onClick={handleSubmit(agregarValores)}
          disabled={disabled}
        >
          <span className='icofont icofont-verification-check' />
        </ButtonsTooltips>
      </div>
    </div>
    <div className='row mb-2 '>
      <Table className='col-12'
        rowKey='paciente_diente_historial_id'
        pagination={false}
        columns={columns}
        dataSource={list}
        locale={{ emptyText: 'Sin detalles' }}
      />
    </div>
  </div>

}

export default PresupuestoDetalle
