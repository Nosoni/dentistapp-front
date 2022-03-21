import React, { useState } from 'react'
import { Card, Table } from 'antd';
import Modal from '../components/Modal'
import { useForm } from "react-hook-form";
import { doctorListar, doctorFiltrar, doctorEliminar } from '../../services/doctores';
import DoctorEditar from './componentes/DoctorEditar';
import BotoneraTableAcciones from '../components/BotoneraTableAcciones';
import BuscadorAcciones from '../components/BuscadorAcciones';
import BotoneraModalFooterActions from '../components/BotoneraFooterActions';
import withPageActions from '../HOC/withPageActions';

const pageData = {
  title: "Doctores",
  list: [],
  selected: {},
  deleted: {}
};

function Doctores(props) {
  const { register, handleSubmit, reset } = useForm();
  const { validarPeticion, actualizarEstadoPagina,
    usuarioData: { token }, pageData: { list, deleted } } = props;
  const [esEdicion, setEsEdicion] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const acciones = (doctor) => {
    return <BotoneraTableAcciones
      onClickEditar={() => editarDoctor(true, doctor)}
      onClickEliminar={() => modalDoctorEliminar(true, doctor)}
    />
  }

  const listarDoctor = async () => {
    validarPeticion(doctorListar(token), (respuesta) => actualizarEstadoPagina({ list: respuesta.datos }))
  }

  const filtrarDoctor = async (filtro) => {
    validarPeticion(doctorFiltrar(token, filtro.filtro), (respuesta) => actualizarEstadoPagina({ list: respuesta.datos }))
  }

  const nuevoDoctor = () => {
    setEsEdicion(true)
    actualizarEstadoPagina({ selected: {}, deleted: {} })
  }

  const editarDoctor = (edicion, doctor) => {
    setEsEdicion(edicion)
    actualizarEstadoPagina({ selected: doctor, deleted: {} })
  }

  const modalDoctorEliminar = (mostrar, doctor) => {
    setShowModal(mostrar)
    actualizarEstadoPagina({ selected: {}, deleted: doctor });
  };

  const eliminarDoctor = async (doctor) => {
    await validarPeticion(doctorEliminar(token, doctor.id), () => modalDoctorEliminar(false, {}), true)
    handleSubmit(onSubmit)()
  }

  const onSubmit = (filtro) => {
    if (!filtro.filtro) {
      listarDoctor()
    } else {
      filtrarDoctor(filtro)
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
                  nuevo={() => nuevoDoctor()}
                />
              </Card>
            </div>
            <div className='row justify-content-center'>
              <Card title="Resultado" className='col-md-9 col-sm-12 with-shadow'>
                <Table
                  rowKey='id'
                  dataSource={list}
                  columns={[{
                    key: 'funcionario',
                    dataIndex: 'funcionario',
                    title: 'Funcionario',
                    render: (funcionario) => {
                      return <strong>{funcionario?.nombres + " " + funcionario?.apellidos }</strong>
                    }
                  }, {
                    key: 'registro_profesional',
                    dataIndex: 'registro_profesional',
                    title: 'Registro profesional',
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
                onClickCancelar={() => modalDoctorEliminar(false, {})}
                footer={
                  <BotoneraModalFooterActions
                    onClickCancelar={() => modalDoctorEliminar(false, {})}
                    onClickAceptar={() => eliminarDoctor(deleted)}
                    esEliminar
                  />
                }
              >
                <p>
                  ¿Desea eliminar al doctor?
                </p>
              </Modal>
            </div>
          </div>
          :
          <DoctorEditar onClickCancelar={() => {
            editarDoctor(false, {})
            reset()
          }} />
      }
    </div >
  )
}

export default withPageActions(Doctores)(pageData)
