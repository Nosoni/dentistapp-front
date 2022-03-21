import React, { useEffect, useState } from 'react'
import { Controller, useForm } from "react-hook-form";
import { DatePicker, Select, Button, Input } from 'antd';
import { objectHasValue } from '../../../utils/helpers';
import '../../components/css/datetimepicker.css';
import { stockActualizarFiltrar } from '../../../services/stock_actualizar';
import { tiposMovmimientosStockListar } from '../../../services/tipos_movimientos_stock';

const ActualizarStockBuscador = (props) => {
  const { validarPeticion, actualizarEstadoPagina, openNotification,
    usuarioData: { token }, pageData: { list, deleted }, nuevo } = props;
  const { handleSubmit, control } = useForm();
  const [tiposMovimientos, setTiposMovimientos] = useState([])

  useEffect(() => {
    getTiposMovmientos()
  }, [])

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

  const filtrarActualizarStock = async (filtro) => {
    validarPeticion(stockActualizarFiltrar(token, filtro), (respuesta) => {
      actualizarEstadoPagina({ list: respuesta.datos })
    })
  }

  const onSubmit = async (filtro) => {
    if (objectHasValue(filtro)) {
      filtrarActualizarStock(filtro)
    } else {
      openNotification('error', 'Favor seleccionar un filtro de búsqueda.')
    }
  };

  return <>
    <div className='row'>
      <Controller
        name="tipo_movimiento_id"
        control={control}
        render={({ field }) => <div className="col-md-3">
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
        name="comprobante"
        control={control}
        render={({ field }) => <div className="col-md-3">
          <label className="ant-form-item-label">Comprobante: </label>
          <Input
            {...field}
          />
        </div>
        }
      />
      <Controller
        name='fecha_inicio'
        control={control}
        render={({ field }) => <div className='col-md-3'>
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
        render={({ field }) => <div className='col-md-3'>
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
    </div>
    <div className='row float-right mt-3'>
      <Button className='bg-color-info'
        onClick={handleSubmit(onSubmit)}
      >
        Buscar
      </Button>
      <Button className='bg-color-success ml-2 mr-4'
        onClick={nuevo}
      >
        Nuevo
      </Button>
    </div>
  </>
}

export default ActualizarStockBuscador
