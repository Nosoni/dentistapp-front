import React, { useState } from 'react'
import { Card, Table, Input } from 'antd';
import { useForm } from "react-hook-form";
import { pacienteEliminar, pacienteFiltrar, pacienteListar } from '../../services/pacientes';
import withPageActions from '../HOC/withPageActions';
import PacientesEditar from './componentes/PacientesEditar';
import BotoneraTableAcciones from '../components/BotoneraTableAcciones';
import BotoneraModalFooterActions from '../components/BotoneraFooterActions';
import ModalDA from '../components/Modal';
import BuscadorAcciones from '../components/BuscadorAcciones';

const pageData = {
  title: "Pacientes",
  list: [],
  selected: {},
  deleted: {}
};

const Pacientes = (props) => {
  const { register, handleSubmit, reset } = useForm();
  const { validarPeticion, actualizarEstadoPagina } = props
  const { token } = props.usuarioData;
  const { list, deleted } = props.pageData;
  const [esEdicion, setEsEdicion] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const acciones = (paciente) => {
    return <BotoneraTableAcciones
      onClickEditar={() => editarPaciente(true, paciente)}
      onClickEliminar={() => modalPacienteEliminar(true, paciente)}
    />
  }

  const listarPaciente = async () => {
    validarPeticion(pacienteListar(token), (respuesta) => {
      actualizarEstadoPagina({ list: respuesta.datos })
    })
  }

  const filtrarPaciente = async (filtro) => {
    validarPeticion(pacienteFiltrar(token, filtro.paciente), (respuesta) => actualizarEstadoPagina({ list: respuesta.datos }))
  }

  const nuevoPaciente = () => {
    setEsEdicion(true)
    actualizarEstadoPagina({ selected: {}, deleted: {} })
  }

  const editarPaciente = (edicion, paciente) => {
    setEsEdicion(edicion)
    actualizarEstadoPagina({ selected: paciente, deleted: {} })
  }

  const modalPacienteEliminar = (mostrar, paciente) => {
    setShowModal(mostrar)
    actualizarEstadoPagina({ selected: {}, deleted: paciente });
  };

  const eliminarPaciente = async (paciente) => {
    await validarPeticion(pacienteEliminar(token, paciente.id), () => modalPacienteEliminar(false, {}), true)
    handleSubmit(onSubmit)()
  }

  const onSubmit = (filtro) => {
    if (!filtro.paciente) {
      listarPaciente()
    } else {
      filtrarPaciente(filtro)
    }
  };

  return <>
    {
      !esEdicion ?
        <>
          <div className='row justify-content-center'>
            <Card title='Buscar' className='col-md-9 col-sm-12 with-shadow'>
              <BuscadorAcciones
                registro={register("paciente")}
                buscar={handleSubmit(onSubmit)}
                nuevo={() => nuevoPaciente()}
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
            <ModalDA
              visible={showModal}
              title='ATENCIÓN'
              onClickCancelar={() => modalPacienteEliminar(false, {})}
              footer={
                <BotoneraModalFooterActions
                  onClickCancelar={() => modalPacienteEliminar(false, {})}
                  onClickAceptar={() => eliminarPaciente(deleted)}
                  esEliminar
                />
              }
            >
              <p>
                ¿Desea eliminar al paciente?
              </p>
            </ModalDA>
          </div>
        </>
        :
        <PacientesEditar onClickCancelar={() => {
          editarPaciente(false, {})
          reset()
        }} />
    }
  </>
}

export default withPageActions(Pacientes)(pageData)
