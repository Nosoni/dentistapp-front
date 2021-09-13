import React, { useEffect, useState } from 'react'
import { Button, Card, Table, Input, notification } from 'antd';
import { useForm } from "react-hook-form";
import {
  SearchOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setPageData, updatePageDada } from '../../redux/page-data/actions'
import ButtonsTooltips from '../components/ButtonsTooltips';
import { updateUsuarioData } from '../../redux/usuario-data/actions';
import { rolFiltrar, rolListar } from '../../services/roles';

const pageData = {
  title: "Roles",
  list: [],
  selected: {},
  deleted: {}
};

const Roles = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.usuarioData);
  const datosPagina = useSelector((state) => state.pageData);
  const { register, handleSubmit, reset } = useForm();
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

  const validarPeticion = (respuesta, next) => {
    if (respuesta.error) {
      openNotification("error", respuesta.mensaje)
      if (respuesta.autenticado === false) {
        dispatch(updateUsuarioData({ authenticated: false }));
      }
    } else {
      next(respuesta)
    }
  }

  const actualizarEstadoPagina = (objeto) => {
    dispatch(updatePageDada(objeto));
  }

  const seleccionarRolEditar = (edicion, rol) => {
    setEsEdicion(edicion)
    actualizarEstadoPagina({ selected: rol, deleted: {} })
  };

  const listarRol = async () => {
    const respuesta = await rolListar(token)
    validarPeticion(respuesta, (respuesta) => actualizarEstadoPagina({ list: respuesta.datos }))
  }

  const filtrarRol = async (filtro) => {
    const respuesta = await rolFiltrar(token, filtro.rol)
    validarPeticion(respuesta, (respuesta) => actualizarEstadoPagina({ list: respuesta.datos }))
  }

  // const eliminarRol = async (funcionario) => {
  //   const respuesta = await funcionarioEliminar(token, funcionario.id)
  //   validarPeticion(respuesta, (respuesta) => {
  //     seleccionarFuncionarioEliminar(false, {})
  //     openNotification("success", respuesta.mensaje)
  //   })
  // }

  const onSubmit = (filtro) => {
    if (!filtro.rol) {
      listarRol()
    } else {
      filtrarRol(filtro)
    }
  };

  return (
    <>
      <div className='row justify-content-center'>
        <Card title='Buscar' className='col-md-9 col-sm-12 with-shadow'>
          <div className='elem-list'>
            <Input placeholder='Introduzca el rol' {...register("rol")} style={{ borderRadius: '10px' }} />
            <ButtonsTooltips
              onClick={handleSubmit(onSubmit)}
              className="bg-color-info"
              tooltipsTitle="Buscar"
              shape='circle'
              icon={<SearchOutlined />} />
            <ButtonsTooltips
              onClick={() => seleccionarRolEditar(true, {})}
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
            dataSource={datosPagina.list}
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
            },]}
            pagination={{ pageSize: 5 }}
            locale={{ emptyText: 'Sin registros' }}
          />
        </Card>
      </div>
    </>
  )
}

export default Roles
