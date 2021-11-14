import React, { useEffect, useState } from 'react'
import Modal from '../../components/Modal'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"
import listGridPlugin from "@fullcalendar/list"
import withPageActions from '../../HOC/withPageActions'
import CitaMedicaEditar from './CitaMedicaEditar';

const CitasMedicaView = (props) => {
  const { actualizarEstadoPagina, pageData: { list } } = props
  const [eventos, setEventos] = useState([])
  const [showModal, setShowModal] = useState(false)
  const colores = {
    Pendiente: { bg: 'event-orange', color: '#e2504c' },
    Confirmado: { bg: 'event-green', color: '#149414' },
    Cancelado: { bg: 'event-error', color: '#ffffff' }
  }

  useEffect(() => {
    cargarEventos()
  }, [list])

  const cargarEventos = () => {
    const eventos_objecto = list.map(evento => {
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
        estado_id: evento.estado_actual_id,
        observacion: evento.observacion,
        classNames: colores[evento.estado_actual].bg,
        color: colores[evento.estado_actual].color,
      }
    })

    setEventos(eventos_objecto)
  }

  const handleEventClick = ({ event }) => {
    actualizarEstadoPagina({ selected: event })
    setShowModal(true)
  }

  const modalCancel = () => {
    setShowModal(false)
    actualizarEstadoPagina({ selected: {} })
  }

  return (
    <div>
      <FullCalendar
        headerToolbar={{
          left: 'nuevo prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
        }}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listGridPlugin]}
        initialView="timeGridWeek"
        events={eventos}
        buttonText={{
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          day: 'Día',
          list: 'Lista'
        }}
        titleFormat={{
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }}
        customButtons={{
          nuevo: {
            text: 'Agregar nueva cita',
            click() {
              alert('click')
            }
          }
        }}
        locale='es'
        allDaySlot={false}
        hiddenDays={[0]}
        dateClick={() => alert("ok")}
        eventClick={handleEventClick}
      />
      {showModal &&
        <div className='row justify-content-center'>
          <Modal
            visible={showModal}
            onClickCancelar={() => modalCancel()}
            footer={null}
          >
            <CitaMedicaEditar onClickCancelar={() => modalCancel()} />
          </Modal>
        </div>
      }
    </div>

  )
}

export default withPageActions(CitasMedicaView)(null)
