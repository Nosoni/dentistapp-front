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
import { setPageData } from '../../redux/page-data/actions'
import { useDispatch, useSelector } from 'react-redux';
import UsuarioEditar from './componentes/UsuarioEditar';

const pageData = {
  title: "Usuario"
};

function Usuario() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.usuarioData.token);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [usuariosList, setUsuariosList] = useState([])
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [usuarioEliminar, setUsuarioEliminar] = useState(null);

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
    setUsuarioSeleccionado(usuario)
  };

  const openEliminarModal = (usuario) => {
    setUsuarioEliminar(usuario)
  };

  const filtrarUsuario = async (filtro) => {
    const respuesta = await usuarioFiltrar(token, filtro.usuario)
    setUsuariosList(respuesta)
  }

  const listarUsuario = async () => {
    const respuesta = await usuarioListar(token)
    setUsuariosList(respuesta)
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
      </div>
      <Modal
        visible={!!usuarioSeleccionado}
        title='Editar usuario'
        onClickCancelar={() => setUsuarioSeleccionado(false)}
        footer={null}
      >
        <UsuarioEditar usuario={usuarioSeleccionado}
          onClickCancelar={() => setUsuarioSeleccionado(false)} />
      </Modal>
      {usuariosList?.length > 0 &&
        <div className='row justify-content-center'>
          <Card title="Resultado" className='col-md-12 col-sm-12'>
            <Table
              rowKey='id'
              dataSource={usuariosList}
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
            visible={!!usuarioEliminar}
            title='ATENCIÓN'
            onClickCancelar={() => setUsuarioEliminar(false)}
            footer={
              <div className='modal-footer d-flex justify-content-between'>
                <Button className='bg-color-info' onClick={() => setUsuarioEliminar(false)}>
                  Cancelar
                </Button>
                <Button className='bg-color-error' onClick={() => console.log("usuario a eliminar", usuarioEliminar)}>
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
      }
    </div >
  )
}

export default Usuario;
