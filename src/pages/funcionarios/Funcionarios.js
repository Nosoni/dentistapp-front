import React, { useEffect, useState } from 'react'
import { Button, Card, Table, Input, notification } from 'antd';
import { useForm } from "react-hook-form";
import {
  SearchOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { funcionarioListar, funcionarioFiltrar } from '../../services/funcionarios';
import { setPageData, updatePageDada } from '../../redux/page-data/actions'
import { useDispatch, useSelector } from 'react-redux';
import { updateUsuarioData } from '../../redux/usuario-data/actions';
import FuncionarioEditar from './componentes/FuncionarioEditar';

const pageData = {
  title: "Funcionarios",
  list: [],
  selected: {},
  deleted: {}
};

function Funcionarios() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.usuarioData);
  const datosPagina = useSelector((state) => state.pageData);
  const { register, handleSubmit, reset } = useForm();
  const [esEdicion, setEsEdicion] = useState({ editar: false, funcionario: {} })

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

  const acciones = (funcionario) => {
    return <div className='buttons-list nowrap'>
      <Button onClick={() => {
        setEsEdicion({ editar: true, funcionario })
      }} shape='circle' className="bg-color-info">
        <span className='icofont icofont-edit-alt' />
      </Button>
    </div>
  };

  const validarPeticion = (respuesta, next) => {
    if (respuesta.error) {
      openNotification("error", respuesta.mensaje)
      if (!respuesta.autenticado) {
        dispatch(updateUsuarioData({ authenticated: false }));
      }
    } else {
      next(respuesta)
    }
  }

  const actualizarEstadoPagina = (objeto) => {
    dispatch(updatePageDada(objeto));
  }

  // const seleccionarUsuarioEditar = (edicion, usuario) => {
  //   setEsEdicion(edicion)
  //   actualizarEstadoPagina({ selected: usuario, deleted: {} })
  // };

  // const seleccionarUsuarioEliminar = (mostrar, usuario) => {
  //   setShowModal(mostrar)
  //   actualizarEstadoPagina({ selected: {}, deleted: usuario });
  // };

  const filtrarFuncionario = async (filtro) => {
    const respuesta = await funcionarioFiltrar(token, filtro.filtro)
    validarPeticion(respuesta, (respuesta) => actualizarEstadoPagina({ list: respuesta.datos }))
  }

  const listarFuncionario = async () => {
    const respuesta = await funcionarioListar(token)
    validarPeticion(respuesta, (respuesta) => actualizarEstadoPagina({ list: respuesta.datos }))
  }

  // const eliminarUsuario = async (usuario) => {
  //   const respuesta = await usuarioEliminar(token, usuario.id)
  //   validarPeticion(respuesta, (respuesta) => {
  //     seleccionarUsuarioEliminar(false, {})
  //     openNotification("success", respuesta.mensaje)
  //   })
  // }

  const onSubmit = (filtro) => {
    if (!filtro.filtro) {
      listarFuncionario()
    } else {
      filtrarFuncionario(filtro)
    }
  };

  return (
    <div >
      {console.log(esEdicion)}
      {
        !esEdicion.editar ?
          <div>
            <div className='row justify-content-center'>
              <Card title='Buscar' className='col-md-9 col-sm-12 with-shadow'>
                <div className='elem-list'>
                  <Input placeholder='Introduzca alguna informaicón del funcionario' {...register("filtro")} style={{ borderRadius: '10px' }} />
                  <Button onClick={handleSubmit(onSubmit)} className='bg-color-info' icon={<SearchOutlined />}>
                    Search
                  </Button>
                  <Button onClick={() => setEsEdicion(true, {})} className='bg-color-success' shape='circle' icon={<PlusOutlined />} />
                </div>
              </Card>
            </div>
            <div className='row justify-content-center'>
              <Card title="Resultado" className='col-md-9 col-sm-12 with-shadow'>
                <Table
                  rowKey='id'
                  dataSource={datosPagina.list}
                  columns={[{
                    key: 'documento',
                    dataIndex: 'documento',
                    title: 'Documento',
                    render: (documento) => {
                      return <strong>{documento}</strong>
                    }
                  }, {
                    key: 'nombres',
                    dataIndex: 'nombres',
                    title: 'Nombres',
                    render: (nombres) => {
                      return <strong>{nombres}</strong>
                    }
                  }, {
                    key: 'apellidos',
                    dataIndex: 'apellidos',
                    title: 'Apellidos',
                    render: (apellidos) => {
                      return <strong>{apellidos}</strong>
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
            </div>
          </div>
          :
          <FuncionarioEditar selected={esEdicion.funcionario} onClickCancelar={() => {
            setEsEdicion({ editar: false, funcionario: {} })
            reset()
          }} />
      }
    </div >
  )
}

export default Funcionarios;
