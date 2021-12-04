import React, { useState } from 'react'
import { Card, Table } from 'antd';
import withPageActions from '../HOC/withPageActions';
import PresupuestoBuscador from './componentes/PresupuestoBuscador';
import PresupuestoEditar from './componentes/PresupuestoEditar';
import ButtonsTooltips from '../components/ButtonsTooltips';

const pageData = {
  title: "Presupuestos",
  list: [],
  selected: {},
  deleted: {}
};

const Presupuestos = (props) => {
  const { actualizarEstadoPagina, pageData: { list } } = props
  const [esEdicion, setEsEdicion] = useState(false)

  const nuevoPresupuesto = () => {
    setEsEdicion(true)
    actualizarEstadoPagina({ selected: {}, deleted: {} })
  }

  const editarPresupuesto = (edicion, presupuesto) => {
    setEsEdicion(edicion)
    actualizarEstadoPagina({ selected: presupuesto, deleted: {} })
  }

  const acciones = (presupuesto) => {
    return <ButtonsTooltips
      onClick={() => editarPresupuesto(true, presupuesto)}
      shape='circle'
      className="bg-color-info"
      tooltipsTitle="Eliminar">
      <span className='icofont icofont-edit-alt' />
    </ButtonsTooltips>
  }

  return <>
    {
      !esEdicion ?
        <>
          <div className='row justify-content-center'>
            <Card title='Buscar' className='col-md-9 col-sm-12 with-shadow'>
              <PresupuestoBuscador nuevo={nuevoPresupuesto} />
            </Card>
          </div>
          <div className='row justify-content-center'>
            <Card title="Resultado" className='col-md-9 col-sm-12 with-shadow'>
              <Table
                rowKey='id'
                dataSource={list}
                columns={[{
                  key: 'paciente',
                  dataIndex: 'paciente',
                  title: 'Paciente',
                  render: (paciente) => `${paciente?.nombres}, ${paciente?.apellidos}`
                }, {
                  key: 'comprobante',
                  dataIndex: 'comprobante',
                  title: 'Comprobante',
                }, {
                  key: 'fecha',
                  dataIndex: 'fecha',
                  title: 'Fecha',
                }, {
                  key: 'actiones',
                  title: 'Acciones',
                  render: acciones,
                }]}
                pagination={{ pageSize: 5 }}
                locale={{ emptyText: 'Sin registros' }}
              />
            </Card>
          </div>
        </>
        :
        <PresupuestoEditar onClickCancelar={() => {
          editarPresupuesto(false, {})
        }} />
    }
  </>
}

export default withPageActions(Presupuestos)(pageData)
