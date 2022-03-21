import React, { useEffect, useState } from 'react'
import { Card, DatePicker, Input, Select, Divider } from 'antd';
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { pacienteFiltrar } from '../../../services/pacientes';
import { validarFecha } from '../../../utils/helpers';
import '../../components/css/datetimepicker.css';
import ButtonsTooltips from '../../components/ButtonsTooltips';
import CobranzaDetalle from './CobranzaDetalle';
import { cobranzaCrear } from '../../../services/cobranzas';

const CobranzaEditar = (props) => {
  const { onClickCancelar, validarPeticion, openNotification,
    usuarioData: { token }, pageData: { selected } } = props
  let cobranza_seleccionada = selected
  const [paciente, setPaciente] = useState([])
  const [detValues, setDetValues] = useState([])
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState()
  const existe = !!selected?.id
  let titulo = "Editar cobranza"
  const shape = {
    paciente: yup.object().required("Favor seleccionar al paciente"),
    fecha: yup.date().required("Favor indicar una fecha"),
    comprobante: yup.string().required("Indica el número de comprobante"),
  }
  if (!existe) {
    titulo = "Crear cobranza"
  } else {
    cobranza_seleccionada = {
      ...cobranza_seleccionada,
      paciente: {
        value: selected.paciente.id,
        label: `${selected.paciente.apellidos}, ${selected.paciente.nombres}`
      },
      fecha: validarFecha(selected.fecha)
    }
  }
  const schema = yup.object(shape)
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: cobranza_seleccionada,
    resolver: yupResolver(schema),
  });
  const { Option } = Select;

  useEffect(() => {
    if (errors) {
      Object.entries(errors).forEach(([key, value]) => {
        openNotification("error", value.message)
      });
    }
  }, [errors])

  const onSubmit = async data => {
    validarPeticion(cobranzaCrear(token, {
      cabecera: {
        ...data,
        paciente_id: data.paciente.value
      },
      detalle: detValues
    }),
      () => { }, true)
  }

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
          setPaciente(pacientes)
        })
    } else {
      setPaciente([]);
    }
  };

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
            name='paciente'
            control={control}
            render={({ field }) => <div className='col-4'>
              <label className='ant-form-item-label'>Seleccionar paciente: </label>
              <Select
                placeholder='Seleccione un paciente'
                optionFilterProp='children'
                allowClear
                showSearch
                showArrow
                labelInValue
                onInputKeyDown={handleSearch}
                notFoundContent="No hay pacientes para mostrar"
                onSelect={(paciente) => {
                  setPacienteSeleccionado(paciente.value)
                }}
                {...field}
              >
                {paciente.map(paciente =>
                  <Option
                    key={paciente.value}
                    value={paciente.value}>
                    {paciente.label}
                  </Option>)}
              </Select>
            </div>
            }
          />
          <Controller
            name='fecha'
            control={control}
            render={({ field }) => <div className='col-3'>
              <label className='ant-form-item-label'>Fecha: </label>
              <DatePicker
                placeholder='Fecha cobranza'
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
            render={({ field }) => <div className="col-3">
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
          <CobranzaDetalle detalle={selected.cobranza_detalle}
            disabled={existe}
            pacienteSeleccionado={pacienteSeleccionado}
            agregarValoresDetalle={setDetValues}
            {...props} />
        </div>
      </Card>
    </div>
  )
}

export default CobranzaEditar
