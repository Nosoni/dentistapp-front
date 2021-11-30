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
        <DienteLeche valores_iniciales={obtenerValores(55)}
          actualizarDetalle={actualizarDetalle}
          style={{ left: "-25%" }} />
        <DienteLeche valores_iniciales={obtenerValores(54)}
          actualizarDetalle={actualizarDetalle}
          style={{ left: "-25%" }} />
        <DienteLeche valores_iniciales={obtenerValores(53)}
          actualizarDetalle={actualizarDetalle}
          style={{ left: "-25%" }} />
        <DienteLeche valores_iniciales={obtenerValores(52)}
          actualizarDetalle={actualizarDetalle}
          style={{ left: "-25%" }} />
        <DienteLeche valores_iniciales={obtenerValores(51)}
          actualizarDetalle={actualizarDetalle}
          style={{ left: "-25%" }} />
      </div>
      <div id="tll" className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <DienteLeche valores_iniciales={obtenerValores(61)}
          actualizarDetalle={actualizarDetalle} />
        <DienteLeche valores_iniciales={obtenerValores(62)}
          actualizarDetalle={actualizarDetalle} />
        <DienteLeche valores_iniciales={obtenerValores(63)}
          actualizarDetalle={actualizarDetalle} />
        <DienteLeche valores_iniciales={obtenerValores(64)}
          actualizarDetalle={actualizarDetalle} />
        <DienteLeche valores_iniciales={obtenerValores(65)}
          actualizarDetalle={actualizarDetalle} />
      </div>
    </div>
    <div className='row'>
      <div id="blr" className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right">
        <DienteLeche valores_iniciales={obtenerValores(85)}
          actualizarDetalle={actualizarDetalle}
          style={{ left: "-25%", marginTop: '25px' }} />
        <DienteLeche valores_iniciales={obtenerValores(84)}
          actualizarDetalle={actualizarDetalle}
          style={{ left: "-25%", marginTop: '25px' }} />
        <DienteLeche valores_iniciales={obtenerValores(83)}
          actualizarDetalle={actualizarDetalle}
          style={{ left: "-25%", marginTop: '25px' }} />
        <DienteLeche valores_iniciales={obtenerValores(82)}
          actualizarDetalle={actualizarDetalle}
          style={{ left: "-25%", marginTop: '25px' }} />
        <DienteLeche valores_iniciales={obtenerValores(81)}
          actualizarDetalle={actualizarDetalle}
          style={{ left: "-25%", marginTop: '25px' }} />
      </div>
      <div id="bll" className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <DienteLeche valores_iniciales={obtenerValores(71)}
          actualizarDetalle={actualizarDetalle}
          style={{ marginTop: '25px' }} />
        <DienteLeche valores_iniciales={obtenerValores(72)}
          actualizarDetalle={actualizarDetalle}
          style={{ marginTop: '25px' }} />
        <DienteLeche valores_iniciales={obtenerValores(73)}
          actualizarDetalle={actualizarDetalle}
          style={{ marginTop: '25px' }} />
        <DienteLeche valores_iniciales={obtenerValores(74)}
          actualizarDetalle={actualizarDetalle}
          style={{ marginTop: '25px' }} />
        <DienteLeche valores_iniciales={obtenerValores(75)}
          actualizarDetalle={actualizarDetalle}
          style={{ marginTop: '25px' }} />
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
