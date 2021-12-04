import React, { useState } from 'react'
import { Card, Table } from 'antd';
import withPageActions from '../HOC/withPageActions';
import FacturaBuscador from './componentes/FacturaBuscador';
import FacturaEditar from './componentes/FacturaEditar';
import ButtonsTooltips from '../components/ButtonsTooltips';

const pageData = {
  title: "Facturas",
  list: [],
  selected: {},
  deleted: {}
};

const Facturas = (props) => {
  const { actualizarEstadoPagina, pageData: { list } } = props
  const [esEdicion, setEsEdicion] = useState(false)

  const nuevaFactura = () => {
    setEsEdicion(true)
    actualizarEstadoPagina({ selected: {}, deleted: {} })
  }

  const editarFactura = (edicion, factura) => {
    setEsEdicion(edicion)
    actualizarEstadoPagina({ selected: factura, deleted: {} })
  }

  const acciones = (factura) => {
    return <ButtonsTooltips
      onClick={() => editarFactura(true, factura)}
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
              <FacturaBuscador nuevo={nuevaFactura} />
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
                  key: 'total',
                  dataIndex: 'total',
                  title: 'Total',
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
        <FacturaEditar onClickCancelar={() => {
          editarFactura(false, {})
        }} />
    }
  </>
}

export default withPageActions(Facturas)(pageData)
