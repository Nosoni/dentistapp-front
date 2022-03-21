import React, { useEffect, useState } from 'react'
import withPageActions from '../../HOC/withPageActions'
import { Card, DatePicker, Input, Select, Button, Divider, Table } from 'antd';
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { pacienteFiltrar } from '../../../services/pacientes';
import { validarFecha } from '../../../utils/helpers';
import '../../components/css/datetimepicker.css';
import ButtonsTooltips from '../../components/ButtonsTooltips';
import { condicionesPagoListar } from '../../../services/condiciones_pago';
import FacturaDetalle from './FacturaDetalle';
import { facturaCrear } from '../../../services/facturas';

const FacturaEditar = (props) => {
  const { onClickCancelar, validarPeticion, openNotification,
    usuarioData: { token }, pageData: { selected } } = props
  let factura_seleccionada = selected
  const [paciente, setPaciente] = useState([])
  const [condicionesPago, setCondicionesPago] = useState([])
  const [detValues, setDetValues] = useState([])
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState()
  const existe = !!selected?.id
  let titulo = "Editar factura"
  const shape = {
    paciente: yup.object().required("Favor seleccionar al paciente"),
    fecha: yup.date().required("Favor indicar una fecha"),
    comprobante: yup.string().required("Indica el número de comprobante"),
    condicion_pago_id: yup.number().required("Favor seleccione la condición de pago"),
  }
  if (!existe) {
    titulo = "Crear factura"
  } else {
    factura_seleccionada = {
      ...factura_seleccionada,
      paciente: {
        value: selected.paciente.id,
        label: `${selected.paciente.apellidos}, ${selected.paciente.nombres}`
      },
      fecha: validarFecha(selected.fecha)
    }
  }
  const schema = yup.object(shape)
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: factura_seleccionada,
    resolver: yupResolver(schema),
  });
  const { Option } = Select;

  useEffect(() => {
    getCondicionesPago()
  }, [])

  useEffect(() => {
    if (errors) {
      Object.entries(errors).forEach(([key, value]) => {
        openNotification("error", value.message)
      });
    }
  }, [errors])

  const getCondicionesPago = async () => {
    validarPeticion(condicionesPagoListar(token),
      (respuesta) => {
        const list = respuesta.datos.map(condiciones_pago => {
          return {
            value: condiciones_pago.id,
            label: condiciones_pago.codigo
          }
        })
        setCondicionesPago(list)
      })
  }

  const onSubmit = async data => {
    validarPeticion(facturaCrear(token, { cabecera: { ...data, paciente_id: data.paciente.value }, detalle: detValues }),
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
            render={({ field }) => <div className='col-2'>
              <label className='ant-form-item-label'>Fecha: </label>
              <DatePicker
                placeholder='Fecha factura'
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
          <Controller
            name="condicion_pago_id"
            control={control}
            render={({ field }) => <div className="col-3">
              <label className="ant-form-item-label">Condición de pago: </label>
              <Select
                placeholder='Seleccione la condición'
                notFoundContent="No hay condición de pago para mostrar"
                showArrow={false}
                options={condicionesPago}
                {...field}
              />
            </div>
            }
          />
        </div>
        <Divider type="horizontal" style={{ height: "1px", border: '#b4afaf 1px solid', marginBottom: '0px' }} />
        <div className='row '>
          <FacturaDetalle detalle={selected.factura_detalle}
            disabled={existe}
            pacienteSeleccionado={pacienteSeleccionado}
            agregarValoresDetalle={setDetValues} {...props} />
        </div>
      </Card>
    </div>
  )
}

export default withPageActions(FacturaEditar)(null)
