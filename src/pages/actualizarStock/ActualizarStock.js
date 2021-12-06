import React, { useState } from 'react'
import { Card, Table } from 'antd';
import withPageActions from '../HOC/withPageActions';
import ActualizarStockBuscador from './componentes/ActualizarStockBuscador';
import ActualizarStockEditar from './componentes/ActualizarStockEditar';
import ButtonsTooltips from '../components/ButtonsTooltips';

const pageData = {
  title: "Actualizar stock",
  list: [],
  selected: {},
  deleted: {}
};

const ActualziarStock = (props) => {
  const { actualizarEstadoPagina, pageData: { list } } = props
  const [esEdicion, setEsEdicion] = useState(false)

  const nuevoActualizarStock = () => {
    setEsEdicion(true)
    actualizarEstadoPagina({ selected: {}, deleted: {} })
  }

  const editarActualizarStock = (edicion, actualizar_stock) => {
    setEsEdicion(edicion)
    actualizarEstadoPagina({ selected: actualizar_stock, deleted: {} })
  }

  const acciones = (actualizar_stock) => {
    return <ButtonsTooltips
      onClick={() => editarActualizarStock(true, actualizar_stock)}
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
              <ActualizarStockBuscador nuevo={nuevoActualizarStock} {...props} />
            </Card>
          </div>
          <div className='row justify-content-center'>
            <Card title="Resultado" className='col-md-9 col-sm-12 with-shadow'>
              <Table
                rowKey='id'
                dataSource={list}
                columns={[{
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
        <ActualizarStockEditar
          onClickCancelar={() => {
            editarActualizarStock(false, {})
          }}
          {...props} />
    }
  </>
}

export default withPageActions(ActualziarStock)(pageData)
