import React, { useState } from 'react'
import { Button, Card, Table } from 'antd';
import Modal from '../components/Modal'
import { useForm } from "react-hook-form";
import { funcionarioListar, funcionarioFiltrar, funcionarioEliminar } from '../../services/funcionarios';
import FuncionarioEditar from './componentes/FuncionarioEditar';
import BotoneraTableAcciones from '../components/BotoneraTableAcciones';
import BuscadorAcciones from '../components/BuscadorAcciones';
import BotoneraModalFooterActions from '../components/BotoneraFooterActions';
import withPageActions from '../HOC/withPageActions';

const pageData = {
  title: "Funcionarios",
  list: [],
  selected: {},
  deleted: {}
};

function Funcionarios(props) {
  const { register, handleSubmit, reset } = useForm();
  const { validarPeticion, actualizarEstadoPagina,
    usuarioData: { token }, pageData: { list, deleted } } = props;
  const [esEdicion, setEsEdicion] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const acciones = (funcionario) => {
    return <BotoneraTableAcciones
      onClickEditar={() => editarFuncionario(true, funcionario)}
      onClickEliminar={() => modalFuncionarioEliminar(true, funcionario)}
    />
  }

  const listarFuncionario = async () => {
    validarPeticion(funcionarioListar(token), (respuesta) => actualizarEstadoPagina({ list: respuesta.datos }))
  }

  const filtrarFuncionario = async (filtro) => {
    validarPeticion(funcionarioFiltrar(token, filtro.filtro), (respuesta) => actualizarEstadoPagina({ list: respuesta.datos }))
  }

  const nuevoFuncionario = () => {
    setEsEdicion(true)
    actualizarEstadoPagina({ selected: {}, deleted: {} })
  }

  const editarFuncionario = (edicion, funcionario) => {
    setEsEdicion(edicion)
    actualizarEstadoPagina({ selected: funcionario, deleted: {} })
  }

  const modalFuncionarioEliminar = (mostrar, funcionario) => {
    setShowModal(mostrar)
    actualizarEstadoPagina({ selected: {}, deleted: funcionario });
  };

  const eliminarFuncionario = async (funcionario) => {
    await validarPeticion(funcionarioEliminar(token, funcionario.id), () => modalFuncionarioEliminar(false, {}), true)
    handleSubmit(onSubmit)()
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
                <BuscadorAcciones
                  registro={register("filtro")}
                  buscar={handleSubmit(onSubmit)}
                  nuevo={() => nuevoFuncionario()}
                />
              </Card>
            </div>
            <div className='row justify-content-center'>
              <Card title="Resultado" className='col-md-9 col-sm-12 with-shadow'>
                <Table
                  rowKey='id'
                  dataSource={list}
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
                  }, {
                    key: 'apellidos',
                    dataIndex: 'apellidos',
                    title: 'Apellidos',
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
                onClickCancelar={() => modalFuncionarioEliminar(false, {})}
                footer={
                  <BotoneraModalFooterActions
                    onClickCancelar={() => modalFuncionarioEliminar(false, {})}
                    onClickAceptar={() => eliminarFuncionario(deleted)}
                    esEliminar
                  />
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
            editarFuncionario(false, {})
            reset()
          }} />
      }
    </div >
  )
}

export default withPageActions(Funcionarios)(pageData)
