import React, { useState, useEffect } from 'react'
import { useForm, Controller } from "react-hook-form";
import { Input, Select, Table } from 'antd'
import ButtonsTooltips from '../../components/ButtonsTooltips';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { productoServicioListar } from '../../../services/productos_servicios';

const ActualizarStockDetalle = (props) => {
  const { detalle, disabled, openNotification, agregarValoresDetalle,
    validarPeticion, usuarioData: { token } } = props
  const shape = {
    insumo: yup.object().required("Favor seleccionar el tratamiento o servicio."),
    cantidad: yup.number().required("Favor indicar la cantidad.")
  }
  const schema = yup.object(shape)
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const [insumos, setInsumos] = useState([])
  const [list, setList] = useState([])
  const [valores, setValores] = useState([])
  const { Option } = Select

  useEffect(() => {
    if (detalle) {
      setList(detalle)
    }
    getInsumos()
  }, [])

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

  const getInsumos = async () => {
    validarPeticion(productoServicioListar(token), (respuesta) => {
      const list = respuesta.datos.map(insumo => {
        return {
          value: insumo.id,
          label: `${insumo.nombre} - ${insumo.descripcion}`
        }
      })
      setInsumos(list)
    })
  }

  const columns = [{
    key: 'insumo',
    dataIndex: 'insumo',
    title: 'Insumo',
  }, {
    key: 'cantidad',
    dataIndex: 'cantidad',
    title: 'Cantidad',
  },
  {
    key: 'actiones',
    title: '',
    render: acciones,
  }]

  const removerLista = (elemento) => {
    const new_list = list.filter(e => e != elemento)
    const new_value = valores.filter(e => e.insumo_id != elemento.insumo_id)
    setList(new_list)
    agregarValoresDetalle(new_value)
  }

  const agregarValores = (data) => {
    const new_value = {
      insumo_id: data.insumo.value,
      cantidad: data.cantidad,
    }

    const new_list = {
      insumo_id: data.insumo.value,
      insumo: data.insumo.label,
      cantidad: data.cantidad,
    }

    setValores([...valores, new_value])
    setList([...list, new_list])
    agregarValoresDetalle([...valores, new_value])
  }

  return <div className='col-12 mt-2 mb-2'>
    <label style={{ fontStyle: 'oblique' }}>Agregar detalle</label>
    <div className='row mb-2'>
      <Controller
        name='insumo'
        control={control}
        render={({ field }) => <div className='col-5'>
          <label className='ant-form-item-label'>Insumo: </label>
          <Select
            placeholder='Seleccione el insumo'
            notFoundContent="No hay insumo para mostrar"
            optionFilterProp='children'
            allowClear
            showSearch
            showArrow
            labelInValue
            {...field}>
            {
              insumos.map(insumo => {
                return <Option
                  key={insumo.value}
                  value={insumo.value}>
                  {insumo.label}
                </Option>
              })
            }
          </Select>
        </div>
        }
      />
      <Controller
        name="cantidad"
        control={control}
        render={({ field }) => <div className="col-md-3">
          <label className="ant-form-item-label">Cantidad: </label>
          <Input
            type='number'
            {...field}
          />
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
        rowKey='insumo_id'
        pagination={false}
        columns={columns}
        dataSource={list}
        locale={{ emptyText: 'Sin detalles' }}
      />
    </div>
  </div>

}

export default ActualizarStockDetalle
