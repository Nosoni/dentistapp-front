import React, { useState } from 'react'
import { Card, Table } from 'antd';
import Modal from '../components/Modal'
import { useForm } from "react-hook-form";
import { insumoListar, insumoFiltrar, insumoEliminar } from '../../services/insumos';
import InsumoEditar from './componentes/InsumoEditar';
import BotoneraTableAcciones from '../components/BotoneraTableAcciones';
import BuscadorAcciones from '../components/BuscadorAcciones';
import BotoneraModalFooterActions from '../components/BotoneraFooterActions';
import withPageActions from '../HOC/withPageActions';

const pageData = {
  title: "Insumos",
  list: [],
  selected: {},
  deleted: {}
};

function Insumos(props) {
  const { register, handleSubmit, reset } = useForm();
  const { validarPeticion, actualizarEstadoPagina,
    usuarioData: { token }, pageData: { list, deleted } } = props;
  const [esEdicion, setEsEdicion] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const acciones = (insumo) => {
    return <BotoneraTableAcciones
      onClickEditar={() => editarInsumo(true, insumo)}
      onClickEliminar={() => modalInsumoEliminar(true, insumo)}
    />
  }

  const listarInsumo = async () => {
    validarPeticion(insumoListar(token), (respuesta) => actualizarEstadoPagina({ list: respuesta.datos }))
  }

  const filtrarInsumo = async (filtro) => {
    validarPeticion(insumoFiltrar(token, filtro.filtro), (respuesta) => actualizarEstadoPagina({ list: respuesta.datos }))
  }

  const nuevoInsumo = () => {
    setEsEdicion(true)
    actualizarEstadoPagina({ selected: {}, deleted: {} })
  }

  const editarInsumo = (edicion, insumo) => {
    setEsEdicion(edicion)
    actualizarEstadoPagina({ selected: insumo, deleted: {} })
  }

  const modalInsumoEliminar = (mostrar, insumo) => {
    setShowModal(mostrar)
    actualizarEstadoPagina({ selected: {}, deleted: insumo });
  };

  const eliminarInsumo = async (insumo) => {
    await validarPeticion(insumoEliminar(token, insumo.id), () => modalInsumoEliminar(false, {}), true)
    handleSubmit(onSubmit)()
  }

  const onSubmit = (filtro) => {
    if (!filtro.filtro) {
      listarInsumo()
    } else {
      filtrarInsumo(filtro)
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
                  nuevo={() => nuevoInsumo()}
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
                onClickCancelar={() => modalInsumoEliminar(false, {})}
                footer={
                  <BotoneraModalFooterActions
                    onClickCancelar={() => modalInsumoEliminar(false, {})}
                    onClickAceptar={() => eliminarInsumo(deleted)}
                    esEliminar
                  />
                }
              >
                <p>
                  ¿Desea eliminar el insumo?
                </p>
              </Modal>
            </div>
          </div>
          :
          <InsumoEditar onClickCancelar={() => {
            editarInsumo(false, {})
            reset()
          }} />
      }
    </div >
  )
}

export default withPageActions(Insumos)(pageData)
