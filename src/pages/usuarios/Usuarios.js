//rfce
import React, { useState } from 'react'
import { Card, Table, Input } from 'antd';
import { useForm } from "react-hook-form";
import { usuarioListar, usuarioFiltrar, usuarioEliminar } from '../../services/usuarios';
import UsuarioEditar from './componentes/UsuarioEditar';
import withPageActions from '../HOC/withPageActions';
import ModalDA from '../components/Modal';
import BotoneraTableAcciones from '../components/BotoneraTableAcciones';
import BotoneraModalFooterActions from '../components/BotoneraFooterActions';
import BuscadorAcciones from '../components/BuscadorAcciones';

const pageData = {
  title: "Usuarios",
  list: [],
  selected: {},
  deleted: {},
};

function Usuarios(props) {
  const { register, handleSubmit, reset } = useForm();
  const { validarPeticion, actualizarEstadoPagina,
    usuarioData: { token }, pageData: { list, deleted } } = props
  const [esEdicion, setEsEdicion] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const acciones = (usuario) => {
    return <BotoneraTableAcciones
      onClickEditar={() => editarUsuario(true, usuario)}
      onClickEliminar={() => modalUsuarioEliminar(true, usuario)}
    />
  }

  const listarUsuario = async () => {
    validarPeticion(usuarioListar(token), (respuesta) => {
      actualizarEstadoPagina({ list: respuesta.datos })
    })
  }

  const filtrarUsuario = async (filtro) => {
    validarPeticion(usuarioFiltrar(token, filtro.usuario), (respuesta) => actualizarEstadoPagina({ list: respuesta.datos }))
  }

  const nuevoUsuario = () => {
    setEsEdicion(true)
    actualizarEstadoPagina({ selected: {}, deleted: {} })
  }

  const editarUsuario = (edicion, usuario) => {
    setEsEdicion(edicion)
    actualizarEstadoPagina({ selected: usuario, deleted: {} })
  };

  const modalUsuarioEliminar = (mostrar, usuario) => {
    setShowModal(mostrar)
    actualizarEstadoPagina({ selected: {}, deleted: usuario });
  };

  const eliminarUsuario = async (usuario) => {
    await validarPeticion(usuarioEliminar(token, usuario.id), () => modalUsuarioEliminar(false, {}), true)
    handleSubmit(onSubmit)()
  }

  const onSubmit = (filtro) => {
    if (!filtro.usuario) {
      listarUsuario()
    } else {
      filtrarUsuario(filtro)
    }
  };

  return <>
    {
      !esEdicion ?
        <div>
          <div className='row justify-content-center'>
            <Card title='Buscar' className='col-md-9 col-sm-12 with-shadow'>
              <BuscadorAcciones
                placeholder="Introduzca el usuario"
                registro={register("usuario")}
                buscar={handleSubmit(onSubmit)}
                nuevo={() => nuevoUsuario()}
              />
            </Card>
          </div>
          <div className='row justify-content-center'>
            <Card title="Resultado" className='col-md-9 col-sm-12 with-shadow'>
              <Table
                rowKey='id'
                dataSource={list}
                columns={[{
                  key: 'usuario',
                  dataIndex: 'usuario',
                  title: 'Usuario',
                  render: (usuario) => <strong>{usuario}</strong>
                }, {
                  key: 'funcionario',
                  dataIndex: 'funcionario',
                  title: 'Funcionario',
                  render: (funcionario) => {
                    let nombre = (funcionario?.nombres ? funcionario?.nombres : "") + " " + (funcionario?.apellidos ? funcionario?.apellidos : "");
                    return nombre
                  }
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
              onClickCancelar={() => modalUsuarioEliminar(false, {})}
              footer={
                <BotoneraModalFooterActions
                  onClickCancelar={() => modalUsuarioEliminar(false, {})}
                  onClickAceptar={() => eliminarUsuario(deleted)}
                  esEliminar
                />
              }
            >
              <p>
                ¿Desea eliminar el usuario?
              </p>
            </ModalDA>
          </div>
        </div>
        :
        <UsuarioEditar onClickCancelar={() => {
          editarUsuario(false, {})
          reset()
        }} />
    }
  </ >
}

export default withPageActions(Usuarios)(pageData)
