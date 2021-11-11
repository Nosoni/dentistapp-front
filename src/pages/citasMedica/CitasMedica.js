import React, { useState } from 'react'
import { Card, DatePicker, Table } from 'antd';
import Modal from '../components/Modal'
import { Controller, useForm } from "react-hook-form";
import { citaMedicaListar, citaMedicaFiltrar, citaMedicaEliminar } from '../../services/citas_medicas';
import CitaMedicaEditar from './componentes/CitaMedicaEditar';
import BotoneraTableAcciones from '../components/BotoneraTableAcciones';
import BuscadorAcciones from '../components/BuscadorAcciones';
import BotoneraModalFooterActions from '../components/BotoneraFooterActions';
import withPageActions from '../HOC/withPageActions';
import '../components/css/datetimepicker.css';

const pageData = {
  title: "Citas médicas",
  list: [],
  selected: {},
  deleted: {}
};

const objectHasValue = (obj) => {
  return Object.values(obj).some(prop => prop != undefined)
}

function CitasMedica(props) {
  const { register, handleSubmit, reset, control } = useForm();
  const { validarPeticion, actualizarEstadoPagina,
    usuarioData: { token }, pageData: { list, deleted } } = props;
  const [esEdicion, setEsEdicion] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const acciones = (cita_medica) => {
    return <BotoneraTableAcciones
      onClickEditar={() => editarCitaMedica(true, cita_medica)}
      onClickEliminar={() => modalCitaMedicaEliminar(true, cita_medica)}
    />
  }

  const listarCitaMedica = async () => {
    validarPeticion(citaMedicaListar(token), (respuesta) => actualizarEstadoPagina({ list: respuesta.datos }))
  }

  const filtrarCitaMedica = async (filtro) => {
    validarPeticion(citaMedicaFiltrar(token, filtro), (respuesta) => actualizarEstadoPagina({ list: respuesta.datos }))
  }

  const nuevaCitaMedica = () => {
    setEsEdicion(true)
    actualizarEstadoPagina({ selected: {}, deleted: {} })
  }

  const editarCitaMedica = (edicion, cita_medica) => {
    setEsEdicion(edicion)
    actualizarEstadoPagina({ selected: cita_medica, deleted: {} })
  }

  const modalCitaMedicaEliminar = (mostrar, cita_medica) => {
    setShowModal(mostrar)
    actualizarEstadoPagina({ selected: {}, deleted: cita_medica });
  };

  const eliminarCitaMedica = async (cita_medica) => {
    await validarPeticion(citaMedicaEliminar(token, cita_medica.id), () => modalCitaMedicaEliminar(false, {}), true)
    handleSubmit(onSubmit)()
  }

  const onSubmit = (filtro) => {
    if (!objectHasValue(filtro)) {
      listarCitaMedica()
    } else {
      filtrarCitaMedica(filtro)
    }
  };

  return (
    <div >
      {
        !esEdicion ?
          <div>
            <div className='row justify-content-center'>
              <Card title='Buscar' className='col-md-9 col-sm-12 with-shadow'>
                <BuscadorAcciones
                  registro={register("filtro")}
                  buscar={handleSubmit(onSubmit)}
                  nuevo={() => nuevaCitaMedica()}
                >
                  <Controller
                    name='fecha_inicio'
                    control={control}
                    render={({ field }) =>
                      <DatePicker
                        placeholder='Desde'
                        format='DD/MM/YYYY'
                        className='mr-2'
                        {...field}
                      />
                    }
                  />
                  <Controller
                    name='fecha_fin'
                    control={control}
                    render={({ field }) =>
                      <DatePicker
                        placeholder='Hasta'
                        format='DD/MM/YYYY'
                        className='mr-2'
                        {...field}
                      />
                    }
                  />
                </BuscadorAcciones>
              </Card></div>
            <div className='row justify-content-center'>
              <Card title="Resultado" className='col-md-9 col-sm-12 with-shadow'>
                <Table
                  rowKey='cita_medica_id'
                  dataSource={list}
                  columns={[{
                    key: 'nombre',
                    dataIndex: 'nombre',
                    title: 'Nombre',
                    render: (nombre) => {
                      return <strong>{nombre}</strong>
                    }
                  }, {
                    key: 'descripcion',
                    dataIndex: 'descripcion',
                    title: 'Descripción',
                  }, {
                    key: 'actiones',
                    title: 'Acciones',
                    render: acciones,
                  },]}
                  pagination={{ pageSize: 5 }}
                  locale={{ emptyText: 'Sin registros' }}
                />
              </Card>
              <Modal
                visible={showModal}
                title='ATENCIÓN'
                onClickCancelar={() => modalCitaMedicaEliminar(false, {})}
                footer={
                  <BotoneraModalFooterActions
                    onClickCancelar={() => modalCitaMedicaEliminar(false, {})}
                    onClickAceptar={() => eliminarCitaMedica(deleted)}
                    esEliminar
                  />
                }
              >
                <p>
                  ¿Desea eliminar la cita médica?
                </p>
              </Modal>
            </div>
          </div>
          :
          <CitaMedicaEditar onClickCancelar={() => {
            editarCitaMedica(false, {})
            reset()
          }} />
      }
    </div >
  )
}

export default withPageActions(CitasMedica)(pageData)
