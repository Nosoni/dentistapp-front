import React, { useState } from 'react'
import { Card, Table } from 'antd';
import Modal from '../components/Modal'
import { useForm } from "react-hook-form";
import { productoServicioListar, productoServicioFiltrar, productoServicioEliminar } from '../../services/productos_servicios';
import ProductoServicioEditar from './componentes/ProductoServicioEditar';
import BotoneraTableAcciones from '../components/BotoneraTableAcciones';
import BuscadorAcciones from '../components/BuscadorAcciones';
import BotoneraModalFooterActions from '../components/BotoneraFooterActions';
import withPageActions from '../HOC/withPageActions';

const pageData = {
  title: "Productos y Servicios",
  list: [],
  selected: {},
  deleted: {}
};

function ProductosServicios(props) {
  const { register, handleSubmit, reset } = useForm();
  const { validarPeticion, actualizarEstadoPagina,
    usuarioData: { token }, pageData: { list, deleted } } = props;
  const [esEdicion, setEsEdicion] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const acciones = (producto_servicio) => {
    return <BotoneraTableAcciones
      onClickEditar={() => editarProductosServicio(true, producto_servicio)}
      onClickEliminar={() => modalproductoServicioEliminar(true, producto_servicio)}
    />
  }

  const listarProductosServicio = async () => {
    validarPeticion(productoServicioListar(token), (respuesta) => actualizarEstadoPagina({ list: respuesta.datos }))
  }

  const filtrarProductosServicio = async (filtro) => {
    validarPeticion(productoServicioFiltrar(token, filtro.filtro), (respuesta) => actualizarEstadoPagina({ list: respuesta.datos }))
  }

  const nuevoProductosServicio = () => {
    setEsEdicion(true)
    actualizarEstadoPagina({ selected: {}, deleted: {} })
  }

  const editarProductosServicio = (edicion, producto_servicio) => {
    setEsEdicion(edicion)
    actualizarEstadoPagina({ selected: producto_servicio, deleted: {} })
  }

  const modalproductoServicioEliminar = (mostrar, producto_servicio) => {
    setShowModal(mostrar)
    actualizarEstadoPagina({ selected: {}, deleted: producto_servicio });
  };

  const eliminarProductosServicio = async (producto_servicio) => {
    await validarPeticion(productoServicioEliminar(token, producto_servicio.id), () => modalproductoServicioEliminar(false, {}), true)
    handleSubmit(onSubmit)()
  }

  const onSubmit = (filtro) => {
    if (!filtro.filtro) {
      listarProductosServicio()
    } else {
      filtrarProductosServicio(filtro)
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
                  nuevo={() => nuevoProductosServicio()}
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
                onClickCancelar={() => modalproductoServicioEliminar(false, {})}
                footer={
                  <BotoneraModalFooterActions
                    onClickCancelar={() => modalproductoServicioEliminar(false, {})}
                    onClickAceptar={() => eliminarProductosServicio(deleted)}
                    esEliminar
                  />
                }
              >
                <p>
                  ¿Desea eliminar el producto o servicio?
                </p>
              </Modal>
            </div>
          </div>
          :
          <ProductoServicioEditar onClickCancelar={() => {
            editarProductosServicio(false, {})
            reset()
          }} />
      }
    </div >
  )
}

export default withPageActions(ProductosServicios)(pageData)
