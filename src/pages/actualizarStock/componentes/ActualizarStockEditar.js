import React, { useEffect, useState } from 'react'
import { Card, DatePicker, Input, Select, Button, Divider, Table } from 'antd';
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import '../../components/css/datetimepicker.css';
import ButtonsTooltips from '../../components/ButtonsTooltips';
import ActualizarStockDetalle from './ActualizarStockDetalle';
import { tiposMovmimientosStockListar } from '../../../services/tipos_movimientos_stock';
import { stockActualizarCrear } from '../../../services/stock_actualizar';
import { validarFecha } from '../../../utils/helpers';

const ActualizarStockEditar = (props) => {
  const { onClickCancelar, validarPeticion, openNotification,
    usuarioData: { token }, pageData: { selected } } = props
  const [tiposMovimientos, setTiposMovimientos] = useState([])
  const [detValues, setDetValues] = useState([])
  const existe = !!selected?.id
  let titulo = "Editar actualización de stock"
  const shape = {
    tipo_movimiento_id: yup.number().required("Favor seleccionar el tipo de movimiento"),
    fecha: yup.date().required("Favor indicar una fecha"),
    comprobante: yup.string().required("Indica el número de comprobante"),
  }
  if (!existe) {
    titulo = "Crear actualización de stock"
  } else {
    selected.fecha = validarFecha(selected.fecha)
  }
  const schema = yup.object(shape)
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: selected,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    getTiposMovmientos()
  }, [])

  useEffect(() => {
    if (errors) {
      Object.entries(errors).forEach(([key, value]) => {
        openNotification("error", value.message)
      });
    }
  }, [errors])

  const getTiposMovmientos = async () => {
    validarPeticion(tiposMovmimientosStockListar(token), (respuesta) => {
      const list = respuesta.datos.map(tipo_movimiento => {
        return {
          value: tipo_movimiento.id,
          label: tipo_movimiento.nombre
        }
      })
      setTiposMovimientos(list)
    })
  }

  const onSubmit = async data => {
    validarPeticion(stockActualizarCrear(token, { cabecera: data, detalle: detValues }),
      () => { }, true)
  }

  const cardTitulo = () => {
    return <div className="row justify-content-between m-0 p-0">
      <div className='col-4'>
        {titulo}
      </div>
      <div className='col-8' style={{
        alignItems: 'flex-end',
        display: 'inline-flex',
        flexFlow: 'row-reverse'
      }}>
        <ButtonsTooltips
          shape='round'
          className="bg-color-success"
          tooltipsTitle="Guardar"
          disabled={existe}
          onClick={handleSubmit(onSubmit)} >
          <span className='icofont icofont-save' />
        </ButtonsTooltips>
        <ButtonsTooltips
          shape='round'
          className="bg-color-info mr-2"
          tooltipsTitle="Volver"
          onClick={onClickCancelar}>
          <span className='icofont icofont-undo' />
        </ButtonsTooltips>
      </div>
    </div>
  }

  return (
    <div className='row justify-content-center'>
      <Card title={cardTitulo()} className='with-shadow col-md-9'>
        <div className='row mb-2'>
          <Controller
            name="tipo_movimiento_id"
            control={control}
            render={({ field }) => <div className="col-4">
              <label className="ant-form-item-label">Tipo movimiento: </label>
              <Select
                options={tiposMovimientos}
                placeholder='Seleccione tipo de ingreso'
                notFoundContent='No hay tipos movimientos stock'
                {...field}
              />
            </div>
            }
          />
          <Controller
            name='fecha'
            control={control}
            render={({ field }) => <div className='col-4'>
              <label className='ant-form-item-label'>Fecha: </label>
              <DatePicker
                placeholder='Fecha'
                format='DD/MM/YYYY'
                suffixIcon={false}
                {...field}
              />
            </div>
            }
          />
          <Controller
            name="comprobante"
            control={control}
            render={({ field }) => <div className="col-4">
              <label className="ant-form-item-label">Comprobante: </label>
              <Input
                {...field}
              />
            </div>
            }
          />
        </div>
        <Divider type="horizontal" style={{ height: "1px", border: '#b4afaf 1px solid', marginBottom: '0px' }} />
        <div className='row '>
          <ActualizarStockDetalle
            detalle={selected.stock_actualizar_detalle}
            disabled={existe}
            agregarValoresDetalle={setDetValues}
            {...props} />
        </div>
      </Card>
    </div>
  )
}

export default ActualizarStockEditar
