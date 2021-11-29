import React, { useState } from 'react'
import BotoneraFooterActions from '../../components/BotoneraFooterActions'
import Diente from './Diente'
import DienteLeche from './DienteLeche'

const Odontograma = ({ onSubmit, ...props }) => {
  const { onClickCancelar, pageData: { selected } } = props
  const [dientes, setDientes] = useState(selected.dientes)

  console.log("dientes", dientes)

  const actualizarDetalle = (index, nuevo_detalles) => {
    console.log("actualizarDetalle", nuevo_detalles)
    console.log(index)
    let cambio = dientes[index]
    cambio.pacientes_dientes_detalles = nuevo_detalles
    setDientes([...dientes.slice(0, index), cambio, ...dientes.slice(index + 1)])
  }

  const obtenerValores = (codigo) => {
    let index = dientes.findIndex(diente => diente.diente.codigo === codigo)
    let detalle = dientes[index].pacientes_dientes_detalles
    let caras = dientes[index].diente.cantidad_caras
    return { index, codigo, detalle, caras }
  }

  return <div>
    <div className='row'>
      <div id="tr" className="col-6">
        <Diente valores_iniciales={obtenerValores(18)}
          actualizarDetalle={actualizarDetalle} />
        <Diente valores_iniciales={obtenerValores(17)}
          actualizarDetalle={actualizarDetalle} />
        <Diente valores_iniciales={obtenerValores(16)}
          actualizarDetalle={actualizarDetalle} />
        <Diente valores_iniciales={obtenerValores(15)}
          actualizarDetalle={actualizarDetalle} />
        <Diente valores_iniciales={obtenerValores(14)}
          actualizarDetalle={actualizarDetalle} />
        <Diente valores_iniciales={obtenerValores(13)}
          actualizarDetalle={actualizarDetalle} />
        <Diente valores_iniciales={obtenerValores(12)}
          actualizarDetalle={actualizarDetalle} />
        <Diente valores_iniciales={obtenerValores(11)}
          actualizarDetalle={actualizarDetalle} />
      </div>
      <div id="tl" className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <Diente valores_iniciales={obtenerValores(21)}
          actualizarDetalle={actualizarDetalle} />
        <Diente valores_iniciales={obtenerValores(22)}
          actualizarDetalle={actualizarDetalle} />
        <Diente valores_iniciales={obtenerValores(23)}
          actualizarDetalle={actualizarDetalle} />
        <Diente valores_iniciales={obtenerValores(24)}
          actualizarDetalle={actualizarDetalle} />
        <Diente valores_iniciales={obtenerValores(25)}
          actualizarDetalle={actualizarDetalle} />
        <Diente valores_iniciales={obtenerValores(26)}
          actualizarDetalle={actualizarDetalle} />
        <Diente valores_iniciales={obtenerValores(27)}
          actualizarDetalle={actualizarDetalle} />
        <Diente valores_iniciales={obtenerValores(28)}
          actualizarDetalle={actualizarDetalle} />
      </div>
      <div id="tlr" className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right">
        <DienteLeche codigo={55} style={{ left: "-25%" }} />
        <DienteLeche codigo={54} style={{ left: "-25%" }} />
        <DienteLeche codigo={53} style={{ left: "-25%" }} />
        <DienteLeche codigo={52} style={{ left: "-25%" }} />
        <DienteLeche codigo={51} style={{ left: "-25%" }} />
      </div>
      <div id="tll" className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <DienteLeche codigo={61} />
        <DienteLeche codigo={62} />
        <DienteLeche codigo={63} />
        <DienteLeche codigo={64} />
        <DienteLeche codigo={65} />
      </div>
    </div>
    <div className='row'>
      <div id="blr" className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right">
        <DienteLeche codigo={85} style={{ left: "-25%", marginTop: '25px' }} />
        <DienteLeche codigo={84} style={{ left: "-25%", marginTop: '25px' }} />
        <DienteLeche codigo={83} style={{ left: "-25%", marginTop: '25px' }} />
        <DienteLeche codigo={82} style={{ left: "-25%", marginTop: '25px' }} />
        <DienteLeche codigo={81} style={{ left: "-25%", marginTop: '25px' }} />
      </div>
      <div id="bll" className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <DienteLeche codigo={71} style={{ marginTop: '25px' }} />
        <DienteLeche codigo={72} style={{ marginTop: '25px' }} />
        <DienteLeche codigo={73} style={{ marginTop: '25px' }} />
        <DienteLeche codigo={74} style={{ marginTop: '25px' }} />
        <DienteLeche codigo={75} style={{ marginTop: '25px' }} />
      </div>
      <div id="br" className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <Diente valores_iniciales={obtenerValores(48)}
          actualizarDetalle={actualizarDetalle} />
        <Diente valores_iniciales={obtenerValores(47)}
          actualizarDetalle={actualizarDetalle} />
        <Diente valores_iniciales={obtenerValores(46)}
          actualizarDetalle={actualizarDetalle} />
        <Diente valores_iniciales={obtenerValores(45)}
          actualizarDetalle={actualizarDetalle} />
        <Diente valores_iniciales={obtenerValores(44)}
          actualizarDetalle={actualizarDetalle} />
        <Diente valores_iniciales={obtenerValores(43)}
          actualizarDetalle={actualizarDetalle} />
        <Diente valores_iniciales={obtenerValores(42)}
          actualizarDetalle={actualizarDetalle} />
        <Diente valores_iniciales={obtenerValores(41)}
          actualizarDetalle={actualizarDetalle} />
      </div>
      <div id="bl" className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <Diente valores_iniciales={obtenerValores(31)}
          actualizarDetalle={actualizarDetalle} />
        <Diente valores_iniciales={obtenerValores(32)}
          actualizarDetalle={actualizarDetalle} />
        <Diente valores_iniciales={obtenerValores(33)}
          actualizarDetalle={actualizarDetalle} />
        <Diente valores_iniciales={obtenerValores(34)}
          actualizarDetalle={actualizarDetalle} />
        <Diente valores_iniciales={obtenerValores(35)}
          actualizarDetalle={actualizarDetalle} />
        <Diente valores_iniciales={obtenerValores(36)}
          actualizarDetalle={actualizarDetalle} />
        <Diente valores_iniciales={obtenerValores(37)}
          actualizarDetalle={actualizarDetalle} />
        <Diente valores_iniciales={obtenerValores(38)}
          actualizarDetalle={actualizarDetalle} />
      </div>
    </div>
    <BotoneraFooterActions
      onClickCancelar={onClickCancelar}
      onClickAceptar={() => {
        console.log(dientes)
        onSubmit({ ...selected, dientes: dientes })
      }}
    />
  </div>
}

export default Odontograma
