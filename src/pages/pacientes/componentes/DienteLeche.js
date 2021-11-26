import { Tag } from 'antd'
import React from 'react'
import './css/odonto-diente.css'

const DienteLeche = (props) => {
  const i = 1
  return (
    <div className="diente-leche" style={props.style}>
      {/* <span style={{ marginLeft: '45px', marginBottom: '5px', display: 'inline-block !important', borderRadius: '10px !important' }} className="label label-info">{i}</span> */}
      <Tag className='bg-color-info sm' style={{marginLeft: '42px'}}>1</Tag>
      <div className="cuadro-leche top-leche" />
      <div className="cuadro-leche izquierdo-leche" />
      <div className="cuadro-leche debajo-leche" />
      <div className="cuadro-leche derecha-leche" />
      <div className="centro-leche" />
    </div>
  )
}

export default DienteLeche
