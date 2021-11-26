import React, { useEffect, useState } from 'react'
import withPageActions from '../../HOC/withPageActions'
import { Card, DatePicker, Input, Select, Button, Divider, Table } from 'antd';
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { pacienteCrear, pacienteEditar, pacienteFiltrar } from '../../../services/pacientes';
import { validarFecha } from '../../../utils/helpers';
import '../../components/css/datetimepicker.css';
import { estadoMovimientoFiltrar } from '../../../services/estados_movimientos';
import ButtonsTooltips from '../../components/ButtonsTooltips';

const FacturaEditar = (props) => {
  const { onClickCancelar, validarPeticion, openNotification,
    usuarioData: { token }, pageData: { selected } } = props
  selected.fecha_nacimiento = validarFecha(selected.fecha_nacimiento)
  const [estados, setEstados] = useState([])
  const [pacientes, setPacientes] = useState([])
  const existe = !!selected?.id
  let titulo = "Editar factura"
  const shape = {
    documento: yup.string().required("Favor introduzca el documento"),
    tipo_documento_id: yup.string().required("Favor seleccione el tipo documento"),
    nombres: yup.string().required("Favor introduzca el nombre"),
    apellidos: yup.string().required("Favor introduzca el apellido"),
  }
  if (!existe) {
    titulo = "Crear factura"
  }
  const schema = yup.object(shape)
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: selected,
    resolver: yupResolver(schema),
  });
  const { Option } = Select;

  useEffect(() => {
    if (existe) {
      getEstados(selected.extendedProps?.estado_factura_id)
    }
  }, [selected])

  useEffect(() => {
    if (errors) {
      Object.entries(errors).forEach(([key, value]) => {
        openNotification("error", value.message)
      });
    }
  }, [errors])

  const getEstados = async (estado_factura_id) => {
    validarPeticion(estadoMovimientoFiltrar(token, { tabla_id: 'facturas', estado_anterior_id: estado_factura_id }),
      (respuesta) => {
        const list = respuesta.datos.map(estado_movimiento => {
          return {
            value: estado_movimiento.id,
            label: estado_movimiento.estado_actual
          }
        })
        setEstados(list)
      })
  }

  const onSubmit = async paciente => {
    if (existe)
      validarPeticion(pacienteEditar(token, paciente), () => { }, true)
    else
      validarPeticion(pacienteCrear(token, paciente), () => { }, true)
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
          setPacientes(pacientes)
        })
    } else {
      setPacientes([]);
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
          tooltipsTitle="Guardar">
          <span className='icofont icofont-save' />
        </ButtonsTooltips>
        {
          !existe &&
          <Select
            className='mb-lg-0 col-4'
            style={{ marginTop: '-10px' }}
            showArrow={false}
            placeholder='Cambiar estado'
            options={estados}
            notFoundContent="No hay estados"
          />
        }
        <ButtonsTooltips
          shape='round'
          className="bg-color-info"
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
            name='paciente_id'
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
                {...field}
              >
                {pacientes.map(paciente =>
                  <Option
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
                {...field}
              />
            </div>
            }
          />
        </div>
        <Divider type="horizontal" style={{ height: "1px", border: '#b4afaf 1px solid' }} />
        <div className='row mb-2'>
          <Table pagination={false} columns={[]} dataSource={[]} size='middle' />
        </div>
      </Card>
    </div>
  )
}

export default withPageActions(FacturaEditar)(null)
