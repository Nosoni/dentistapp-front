import React from 'react'
import { Tag } from 'antd'
import './css/odonto-diente.css'

const DienteLeche = (props) => {
  const { codigo } = props
  return (
    <div className="diente-leche" style={props.style}>
      <Tag className='bg-color-info sm' style={{ marginLeft: '38px' }}>{codigo}</Tag>
      <div className="cuadro-leche top-leche" />
      <div className="cuadro-leche izquierdo-leche" />
      <div className="cuadro-leche debajo-leche" />
      <div className="cuadro-leche derecha-leche" />
      <div className="centro-leche" />
    </div>
  )
}

export default DienteLeche
