import React, { useState } from 'react'
import { Tag } from 'antd'
import './css/odonto-diente.css'

const DienteLeche = (props) => {
  const { valores_iniciales, actualizarDetalle, estado_nuevo = { estado_detalle_id: 11, estado_actual: 'Fracturas' } } = props
  const detalle = valores_iniciales.detalle
  const mayor = valores_iniciales.caras === 5
  let init = [
    { cara: 1, ...detalle?.find(row => row.cara === 1) },
    { cara: 2, ...detalle?.find(row => row.cara === 2) },
    { cara: 3, ...detalle?.find(row => row.cara === 3) },
    { cara: 4, ...detalle?.find(row => row.cara === 4) },
  ]
  if (mayor) {
    init = [...init, { cara: 5, ...detalle?.find(row => row.cara === 5) }]
  }

  const [caras, setCaras] = useState(init)

  const actualizarEstadoCara = (index, estado) => {
    let cambio = caras[index]
    cambio.estado_detalle_id = estado.estado_detalle_id
    cambio.estado_detalle = { estado_actual: estado.estado_actual }
    setCaras([...caras.slice(0, index), cambio, ...caras.slice(index + 1)]);
    actualizarDetalle(valores_iniciales.index, caras)
  }

  return (
    <div className="diente-leche" style={props.style}>
      <Tag className='bg-color-info sm' style={{ marginLeft: '38px' }}>{valores_iniciales?.codigo}</Tag>
      <div className={`cuadro-leche top-leche ${caras[0].estado_detalle?.estado_actual}`} onClick={() => actualizarEstadoCara(0, estado_nuevo)} />
      <div className={`cuadro-leche izquierdo-leche ${caras[1].estado_detalle?.estado_actual}`} onClick={() => actualizarEstadoCara(1, estado_nuevo)} />
      <div className={`cuadro-leche debajo-leche ${caras[2]?.estado_detalle.estado_actual}`} onClick={() => actualizarEstadoCara(2, estado_nuevo)} />
      <div className={`cuadro-leche derecha-leche ${caras[3]?.estado_detalle.estado_actual}`} onClick={() => actualizarEstadoCara(3, estado_nuevo)} />
      <div className={`centro-leche ${caras[4]?.estado_detalle.estado_actual}`} onClick={() => mayor ? actualizarEstadoCara(4, estado_nuevo) : alert("No puede cambiar de estado.")} />
    </div>
  )
}

export default DienteLeche
