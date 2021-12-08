import React, { useState } from 'react'
import withPageActions from '../HOC/withPageActions'
import { Card, Select } from 'antd';
import { Controller, useForm } from "react-hook-form";
import { reporte } from '../../services/reportes';
import ButtonsTooltips from '../components/ButtonsTooltips';
import { objectHasValue } from '../../utils/helpers';
import { pacienteFiltrar } from '../../services/pacientes';

const pageData = {
  title: "Estado de cuentas",
  list: [],
  selected: {},
  deleted: {}
};

const EstadoCuentas = (props) => {
  const { handleSubmit, control } = useForm();
  const { validarPeticion, actualizarEstadoPagina, openNotification,
    usuarioData: { token }, pageData: { list, deleted }, nuevo } = props;
  const [pacientes, setPacientes] = useState([])
  const { Option } = Select;

  const handleSearch = value => {
    if (value.key === 'Enter') {
      validarPeticion(pacienteFiltrar(token, value.target.value),
        (respuesta) => {
          const pacientes = respuesta.datos.map(paciente => {
            return {
              value: paciente.id,
              label: `${paciente.nombres}, ${paciente.apellidos}`
            }
          })
          setPacientes(pacientes)
        })
    } else {
      setPacientes([]);
    }
  };

  const buscar = async (data) => {
    let filtro = {}
    if (objectHasValue(data)) {
      filtro.paciente_id = data.pacientes.map(paciente => paciente.value)
    }
    await reporte(token, filtro, 'estado-cuentas').then(response => {
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
          name='pacientes'
          control={control}
          render={({ field }) => <div className='col-md-6 mb-2'>
            <label className='ant-form-item-label'>Seleccionar pacientes: </label>
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
              {pacientes.map(paciente => <Option key={paciente.value} value={paciente.value}>{paciente.label}</Option>)}
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

export default withPageActions(EstadoCuentas)(pageData)
