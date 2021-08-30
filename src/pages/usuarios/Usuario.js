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

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const appointmentsActions = (usuario) => {
    return <div className='buttons-list nowrap'>
      <Button onClick={() => openEditModal(usuario)} shape='circle' type='primary'>
        <span className='icofont icofont-edit-alt' />
      </Button>
    </div>
  };

  const openEditModal = (usuario) => {
    setSelectedAppointment(usuario)
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
                render: appointmentsActions,
              },]}
              pagination={{ hideOnSinglePage: true }}
            />
          </Card>
          <Modal
            visible={!!selectedAppointment}
            onCancel={() => setSelectedAppointment(false)}
            destroyOnClose
            footer={null}
            title={<h3 className='title'>Editar usuario</h3>}
          >
            <UsuarioEditar usuario={selectedAppointment} />
          </Modal>
        </div>
      }
    </div>
  )
}

export default Usuario;
