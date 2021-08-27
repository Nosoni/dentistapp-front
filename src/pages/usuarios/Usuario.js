//rfce
import React, { useState } from 'react'
import { Button, Card, Table, Input, Space } from 'antd';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import {
  SearchOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { usuarioFiltrar } from '../../services/usuarios';
import { setPageData } from '../../redux/page-data/actions'
import { useDispatch } from 'react-redux';

const pageData = {
  title: "Usuario"
};

function Usuario() {
  const dispatch = useDispatch();
  dispatch(setPageData(pageData));

  const [usuariosList, setUsuariosList] = useState([])
  //useEffect(() => { !localStorage.getItem("usuario") && props.history.push("/login") }, [])
  const schema = yup.object({
    usuario: yup.string().required("Favor introduzca el Usuario")
  })

  const handleBuscarUsuario = async (filtro) => {
    const respuesta = await usuarioFiltrar(filtro.usuario)
    setUsuariosList(respuesta)
  }

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (filtro) => {
    handleBuscarUsuario(filtro)
  };

  console.log("errores", errors)

  return (
    <div >
      <div className='row justify-content-center'>
        <Card title='Buscar Usuario' className='col-md-6 col-sm-12'>
          <div className='elem-list'>
            <Input placeholder='Introduzca el Usuario' {...register("usuario")} style={{ borderRadius: '10px' }} />
            <Button onClick={handleSubmit(onSubmit)} className='bg-color-info' icon={<SearchOutlined />}>
              Search
            </Button>
            <Button className='bg-color-success' shape='circle' icon={<PlusOutlined />} />
          </div>
        </Card>
      </div>
      <div className='row justify-content-center'>
        <Card title="Resultado" className='col-md-12 col-sm-12'>
          {usuariosList?.length > 0 &&
            <Table
              rowKey='id'
              dataSource={usuariosList}
              columns={[{
                key: 'usuario',
                dataIndex: 'usuario',
                title: 'Usuario',
                render: (usuario) => <strong>{usuario}</strong>
              }, {
                key: 'action',
                title: 'Action',
                render: (record) => (
                  <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                  </Space>
                ),
              },]}
              pagination={{ hideOnSinglePage: true }}
            />}
        </Card>
      </div>
    </div>
  )
}

export default Usuario;
