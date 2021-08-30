//rfce
import React, { useEffect, useState } from 'react'
import { Button, Card, Table, Input, Modal } from 'antd';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import {
  SearchOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { usuarioFiltrar } from '../../services/usuarios';
import { setPageData } from '../../redux/page-data/actions'
import { useDispatch, useSelector } from 'react-redux';
import UsuarioEditar from './componentes/UsuarioEditar';

const pageData = {
  title: "Usuario"
};

function Usuario() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageData(pageData));
  }, [])

  const token = useSelector((state) => state.usuarioData.token);
  const [usuariosList, setUsuariosList] = useState([])

  const schema = yup.object({
    usuario: yup.string().required("Favor introduzca el Usuario")
  })
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [usuarioEliminar, setUsuarioEliminar] = useState(null);

  const usuariosAcciones = (usuario) => {
    return <div className='buttons-list nowrap'>
      <Button onClick={() => openEditModal(usuario)} shape='circle' className="bg-color-info">
        <span className='icofont icofont-edit-alt' />
      </Button>
      <Button onClick={() => openEliminarModal(usuario)} shape='circle' className="bg-color-error">
        <span className='icofont icofont-ui-delete' />
        {/* icofont-delete-alt */}
      </Button>
    </div>
  };

  const openEditModal = (usuario) => {
    setUsuarioSeleccionado(usuario)
  };

  const openEliminarModal = (usuario) => {
    setUsuarioEliminar(usuario)
  };

  const handleBuscarUsuario = async (filtro) => {
    const respuesta = await usuarioFiltrar(token, filtro.usuario)
    setUsuariosList(respuesta)
  }

  const onSubmit = (filtro) => {
    handleBuscarUsuario(filtro)
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
            <Button className='bg-color-success' shape='circle' icon={<PlusOutlined />} />
          </div>
        </Card>
      </div>
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
                render: (funcionario) => <strong>{funcionario?.nombres}</strong>
              }, {
                key: 'actiones',
                title: 'Actiones',
                render: usuariosAcciones,
              },]}
              pagination={{ hideOnSinglePage: true }}
            />
          </Card>
          <Modal
            visible={!!usuarioSeleccionado}
            onCancel={() => setUsuarioSeleccionado(false)}
            destroyOnClose
            footer={null}
            title={<h3 className='title'>Editar usuario</h3>}
          >
            <UsuarioEditar usuario={usuarioSeleccionado} />
          </Modal>
          <Modal
            visible={!!usuarioEliminar}
            closable={() => setUsuarioEliminar(false)}
            title={<h3 className='m-0'>ATENCIÓN</h3>}
            onCancel={() => setUsuarioEliminar(false)}
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
    </div>
  )
}

export default Usuario;
