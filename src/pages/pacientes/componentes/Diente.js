import React from 'react'
import { Tag } from 'antd'
import './css/odonto-diente.css'

const Diente = (props) => {
  const { codigo, detalle } = props

  console.log("detalle", detalle)
  return (
    <div className="diente">
      {/* <span style={{ marginLeft: '45px', marginBottom: '5px', display: 'inline-block !important', borderRadius: '10px !important' }} className="label label-info">{i}</span> */}
      <Tag className='bg-color-info sm' style={{ marginLeft: '42px' }}>{codigo}</Tag>
      <div className={`cuadro ${detalle?.find(row => row.cara === 1)?.estado_detalle.estado_actual}`} />
      <div className="cuadro izquierdo" />
      <div className="cuadro debajo" />
      <div className="cuadro derecha" />
      <div className="centro" />
    </div>
  )
}

export default Diente
