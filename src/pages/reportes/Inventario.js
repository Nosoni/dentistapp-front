import React, { useState } from 'react'
import withPageActions from '../HOC/withPageActions'
import { Card, Select } from 'antd';
import { Controller, useForm } from "react-hook-form";
import { reporte } from '../../services/reportes';
import { insumoFiltrar } from '../../services/insumos';
import ButtonsTooltips from '../components/ButtonsTooltips';
import { objectHasValue } from '../../utils/helpers';

const pageData = {
  title: "Inventario",
  list: [],
  selected: {},
  deleted: {}
};

const Inventario = (props) => {
  const { handleSubmit, control } = useForm();
  const { validarPeticion, actualizarEstadoPagina, openNotification,
    usuarioData: { token }, pageData: { list, deleted }, nuevo } = props;
  const [insumos, setInsumos] = useState([])
  const { Option } = Select;

  const handleSearch = value => {
    if (value.key === 'Enter') {
      validarPeticion(insumoFiltrar(token, value.target.value),
        (respuesta) => {
          const insumos = respuesta.datos.map(insumo => {
            return {
              value: insumo.id,
              label: insumo.nombre
            }
          })
          setInsumos(insumos)
        })
    } else {
      setInsumos([]);
    }
  };

  const buscar = async (data) => {
    let filtro = {}
    if (objectHasValue(data)) {
      filtro.insumo_id = data.insumos.map(insumo => insumo.value)
    }
    await reporte(token, filtro, 'inventario').then(response => {
      const file = new Blob([response.data], {
        type: "application/pdf"
      });
      //Build a URL from the file
      const fileURL = URL.createObjectURL(file);
      //Open the URL on new Window
      window.open(fileURL);
    })
  }

  return <div className='row justify-content-center'>
    <Card title='Buscar' className='col-md-9 col-sm-12 with-shadow'>
      <div className='row justify-content-center'>
        <Controller
          name='insumos'
          control={control}
          render={({ field }) => <div className='col-md-6 mb-2'>
            <label className='ant-form-item-label'>Seleccionar insumos: </label>
            <Select
              className='mb-lg-0 mb-4'
              placeholder='Seleccione un insumo'
              mode='multiple'
              optionFilterProp='children'
              allowClear
              showSearch
              defaultActiveFirstOption={true}
              showArrow={true}
              labelInValue
              onInputKeyDown={handleSearch}
              notFoundContent="No hay insumos para mostrar"
              {...field}
            >
              {insumos.map(insumo => <Option key={insumo.value} value={insumo.value}>{insumo.label}</Option>)}
            </Select>
          </div>
          }
        />
      </div>
      <div className='row float-right mt-2'>
        <ButtonsTooltips
          onClick={handleSubmit(buscar)}
          shape='circle'
          className="bg-color-error mr-2"
          tooltipsTitle="Imprimir">
          <span className='icofont icofont-printer' />
        </ButtonsTooltips>
      </div>
    </Card>
  </div>
}

export default withPageActions(Inventario)(pageData)
