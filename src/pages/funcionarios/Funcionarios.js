import React, { useEffect, useState } from 'react'
import { Button, Card, Table, Input, notification } from 'antd';
import Modal from '../components/Modal'
import { useForm } from "react-hook-form";
import {
  SearchOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { funcionarioListar, funcionarioFiltrar, funcionarioEliminar } from '../../services/funcionarios';
import { setPageData, updatePageDada } from '../../redux/page-data/actions'
import { useDispatch, useSelector } from 'react-redux';
import { updateUsuarioData } from '../../redux/usuario-data/actions';
import FuncionarioEditar from './componentes/FuncionarioEditar';
import ButtonsTooltips from '../components/ButtonsTooltips';

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

  const acciones = (funcionario) => {
    return <div className='buttons-list nowrap'>
      <ButtonsTooltips
        onClick={() => seleccionarFuncionarioEditar(true, funcionario)}
        shape='circle'
        className="bg-color-info"
        tooltipsTitle="Editar">
        <span className='icofont icofont-edit-alt' />
      </ButtonsTooltips>
      <ButtonsTooltips
        onClick={() => seleccionarFuncionarioEliminar(true, funcionario)}
        shape='circle'
        className="bg-color-error"
        tooltipsTitle="Eliminar">
        <span className='icofont icofont-ui-delete' />
      </ButtonsTooltips>
    </div>
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

  const seleccionarFuncionarioEditar = (edicion, funcionario) => {
    setEsEdicion(edicion)
    actualizarEstadoPagina({ selected: funcionario, deleted: {} })
  };

  const seleccionarFuncionarioEliminar = (mostrar, funcionario) => {
    setShowModal(mostrar)
    actualizarEstadoPagina({ selected: {}, deleted: funcionario });
  };

  const filtrarFuncionario = async (filtro) => {
    const respuesta = await funcionarioFiltrar(token, filtro.filtro)
    validarPeticion(respuesta, (respuesta) => actualizarEstadoPagina({ list: respuesta.datos }))
  }

  const listarFuncionario = async () => {
    const respuesta = await funcionarioListar(token)
    validarPeticion(respuesta, (respuesta) => actualizarEstadoPagina({ list: respuesta.datos }))
  }

  const eliminarFuncionario = async (funcionario) => {
    const respuesta = await funcionarioEliminar(token, funcionario.id)
    validarPeticion(respuesta, (respuesta) => {
      seleccionarFuncionarioEliminar(false, {})
      openNotification("success", respuesta.mensaje)
    })
  }

  const onSubmit = (filtro) => {
    if (!filtro.filtro) {
      listarFuncionario()
    } else {
      filtrarFuncionario(filtro)
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
                  <Input placeholder='Introduzca alguna información del funcionario' {...register("filtro")} style={{ borderRadius: '10px' }} />
                  <ButtonsTooltips
                    onClick={handleSubmit(onSubmit)}
                    className="bg-color-info"
                    tooltipsTitle="Buscar"
                    shape='circle'
                    icon={<SearchOutlined />} />
                  <ButtonsTooltips
                    onClick={() => seleccionarFuncionarioEditar(true, {})}
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
              <Modal
                visible={showModal}
                title='ATENCIÓN'
                onClickCancelar={() => seleccionarFuncionarioEliminar(false, {})}
                footer={
                  <div className='modal-footer d-flex justify-content-between'>
                    <Button className='bg-color-info' onClick={() => seleccionarFuncionarioEliminar(false, {})}>
                      Cancelar
                    </Button>
                    <Button className='bg-color-error' onClick={() => eliminarFuncionario(datosPagina.deleted)}>
                      Aceptar
                    </Button>
                  </div>
                }
              >
                <p>
                  ¿Desea eliminar el funcionario?
                </p>
              </Modal>
            </div>
          </div>
          :
          <FuncionarioEditar onClickCancelar={() => {
            seleccionarFuncionarioEditar(false, {})
            reset()
          }} />
      }
    </div >
  )
}

export default Funcionarios;
