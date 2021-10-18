import React, { useState } from 'react'
import { Card, Table, Input } from 'antd';
import { useForm } from "react-hook-form";
import {
  SearchOutlined,
  PlusOutlined
} from '@ant-design/icons';
import ButtonsTooltips from '../components/ButtonsTooltips';
import { rolEliminar, rolFiltrar, rolListar } from '../../services/roles';
import withPageActions from '../HOC/withPageActions';
import RolesEditar from './componentes/RolesEditar';
import BotoneraTableAcciones from '../components/BotoneraTableAcciones';
import BotoneraModalFooterActions from '../components/BotoneraFooterActions';
import ModalDA from '../components/Modal';

const pageData = {
  title: "Roles",
  list: [],
  selected: {},
  deleted: {}
};

const Roles = (props) => {
  const { register, handleSubmit, reset } = useForm();
  const { validarPeticion, actualizarEstadoPagina } = props
  const { token } = props.usuarioData;
  const { list, deleted } = props.pageData;
  const [esEdicion, setEsEdicion] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const acciones = (rol) => {
    return <BotoneraTableAcciones
      onClickEditar={() => editarRol(true, rol)}
      onClickEliminar={() => modalRolEliminar(true, rol)}
    />
  }

  const listarRol = async () => {
    validarPeticion(rolListar(token), (respuesta) => actualizarEstadoPagina({ list: respuesta.datos }))
  }

  const filtrarRol = async (filtro) => {
    validarPeticion(rolFiltrar(token, filtro.rol), (respuesta) => actualizarEstadoPagina({ list: respuesta.datos }))
  }

  const nuevoRol = () => {
    setEsEdicion(true)
    actualizarEstadoPagina({ selected: {}, deleted: {} })
  }

  const editarRol = (edicion, rol) => {
    setEsEdicion(edicion)
    actualizarEstadoPagina({ selected: rol, deleted: {} })
  }

  const modalRolEliminar = (mostrar, rol) => {
    setShowModal(mostrar)
    actualizarEstadoPagina({ selected: {}, deleted: rol });
  };

  const eliminarRol = async (rol) => {
    await validarPeticion(rolEliminar(token, rol.id), () => modalRolEliminar(false, {}), true)
    handleSubmit(onSubmit)()
  }

  const onSubmit = (filtro) => {
    if (!filtro.rol) {
      listarRol()
    } else {
      filtrarRol(filtro)
    }
  };

  return <>
    {
      !esEdicion ?
        <>
          <div className='row justify-content-center'>
            <Card title='Buscar' className='col-md-9 col-sm-12 with-shadow'>
              <div className='elem-list'>
                <Input placeholder='Introduzca el rol'
                  {...register("rol")}
                  style={{ borderRadius: '10px' }} />
                <ButtonsTooltips
                  onClick={handleSubmit(onSubmit)}
                  className="bg-color-info"
                  tooltipsTitle="Buscar"
                  shape='circle'
                  icon={<SearchOutlined />} />
                <ButtonsTooltips
                  onClick={() => nuevoRol()}
                  className='bg-color-success'
                  tooltipsTitle="Nuevo"
                  shape='circle'
                  icon={<PlusOutlined />} />
              </div>
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
            <ModalDA
              visible={showModal}
              title='ATENCIÓN'
              onClickCancelar={() => modalRolEliminar(false, {})}
              footer={
                <BotoneraModalFooterActions
                  onClickCancelar={() => modalRolEliminar(false, {})}
                  onClickAceptar={() => eliminarRol(deleted)}
                  esEliminar
                />
              }
            >
              <p>
                ¿Desea eliminar el rol?
              </p>
            </ModalDA>
          </div>
        </>
        :
        <RolesEditar onClickCancelar={() => {
          editarRol(false, {})
          reset()
        }} />
    }
  </>
}

export default withPageActions(Roles)(pageData)