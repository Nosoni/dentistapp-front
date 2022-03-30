import React, { useState } from 'react'
import { Card, Table } from 'antd';
import { useForm } from "react-hook-form";
import { clienteEliminar, clienteFiltrar, clienteListar } from '../../services/clientes';
import withPageActions from '../HOC/withPageActions';
import ClienteEditar from './componentes/ClienteEditar';
import BotoneraTableAcciones from '../components/BotoneraTableAcciones';
import BotoneraModalFooterActions from '../components/BotoneraFooterActions';
import ModalDA from '../components/Modal';
import BuscadorAcciones from '../components/BuscadorAcciones';
import ButtonsTooltips from '../components/ButtonsTooltips';
import { reporte } from '../../services/reportes';

const pageData = {
  title: "Clientes",
  list: [],
  selected: {},
  deleted: {}
};

const Clientes = (props) => {
  const { register, handleSubmit, reset } = useForm();
  const { validarPeticion, actualizarEstadoPagina,
    usuarioData: { token }, pageData: { list, deleted } } = props
  const [esEdicion, setEsEdicion] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const acciones = (cliente) => {
    return <BotoneraTableAcciones
      onClickEditar={() => editarcliente(true, cliente)}
      onClickEliminar={() => modalclienteEliminar(true, cliente)}
    />
  }

  const listarcliente = async () => {
    validarPeticion(clienteListar(token), (respuesta) => {
      actualizarEstadoPagina({ list: respuesta.datos })
    })
  }

  const filtrarcliente = async (filtro) => {
    validarPeticion(clienteFiltrar(token, filtro.cliente), (respuesta) => actualizarEstadoPagina({ list: respuesta.datos }))
  }

  const nuevocliente = () => {
    setEsEdicion(true)
    actualizarEstadoPagina({ selected: {}, deleted: {} })
  }

  const editarcliente = (edicion, cliente) => {
    setEsEdicion(edicion)
    actualizarEstadoPagina({ selected: cliente, deleted: {} })
  }

  const modalclienteEliminar = (mostrar, cliente) => {
    setShowModal(mostrar)
    actualizarEstadoPagina({ selected: {}, deleted: cliente });
  };

  const eliminarcliente = async (cliente) => {
    await validarPeticion(clienteEliminar(token, cliente.id), () => modalclienteEliminar(false, {}), true)
    handleSubmit(onSubmit)()
  }

  const onSubmit = (filtro) => {
    if (!filtro.cliente) {
      listarcliente()
    } else {
      filtrarcliente(filtro)
    }
  };

  const buscar = async (filtro) => {
    await reporte(token, filtro, 'clientes').then(response => {
      const file = new Blob([response.data], {
        type: "application/pdf"
      });
      //Build a URL from the file
      const fileURL = URL.createObjectURL(file);
      //Open the URL on new Window
      window.open(fileURL);
    })
  }

  return <>
    {
      !esEdicion ?
        <>
          <div className='row justify-content-center'>
            <Card title='Buscar' className='col-md-9 col-sm-12 with-shadow'>
              <BuscadorAcciones
                placeholder="Introduzca información del cliente"
                registro={register("cliente")}
                buscar={handleSubmit(onSubmit)}
                nuevo={() => nuevocliente()}
              >
                <ButtonsTooltips
                  onClick={handleSubmit(buscar)}
                  shape='circle'
                  className="bg-color-error mr-2"
                  tooltipsTitle="Imprimir">
                  <span className='icofont icofont-printer' />
                </ButtonsTooltips>
              </BuscadorAcciones>
            </Card>
          </div>
          <div className='row justify-content-center'>
            <Card title="Resultado" className='col-md-9 col-sm-12 with-shadow'>
              <Table
                rowKey='id'
                dataSource={list}
                columns={[{
                  key: 'documento',
                  dataIndex: 'documento',
                  title: 'Documento',
                  render: (documento) => <strong>{documento}</strong>
                }, {
                  key: 'nombres',
                  dataIndex: 'nombres',
                  title: 'Nombres',
                }, {
                  key: 'apellidos',
                  dataIndex: 'apellidos',
                  title: 'Apellidos',
                }, {
                  key: 'actiones',
                  title: 'Acciones',
                  render: acciones,
                },]}
                pagination={{ pageSize: 5 }}
                locale={{ emptyText: 'Sin registros' }}
              />
            </Card>
            <ModalDA
              visible={showModal}
              title='ATENCIÓN'
              onClickCancelar={() => modalclienteEliminar(false, {})}
              footer={
                <BotoneraModalFooterActions
                  onClickCancelar={() => modalclienteEliminar(false, {})}
                  onClickAceptar={() => eliminarcliente(deleted)}
                  esEliminar
                />
              }
            >
              <p>
                ¿Desea eliminar al cliente?
              </p>
            </ModalDA>
          </div>
        </>
        :
        <ClienteEditar onClickCancelar={() => {
          editarcliente(false, {})
          reset()
        }}
          {...props} />
    }
  </>
}

export default withPageActions(Clientes)(pageData)
