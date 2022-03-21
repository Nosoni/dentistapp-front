import React, { useState, useEffect } from 'react'
import { useForm, Controller } from "react-hook-form";
import { Select, Table } from 'antd'
import ButtonsTooltips from '../../components/ButtonsTooltips';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { deudaFiltrar } from '../../../services/deudas';

const CobranzaDetalle = (props) => {
  const { detalle, disabled, pacienteSeleccionado, openNotification,
    agregarValoresDetalle, validarPeticion, usuarioData: { token } } = props
  const shape = {
    deuda: yup.object().required("Favor seleccionar la deuda"),
  }
  const schema = yup.object(shape)
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const [deudas, setDeudas] = useState([])
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
    key: 'deuda',
    dataIndex: 'deuda',
    title: 'Deuda',
  }, {
    key: 'monto',
    dataIndex: 'monto',
    title: 'monto',
  },
  {
    key: 'actiones',
    title: '',
    render: acciones,
  }]

  const removerLista = (elemento) => {
    const new_list = list.filter(e => e != elemento)
    const new_value = valores.filter(e => e.deuda_id != elemento.deuda_id)
    setList(new_list)
    agregarValoresDetalle(new_value)
  }

  const getDetalle = async () => {
    validarPeticion(deudaFiltrar(token, pacienteSeleccionado),
      (respuesta) => {
        const list = respuesta.datos.map(deuda => {
          return {
            value: deuda.deuda_id,
            label: deuda.factura_comprobante,
            monto: deuda.monto
          }
        })
        setDeudas(list)
      })
  }

  const agregarValores = (data) => {
    //validar que ya está incluido lo que se está queriendo meter al detalle
    const new_value = {
      deuda_id: data.deuda.value[0],
      monto: data.deuda.value[1]
    }

    const new_list = {
      deuda_id: data.deuda.value[0],
      deuda: data.deuda.label,
      monto: data.deuda.value[1],
    }

    setValores([...valores, new_value])
    setList([...list, new_list])
    agregarValoresDetalle([...valores, new_value])
  }

  return <div className='col-12 mt-2 mb-2'>
    <label style={{ fontStyle: 'oblique' }}>Agregar detalle</label>
    <div className='row mb-2'>
      <Controller
        name='deuda'
        control={control}
        render={({ field }) => <div className='col-4'>
          <label className='ant-form-item-label'>Factura nro.: </label>
          <Select
            placeholder='Seleccione la factura'
            notFoundContent="No hay deuda para mostrar"
            optionFilterProp='children'
            allowClear
            showSearch
            showArrow
            labelInValue
            {...field}>
            {
              deudas.map(deuda => {
                return <Option
                  key={deuda.value}
                  value={[deuda.value, deuda.monto]}>
                  {deuda.label}
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
        rowKey='deuda_id'
        pagination={false}
        columns={columns}
        dataSource={list}
        locale={{ emptyText: 'Sin detalles' }}
      />
    </div>
  </div>

}

export default CobranzaDetalle
