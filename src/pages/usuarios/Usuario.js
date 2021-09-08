//rfce
import React, { useEffect, useState } from 'react'
import { Button, Card, Table, Input, notification } from 'antd';
import Modal from '../components/Modal'
import { useForm } from "react-hook-form";
import {
  SearchOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { usuarioListar, usuarioFiltrar, usuarioEliminar } from '../../services/usuarios';
import { setPageData, updatePageDada } from '../../redux/page-data/actions'
import { useDispatch, useSelector } from 'react-redux';
import UsuarioEditar from './componentes/UsuarioEditar';
import { updateUsuarioData } from '../../redux/usuario-data/actions';

const pageData = {
  title: "Usuarios",
  list: [],
  selected: {},
  deleted: {},
};

function Usuario() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.usuarioData);
  const datosPagina = useSelector((state) => state.pageData);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [esEdicion, setEsEdicion] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    dispatch(setPageData(pageData));
  }, [])

  const openNotification = (type, descripcion) => {
    notification[type]({
      description: descripcion,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  const usuariosAcciones = (usuario) => {
    return <div className='buttons-list nowrap'>
      <Button onClick={() => seleccionarUsuarioEditar(true, usuario)} shape='circle' className="bg-color-info">
        <span className='icofont icofont-edit-alt' />
      </Button>
      <Button onClick={() => seleccionarUsuarioEliminar(true, usuario)} shape='circle' className="bg-color-error">
        <span className='icofont icofont-ui-delete' />
      </Button>
    </div>
  };

  const validarPeticion = (seleccion, next) => {
    console.log("eliminar", seleccion)
    if (seleccion.error) {
      openNotification("error", seleccion.mensaje)
      if (!seleccion.autenticado) {
        dispatch(updateUsuarioData({ authenticated: false }));
      }
    } else {
      next(seleccion)
    }
  }

  function actualizarEstadoPagina(objeto) {
    dispatch(updatePageDada(objeto));
  }

  const seleccionarUsuarioEditar = (edicion, usuario) => {
    setEsEdicion(edicion)
    actualizarEstadoPagina({ selected: usuario, deleted: {} })
  };

  const seleccionarUsuarioEliminar = (mostrar, usuario) => {
    setShowModal(mostrar)
    actualizarEstadoPagina({ selected: {}, deleted: usuario });
  };

  const filtrarUsuario = async (filtro) => {
    const respuesta = await usuarioFiltrar(token, filtro.usuario)
    validarPeticion(respuesta, (seleccion) => actualizarEstadoPagina({ list: seleccion.datos }))
  }

  const listarUsuario = async () => {
    const respuesta = await usuarioListar(token)
    validarPeticion(respuesta, (seleccion) => actualizarEstadoPagina({ list: seleccion.datos }))
  }

  const eliminarUsuario = async (usuario) => {
    const respuesta = await usuarioEliminar(token, usuario.id)
    validarPeticion(respuesta, (respuesta) => {
      seleccionarUsuarioEliminar(false, {})
      openNotification("success", respuesta.mensaje)
    })
  }

  const onSubmit = (filtro) => {
    if (!filtro.usuario) {
      listarUsuario()
    } else {
      filtrarUsuario(filtro)
    }
  };

  return (
    <div >
      {
        !esEdicion ?
          <div>
            <div className='row justify-content-center'>
              <Card title='Buscar' className='col-md-9 col-sm-12 with-shadow'>
                <div className='elem-list'>
                  <Input placeholder='Introduzca el Usuario' {...register("usuario")} style={{ borderRadius: '10px' }} />
                  <Button onClick={handleSubmit(onSubmit)} className='bg-color-info' icon={<SearchOutlined />}>
                    Search
                  </Button>
                  <Button onClick={() => seleccionarUsuarioEditar(true, {})} className='bg-color-success' shape='circle' icon={<PlusOutlined />} />
                </div>
              </Card>
            </div>
            <div className='row justify-content-center'>
              <Card title="Resultado" className='col-md-9 col-sm-12 with-shadow'>
                <Table
                  rowKey='id'
                  dataSource={datosPagina.list}
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
                      return <strong>{nombre}</strong>
                    }
                  }, {
                    key: 'actiones',
                    title: 'Actiones',
                    render: usuariosAcciones,
                  },]}
                  pagination={{ pageSize: 5 }}
                  locale={{ emptyText: 'Sin registros' }}
                />
              </Card>
              <Modal
                visible={showModal}
                title='ATENCIÓN'
                onClickCancelar={() => seleccionarUsuarioEliminar(false, {})}
                footer={
                  <div className='modal-footer d-flex justify-content-between'>
                    <Button className='bg-color-info' onClick={() => seleccionarUsuarioEliminar(false, {})}>
                      Cancelar
                    </Button>
                    <Button className='bg-color-error' onClick={() => eliminarUsuario(datosPagina.deleted)}>
                      Aceptar
                    </Button>
                  </div>
                }
              >
                <p>
                  ¿Desea eliminar el usuario?
                </p>
              </Modal>
            </div>
          </div>
          :
          <UsuarioEditar onClickCancelar={() => {
            seleccionarUsuarioEditar(false, {})
            reset()
          }} />
      }
    </div >
  )
}

export default Usuario;
