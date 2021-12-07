import React, { useState } from 'react'
import { Card, Table } from 'antd';
import withPageActions from '../HOC/withPageActions';
import CobranzaBuscador from './componentes/CobranzaBuscador';
import CobranzaEditar from './componentes/CobranzaEditar';
import ButtonsTooltips from '../components/ButtonsTooltips';

const pageData = {
  title: "Cobranzas",
  list: [],
  selected: {},
  deleted: {}
};

const Cobranzas = (props) => {
  const { actualizarEstadoPagina, pageData: { list } } = props
  const [esEdicion, setEsEdicion] = useState(false)

  const nuevaCobranza = () => {
    setEsEdicion(true)
    actualizarEstadoPagina({ selected: {}, deleted: {} })
  }

  const editarCobranza = (edicion, cobranza) => {
    setEsEdicion(edicion)
    actualizarEstadoPagina({ selected: cobranza, deleted: {} })
  }

  const acciones = (cobranza) => {
    return <ButtonsTooltips
      onClick={() => editarCobranza(true, cobranza)}
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
              <CobranzaBuscador nuevo={nuevaCobranza} {...props} />
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
        <CobranzaEditar
          onClickCancelar={() => {
            editarCobranza(false, {})
          }}
          {...props} />
    }
  </>
}

export default withPageActions(Cobranzas)(pageData)
