import React, { useEffect, useState } from 'react'
import { Controller, useForm } from "react-hook-form";
import { DatePicker, Select, Button } from 'antd';
import withPageActions from '../../HOC/withPageActions';
import { objectHasValue } from '../../../utils/helpers';
import { pacienteFiltrar } from '../../../services/pacientes';
import '../../components/css/datetimepicker.css';
import { facturaFiltrar } from '../../../services/facturas';
import ButtonsTooltips from '../../components/ButtonsTooltips';
import { reporte } from '../../../services/reportes';

const FacturaBuscador = (props) => {
  const { validarPeticion, actualizarEstadoPagina, openNotification,
    usuarioData: { token }, pageData: { list, deleted }, nuevo } = props;
  const { handleSubmit, reset, control } = useForm();
  const [pacientes, setPacientes] = useState([])
  const { Option } = Select;

  const filtrarFactura = async (filtro) => {
    validarPeticion(facturaFiltrar(token, filtro), (respuesta) => {
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
      filtrarFactura(filtro)
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

  const prueba = async (filtro) => {
    await reporte(token, filtro).then(response => {
      const file = new Blob([response.data], {
        type: "application/pdf"
      });
      //Build a URL from the file
      const fileURL = URL.createObjectURL(file);
      //Open the URL on new Window
      window.open(fileURL);
    })
  }


  return <>
    <div className='row'>
      <Controller
        name='pacientes'
        control={control}
        render={({ field }) => <div className='col-md-4 mb-2'>
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
        render={({ field }) => <div className='col-md-4 mb-2'>
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
        render={({ field }) => <div className='col-md-4 mb-2'>
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
    <div className='row float-right mt-2'>
      {/* <ButtonsTooltips
        onClick={handleSubmit(prueba)}
        shape='circle'
        className="bg-color-error mr-2"
        tooltipsTitle="Imprimir">
        <span className='icofont icofont-printer' />
      </ButtonsTooltips> */}
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

export default withPageActions(FacturaBuscador)(null)
