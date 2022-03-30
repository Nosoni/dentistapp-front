import React, { useEffect, useState } from 'react';
import { Card, Table } from 'antd';
import { IPageData } from '../../../interfaces/page';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"
import listGridPlugin from "@fullcalendar/list"
import withPageActions from '../../HOC/withPageActions';
import { citaMedicaFiltrar } from '../../../services/citas_medicas';
import moment from 'moment';
import { pacienteListarPacientes } from '../../../services/pacientes';
import { insumoGetStockBajo } from '../../../services/insumos';

const pageData = {
  title: "Dashboard",
  list: [],
  selected: {},
  deleted: {}
};

const DashboardPage = (props) => {
  const { validarPeticion, actualizarEstadoPagina,
    usuarioData: { token }, pageData: { list } } = props;
  const [eventos, setEventos] = useState([])
  const [cantidadPacientes, setCantidadPacientes] = useState(0)
  const [stockBajo, setStockBajo] = useState(0)

  const colores = {
    Pendiente: { bg: 'event-orange', color: '#e2504c' },
    Confirmado: { bg: 'event-green', color: '#149414' },
    Cancelado: { bg: 'event-error', color: '#ffffff' }
  }

  useEffect(() => {
    cargarEventos()
  }, [list])

  useEffect(() => {
    filtrarCitaMedica()
    obtenerPacientes()
    obtenerStockBajo()
  }, [])

  const cargarEventos = () => {
    const eventos_objecto = list?.map(evento => {
      return {
        title: evento.paciente,
        start: evento.fecha_inicio,
        end: evento.fecha_fin,
        fecha_inicio: evento.fecha_inicio,
        fecha_fin: evento.fecha_fin,
        cita_medica_id: evento.cita_medica_id,
        paciente_id: evento.paciente_id,
        usuario_id: evento.usuario_id,
        estado_actual: evento.estado_actual,
        estado_cita_id: evento.estado_cita_id,
        puede_avanzar: evento.puede_avanzar,
        observacion: evento.observacion,
        classNames: colores[evento.estado_actual]?.bg,
        color: colores[evento.estado_actual]?.color,
      }
    })

    setEventos(eventos_objecto)
  }

  const filtrarCitaMedica = async () => {
    const now = moment()
    const filtro = {
      fecha_inicio: now.clone().weekday(1),
      fecha_fin: now.clone().weekday(6)
    }
    validarPeticion(citaMedicaFiltrar(token, filtro), (respuesta) => {
      actualizarEstadoPagina({ list: respuesta.datos })
    })
  }

  const obtenerPacientes = async () => {
    validarPeticion(pacienteListarPacientes(token), (respuesta) => {
      setCantidadPacientes(respuesta.datos.length)
    })
  }

  const obtenerStockBajo = async () => {
    validarPeticion(insumoGetStockBajo(token), (respuesta) => {
      setStockBajo(respuesta.datos)
    })
  }

  return (
    <>
      <div className='row'>
        <div className='col-8'>
          <Card title="Citas"
            className='col-md-12 col-sm-6 with-shadow'
            style={{ height: '500px' }}
            bodyStyle={{ maxHeight: '450px', overflow: 'auto' }}>
            <FullCalendar
              headerToolbar={{
                left: '',
                center: 'title',
                right: 'timeGridWeek,timeGridDay'
              }}
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listGridPlugin]}
              initialView="timeGridWeek"
              events={eventos}
              buttonText={{
                week: 'Semana',
                day: 'Día',
              }}
              titleFormat={{
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              }}
              locale='es'
              allDaySlot={false}
              slotMinTime='09:00'
              slotMaxTime='21:00'
              expandRows={true}
              hiddenDays={[0]}
            />
          </Card>
        </div>
        <div className='col-4'>
          <div className='row'>
            <div className='col-6'>
              <Card style={{ background: 'rgba(251, 251, 251)' }} className='animated with-shadow'>
                <div className='row'>
                  <div className='col-5'>
                    <span
                      className='icofont icofont-first-aid-alt'
                      style={{ fontSize: 48, color: 'rgba(51, 108, 251, 0.5)' }}
                    />
                  </div>
                  <div className='col-7'>
                    <h6 className='mt-0 mb-1' style={{ fontSize: '12px' }}>Citas de la semana</h6>
                    <div className='count' style={{ fontSize: 20, color: '#336cfb', lineHeight: 1.4 }}>
                      {list.length}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div className='col-6'>
              <Card style={{ background: 'rgba(251, 251, 251)' }} className='animated with-shadow'>
                <div className='row'>
                  <div className='col-5'>
                    <span
                      className='icofont icofont-wheelchair'
                      style={{ fontSize: 48, color: 'rgba(51, 108, 251, 0.5)' }}
                    />
                  </div>

                  <div className='col-7'>
                    <h6 className='mt-0 mb-1'>Total pacientes</h6>
                    <div className='count' style={{ fontSize: 20, color: '#336cfb', lineHeight: 1.4 }}>
                      {cantidadPacientes}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          <div className='row'>
            <Card title="Insumos con bajo stock"
              className='col-md-12 col-sm-6 with-shadow'
              style={{ height: '370px' }}
              bodyStyle={{ maxHeight: '450px', overflow: 'auto' }}>
              <Table
                rowKey='insumo_id'
                dataSource={stockBajo}
                columns={[{
                  key: 'insumo',
                  dataIndex: 'insumo',
                  title: 'Insimo'
                }, {
                  key: 'cantidad_minima',
                  dataIndex: 'cantidad_minima',
                  title: 'Cantidad mínima'
                }, {
                  key: 'stock_actual',
                  dataIndex: 'stock_actual',
                  title: 'Stock actual',
                }]}
                pagination={{ pageSize: 5 }}
                locale={{ emptyText: 'Sin registros' }}
              />
            </Card>
          </div>
        </div>
      </div >
    </>
  );
};

export default withPageActions(DashboardPage)(pageData);
