import React, { useState } from 'react'
import { Card, Table } from 'antd';
import Modal from '../components/Modal'
import { useForm } from "react-hook-form";
import { tratamientoServicioListar, tratamientoServicioFiltrar, tratamientoServicioEliminar } from '../../services/tratamientos_servicios';
import TratamientoServicioEditar from './componentes/TratamientoServicioEditar';
import BotoneraTableAcciones from '../components/BotoneraTableAcciones';
import BuscadorAcciones from '../components/BuscadorAcciones';
import BotoneraModalFooterActions from '../components/BotoneraFooterActions';
import withPageActions from '../HOC/withPageActions';

const pageData = {
  title: "Tratamientos y Servicios",
  list: [],
  selected: {},
  deleted: {}
};

function TratamientosServicios(props) {
  const { register, handleSubmit, reset } = useForm();
  const { validarPeticion, actualizarEstadoPagina,
    usuarioData: { token }, pageData: { list, deleted } } = props;
  const [esEdicion, setEsEdicion] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const acciones = (tratamiento_servicio) => {
    return <BotoneraTableAcciones
      onClickEditar={() => editarTratamientoServicio(true, tratamiento_servicio)}
      onClickEliminar={() => modalTratamientoServicioEliminar(true, tratamiento_servicio)}
    />
  }

  const listarTratamientoServicio = async () => {
    validarPeticion(tratamientoServicioListar(token), (respuesta) => actualizarEstadoPagina({ list: respuesta.datos }))
  }

  const filtrarTratamientoServicio = async (filtro) => {
    validarPeticion(tratamientoServicioFiltrar(token, filtro.filtro), (respuesta) => actualizarEstadoPagina({ list: respuesta.datos }))
  }

  const nuevoTratamientoServicio = () => {
    setEsEdicion(true)
    actualizarEstadoPagina({ selected: {}, deleted: {} })
  }

  const editarTratamientoServicio = (edicion, tratamiento_servicio) => {
    setEsEdicion(edicion)
    actualizarEstadoPagina({ selected: tratamiento_servicio, deleted: {} })
  }

  const modalTratamientoServicioEliminar = (mostrar, tratamiento_servicio) => {
    setShowModal(mostrar)
    actualizarEstadoPagina({ selected: {}, deleted: tratamiento_servicio });
  };

  const eliminarTratamientoServicio = async (tratamiento_servicio) => {
    await validarPeticion(tratamientoServicioEliminar(token, tratamiento_servicio.id), () => modalTratamientoServicioEliminar(false, {}), true)
    handleSubmit(onSubmit)()
  }

  const onSubmit = (filtro) => {
    if (!filtro.filtro) {
      listarTratamientoServicio()
    } else {
      filtrarTratamientoServicio(filtro)
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
                  nuevo={() => nuevoTratamientoServicio()}
                />
              </Card>
            </div>
            <div className='row justify-content-center'>
              <Card title="Resultado" className='col-md-9 col-sm-12 with-shadow'>
                <Table
                  rowKey='id'
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
                onClickCancelar={() => modalTratamientoServicioEliminar(false, {})}
                footer={
                  <BotoneraModalFooterActions
                    onClickCancelar={() => modalTratamientoServicioEliminar(false, {})}
                    onClickAceptar={() => eliminarTratamientoServicio(deleted)}
                    esEliminar
                  />
                }
              >
                <p>
                  ¿Desea eliminar el tratamiento o servicio?
                </p>
              </Modal>
            </div>
          </div>
          :
          <TratamientoServicioEditar onClickCancelar={() => {
            editarTratamientoServicio(false, {})
            reset()
          }} />
      }
    </div >
  )
}

export default withPageActions(TratamientosServicios)(pageData)
