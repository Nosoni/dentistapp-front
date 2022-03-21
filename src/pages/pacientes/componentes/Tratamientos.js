import React, { useState } from 'react'
import { Row, Col, Card, Select, Table, Timeline } from 'antd';
import BotoneraFooterActions from '../../components/BotoneraFooterActions';
import { useForm, Controller } from "react-hook-form";
import { tratamientoServicioFiltrar } from '../../../services/tratamientos_servicios';
import ButtonsTooltips from '../../components/ButtonsTooltips';
import { PlusOutlined, QuestionOutlined } from '@ant-design/icons';
import { historialIcons } from '../../../constantes/index'

const columns = [{
  key: 'tratamiento',
  dataIndex: 'tratamiento',
  title: 'Tratamiento',
}, {
  key: 'diente',
  dataIndex: 'diente',
  title: 'Diente',
}, {
  key: 'precio',
  dataIndex: 'precio',
  title: 'Precio',
},]

const Tratamientos = ({ onSubmit, ...props }) => {
  const { onClickCancelar, validarPeticion,
    pageData: { selected }, usuarioData: { token } } = props
  const { dientes } = selected
  const { historial } = selected
  const { control, handleSubmit, reset } = useForm({});
  const [tratamientosServicios, setTratamientosServicios] = useState([])
  const [list, setList] = useState([])
  const [valores, setValores] = useState([])
  const { Option } = Select

  const handleSearch = value => {
    if (value.key === 'Enter') {
      validarPeticion(tratamientoServicioFiltrar(token, value.target.value),
        (respuesta) => {
          const tratamientos_servicios = respuesta.datos.map(tratServ => {
            return {
              value: tratServ.id,
              label: `${tratServ.nombre}`,
              precio: tratServ.precio
            }
          })
          setTratamientosServicios(tratamientos_servicios)
        })
    } else {
      setTratamientosServicios([]);
    }
  };

  const agregarValores = (data) => {
    const new_value = {
      tratamiento_servicio_id: data.tratamiento_servicio.value[0],
      paciente_id: selected.id,
      paciente_diente_id: data.paciente_diente?.value
    }

    const new_list = {
      tratamiento_servicio_id: data.tratamiento_servicio.value[0],
      tratamiento: data.tratamiento_servicio.label,
      diente: data.paciente_diente?.label,
      precio: data.tratamiento_servicio.value[1]
    }


    setValores([...valores, new_value])
    setList([...list, new_list])
  }

  const retornarIcono = (hist) => {
    const icono = historialIcons.find(icons => hist.tratamiento_servicio_id === icons.id)
    if (icono) {
      return icono.icons
    } else {
      return <div className='timeline-head bg-color-yellow'>
        <QuestionOutlined className='text-contrast-500' />
      </div>
    }
  }

  const renderHistorial = () => {
    return <Timeline className='ml-4'>
      {
        historial ?
          historial.map(hist => {
            return <Timeline.Item key={hist.id}
              dot={
                retornarIcono(hist)
              }
            >
              <div className='d-flex flex-column'>
                <span className='text-lg'>{hist.tratamiento_servicio.nombre}</span>
                <span className='text-base'>
                  {hist.tratamiento_servicio.descripcion}
                </span>
              </div>
            </Timeline.Item>
          })
          :
          null
      }
    </Timeline >
  }

  return <>
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col className="gutter-row" span={12}>
        <Card title='Asignar tratamientos'>
          <div className='row mb-2'>
            <Controller
              name='tratamiento_servicio'
              control={control}
              render={({ field }) => <div className='col-8'>
                <label className='ant-form-item-label'>Tratamiento o servicio: </label>
                <Select
                  placeholder='Buscar tratamiento o servicio'
                  optionFilterProp='children'
                  allowClear
                  showSearch
                  showArrow
                  labelInValue
                  onInputKeyDown={handleSearch}
                  notFoundContent="No hay tratamientos o servicios para mostrar"
                  {...field}
                >
                  {
                    tratamientosServicios.map(tratServ => {
                      return <Option
                        key={tratServ.value}
                        value={[tratServ.value, tratServ.precio]}>
                        {tratServ.label}
                      </Option>
                    })
                  }
                </Select>
              </div>
              }
            />
            <Controller
              name='paciente_diente'
              control={control}
              render={({ field }) => <div className='col-3'>
                <label className='ant-form-item-label'>Diente: </label>
                <Select
                  placeholder='Diente'
                  optionFilterProp='children'
                  allowClear
                  showSearch
                  showArrow
                  labelInValue
                  notFoundContent="No hay tratamientos o servicios para mostrar"
                  {...field}
                >
                  {
                    dientes.map(diente =>
                      <Option
                        key={diente.id}
                        value={diente.id}>
                        {diente.diente.codigo}
                      </Option>
                    )
                  }
                </Select>
              </div>
              }
            />
            <div className='col-1'>
              <label className='ant-form-item-label'></label>
              <ButtonsTooltips
                onClick={() => {
                  handleSubmit(agregarValores)()
                  reset()
                }}
                className='bg-color-success'
                tooltipsTitle="Agregar"
                shape='circle'
                type='reset'
                icon={<PlusOutlined />} />
            </div>
          </div>
          <div className='row mt-4 '>
            <Table className='col-12'
              rowKey='tratamiento_servicio_id'
              pagination={false}
              columns={columns}
              dataSource={list}
              locale={{ emptyText: 'Sin detalles' }}
            />
          </div>
        </Card>
      </Col>
      <Col className="gutter-row" span={12}>
        <Card title='Historial'
          style={{ maxHeight: '350px' }}
          bodyStyle={{ maxHeight: '300px', overflow: 'auto' }}>
          {renderHistorial()}
          {/* <OurTimeline></OurTimeline> */}
        </Card>
      </Col>
    </Row>
    <BotoneraFooterActions
      onClickCancelar={onClickCancelar}
      onClickAceptar={() => onSubmit({ ...selected, tratamientos: valores })}
    />
  </>
}

export default Tratamientos


