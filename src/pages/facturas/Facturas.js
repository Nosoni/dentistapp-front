import React, { useState } from 'react'
import { Card, Table } from 'antd';
import withPageActions from '../HOC/withPageActions';
import FacturaBuscador from './componentes/FacturaBuscador';
import FacturaEditar from './componentes/FacturaEditar';

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
                  key: 'documento',
                  dataIndex: 'documento',
                  title: 'Documento',
                  render: (documento) => <strong>{documento}</strong>
                }, {
                  key: 'nombres',
                  dataIndex: 'nombres',
                  title: 'Nombres',
                }, {
                  key: 'apellidos',
                  dataIndex: 'apellidos',
                  title: 'Apellidos',
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
