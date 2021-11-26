import React from 'react'
import './css/odonto-diente.css'

const Diente = () => {
  const i = 1
  return (
    <div className="diente">
      {/* <span style={{ marginLeft: '45px', marginBottom: '5px', display: 'inline-block !important', borderRadius: '10px !important' }} className="label label-info">{i}</span> */}
      <div className="cuadro" />
      <div className="cuadro izquierdo" />
      <div className="cuadro debajo" />
      <div className="cuadro derecha" />
      <div className="centro" />
    </div>
  )
}

export default Diente
