//rfce
import React, { useEffect, useState } from 'react'
import { Button, Card, Table, Input } from 'antd';
import Modal from '../components/Modal'
import { useForm } from "react-hook-form";
import {
  SearchOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { usuarioListar, usuarioFiltrar } from '../../services/usuarios';
import { setPageData, updatePageDada } from '../../redux/page-data/actions'
import { useDispatch, useSelector } from 'react-redux';
import UsuarioEditar from './componentes/UsuarioEditar';

const pageData = {
  title: "Usuario",
  list: [],
  selected: {},
  deleted: {},
};

function Usuario() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.usuarioData.token);
  const datosPagina = useSelector((state) => state.pageData);
  const { register, handleSubmit, formState: { errors } } = useForm();
  //const [usuariosList, setUsuariosList] = useState([])
  //const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  //const [usuarioEliminar, setUsuarioEliminar] = useState(null);

  useEffect(() => {
    dispatch(setPageData(pageData));
  }, [])

  const usuariosAcciones = (usuario) => {
    return <div className='buttons-list nowrap'>
      <Button onClick={() => openEditModal(usuario)} shape='circle' className="bg-color-info">
        <span className='icofont icofont-edit-alt' />
      </Button>
      <Button onClick={() => openEliminarModal(usuario)} shape='circle' className="bg-color-error">
        <span className='icofont icofont-ui-delete' />
      </Button>
    </div>
  };

  const openEditModal = (usuario) => {
    //setUsuarioSeleccionado(usuario)
    dispatch(updatePageDada({ selected: usuario, deleted: {} }));
  };

  const openEliminarModal = (usuario) => {
    //setUsuarioEliminar(usuario)
    dispatch(updatePageDada({ selected: {}, deleted: usuario }));
  };

  const filtrarUsuario = async (filtro) => {
    const respuesta = await usuarioFiltrar(token, filtro.usuario)
    //setUsuariosList(respuesta)
    dispatch(updatePageDada({ list: respuesta }));
  }

  const listarUsuario = async () => {
    const respuesta = await usuarioListar(token)
    //setUsuariosList(respuesta)
    dispatch(updatePageDada({ list: respuesta }));
  }

  const volver = async () => dispatch(setPageData(pageData));

  const onSubmit = (filtro) => {
    if (!filtro.usuario) {
      listarUsuario()
    } else {
      filtrarUsuario(filtro)
    }
  };

  function empty(object) {
    if (object) {
      return Object.keys(object).length === 0
    } else { return false }

  }

  return (
    <div >
      {
        empty(datosPagina.selected) ?
          <div className='row justify-content-center'>
            <Card title='Buscar' className='col-md-6 col-sm-12'>
              <div className='elem-list'>
                <Input placeholder='Introduzca el Usuario' {...register("usuario")} style={{ borderRadius: '10px' }} />
                <Button onClick={handleSubmit(onSubmit)} className='bg-color-info' icon={<SearchOutlined />}>
                  Search
            </Button>
                <Button onClick={() => openEditModal({})} className='bg-color-success' shape='circle' icon={<PlusOutlined />} />
              </div>
            </Card>
            <div className='row justify-content-center'>
              <Card title="Resultado" className='col-md-12 col-sm-12'>
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
                  pagination={{ hideOnSinglePage: true }}
                />
              </Card>
              <Modal
                visible={!empty(datosPagina.deleted)}
                title='ATENCIÓN'
                onClickCancelar={() => volver()}
                footer={
                  <div className='modal-footer d-flex justify-content-between'>
                    <Button className='bg-color-info' onClick={() => volver()}>
                      Cancelar
                </Button>
                    <Button className='bg-color-error' onClick={() => console.log("usuario a eliminar", datosPagina.deleted)}>
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
          <UsuarioEditar usuario={datosPagina.selected} />
      }
    </div >
  )
}

export default Usuario;
