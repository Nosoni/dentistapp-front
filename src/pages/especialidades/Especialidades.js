import React, { useState } from 'react'
import { Card, Table } from 'antd';
import Modal from '../components/Modal'
import { useForm } from "react-hook-form";
import { especialidadListar, especialidadFiltrar, especialidadEliminar } from '../../services/especialidades';
import EspecialidadEditar from './componentes/EspecialidadEditar';
import BotoneraTableAcciones from '../components/BotoneraTableAcciones';
import BuscadorAcciones from '../components/BuscadorAcciones';
import BotoneraModalFooterActions from '../components/BotoneraFooterActions';
import withPageActions from '../HOC/withPageActions';

const pageData = {
  title: "Especialidades",
  list: [],
  selected: {},
  deleted: {}
};

function Especialidades(props) {
  const { register, handleSubmit, reset } = useForm();
  const { validarPeticion, actualizarEstadoPagina,
    usuarioData: { token }, pageData: { list, deleted } } = props;
  const [esEdicion, setEsEdicion] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const acciones = (especialidad) => {
    return <BotoneraTableAcciones
      onClickEditar={() => editarEspecialidad(true, especialidad)}
      onClickEliminar={() => modalEspecialidadEliminar(true, especialidad)}
    />
  }

  const listarEspecialidad = async () => {
    validarPeticion(especialidadListar(token), (respuesta) => actualizarEstadoPagina({ list: respuesta.datos }))
  }

  const filtrarEspecialidad = async (filtro) => {
    validarPeticion(especialidadFiltrar(token, filtro.filtro), (respuesta) => actualizarEstadoPagina({ list: respuesta.datos }))
  }

  const nuevaEspecialidad = () => {
    setEsEdicion(true)
    actualizarEstadoPagina({ selected: {}, deleted: {} })
  }

  const editarEspecialidad = (edicion, especialidad) => {
    setEsEdicion(edicion)
    actualizarEstadoPagina({ selected: especialidad, deleted: {} })
  }

  const modalEspecialidadEliminar = (mostrar, especialidad) => {
    setShowModal(mostrar)
    actualizarEstadoPagina({ selected: {}, deleted: especialidad });
  };

  const eliminarEspecialidad = async (especialidad) => {
    await validarPeticion(especialidadEliminar(token, especialidad.id), () => modalEspecialidadEliminar(false, {}), true)
    handleSubmit(onSubmit)()
  }

  const onSubmit = (filtro) => {
    if (!filtro.filtro) {
      listarEspecialidad()
    } else {
      filtrarEspecialidad(filtro)
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
                  nuevo={() => nuevaEspecialidad()}
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
                onClickCancelar={() => modalEspecialidadEliminar(false, {})}
                footer={
                  <BotoneraModalFooterActions
                    onClickCancelar={() => modalEspecialidadEliminar(false, {})}
                    onClickAceptar={() => eliminarEspecialidad(deleted)}
                    esEliminar
                  />
                }
              >
                <p>
                  ¿Desea eliminar la especialidad?
                </p>
              </Modal>
            </div>
          </div>
          :
          <EspecialidadEditar onClickCancelar={() => {
            editarEspecialidad(false, {})
            reset()
          }} />
      }
    </div >
  )
}

export default withPageActions(Especialidades)(pageData)
