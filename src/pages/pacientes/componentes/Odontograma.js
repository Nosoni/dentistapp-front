import React, { useState, useEffect } from 'react'
import BotoneraFooterActions from '../../components/BotoneraFooterActions'
import Diente from './Diente'
import DienteLeche from './DienteLeche'
import { Select } from 'antd';
import { estadoMovimientoListarTabla } from '../../../services/estados_movimientos';

const Odontograma = ({ onSubmit, ...props }) => {
  const { onClickCancelar, validarPeticion,
    pageData: { selected }, usuarioData: { token } } = props
  const [dientes, setDientes] = useState(selected.dientes)
  const [estados, setEstados] = useState([])
  const [seleccionado, setSeleccionado] = useState({})
  const { Option } = Select;

  useEffect(() => {
    getEstados()
  }, [])

  const getEstados = async () => {
    validarPeticion(estadoMovimientoListarTabla(token, 'pacientes_dientes_detalle'),
      (respuesta) => {
        const list = respuesta.datos.map(estado_movimiento => {
          return {
            value: estado_movimiento.id,
            label: estado_movimiento.estado_actual
          }
        })
        setEstados(list)
      })
  }

  const actualizarDetalle = (index, nuevo_detalles) => {
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
    <div className='row mt-2 mb-4'>
      <div className='col-md-3 mb-2'>
        <label className='ant-form-item-label'>Selecione el estado para actualizar</label>
        <Select
          showArrow={false}
          allowClear
          placeholder='Cambiar estado'
          options={estados}
          onSelect={(value, option) => { setSeleccionado({ estado_detalle_id: option.value, estado_actual: option.label }) }}
        />
      </div>
    </div>
    <div className='row'>
      <div id="tr" className="col-6">
        <Diente valores_iniciales={obtenerValores(18)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado} />
        <Diente valores_iniciales={obtenerValores(17)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado} />
        <Diente valores_iniciales={obtenerValores(16)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado} />
        <Diente valores_iniciales={obtenerValores(15)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado} />
        <Diente valores_iniciales={obtenerValores(14)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado} />
        <Diente valores_iniciales={obtenerValores(13)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado} />
        <Diente valores_iniciales={obtenerValores(12)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado} />
        <Diente valores_iniciales={obtenerValores(11)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado} />
      </div>
      <div id="tl" className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <Diente valores_iniciales={obtenerValores(21)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado} />
        <Diente valores_iniciales={obtenerValores(22)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado} />
        <Diente valores_iniciales={obtenerValores(23)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado} />
        <Diente valores_iniciales={obtenerValores(24)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado} />
        <Diente valores_iniciales={obtenerValores(25)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado} />
        <Diente valores_iniciales={obtenerValores(26)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado} />
        <Diente valores_iniciales={obtenerValores(27)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado} />
        <Diente valores_iniciales={obtenerValores(28)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado} />
      </div>
      <div id="tlr" className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right">
        <DienteLeche valores_iniciales={obtenerValores(55)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado}
          style={{ left: "-25%" }} />
        <DienteLeche valores_iniciales={obtenerValores(54)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado}
          style={{ left: "-25%" }} />
        <DienteLeche valores_iniciales={obtenerValores(53)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado}
          style={{ left: "-25%" }} />
        <DienteLeche valores_iniciales={obtenerValores(52)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado}
          style={{ left: "-25%" }} />
        <DienteLeche valores_iniciales={obtenerValores(51)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado}
          style={{ left: "-25%" }} />
      </div>
      <div id="tll" className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <DienteLeche valores_iniciales={obtenerValores(61)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado} />
        <DienteLeche valores_iniciales={obtenerValores(62)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado} />
        <DienteLeche valores_iniciales={obtenerValores(63)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado} />
        <DienteLeche valores_iniciales={obtenerValores(64)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado} />
        <DienteLeche valores_iniciales={obtenerValores(65)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado} />
      </div>
    </div>
    <div className='row'>
      <div id="blr" className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right">
        <DienteLeche valores_iniciales={obtenerValores(85)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado}
          style={{ left: "-25%", marginTop: '25px' }} />
        <DienteLeche valores_iniciales={obtenerValores(84)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado}
          style={{ left: "-25%", marginTop: '25px' }} />
        <DienteLeche valores_iniciales={obtenerValores(83)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado}
          style={{ left: "-25%", marginTop: '25px' }} />
        <DienteLeche valores_iniciales={obtenerValores(82)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado}
          style={{ left: "-25%", marginTop: '25px' }} />
        <DienteLeche valores_iniciales={obtenerValores(81)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado}
          style={{ left: "-25%", marginTop: '25px' }} />
      </div>
      <div id="bll" className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <DienteLeche valores_iniciales={obtenerValores(71)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado}
          style={{ marginTop: '25px' }} />
        <DienteLeche valores_iniciales={obtenerValores(72)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado}
          style={{ marginTop: '25px' }} />
        <DienteLeche valores_iniciales={obtenerValores(73)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado}
          style={{ marginTop: '25px' }} />
        <DienteLeche valores_iniciales={obtenerValores(74)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado}
          style={{ marginTop: '25px' }} />
        <DienteLeche valores_iniciales={obtenerValores(75)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado}
          style={{ marginTop: '25px' }} />
      </div>
      <div id="br" className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <Diente valores_iniciales={obtenerValores(48)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado} />
        <Diente valores_iniciales={obtenerValores(47)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado} />
        <Diente valores_iniciales={obtenerValores(46)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado} />
        <Diente valores_iniciales={obtenerValores(45)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado} />
        <Diente valores_iniciales={obtenerValores(44)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado} />
        <Diente valores_iniciales={obtenerValores(43)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado} />
        <Diente valores_iniciales={obtenerValores(42)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado} />
        <Diente valores_iniciales={obtenerValores(41)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado} />
      </div>
      <div id="bl" className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <Diente valores_iniciales={obtenerValores(31)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado} />
        <Diente valores_iniciales={obtenerValores(32)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado} />
        <Diente valores_iniciales={obtenerValores(33)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado} />
        <Diente valores_iniciales={obtenerValores(34)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado} />
        <Diente valores_iniciales={obtenerValores(35)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado} />
        <Diente valores_iniciales={obtenerValores(36)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado} />
        <Diente valores_iniciales={obtenerValores(37)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado} />
        <Diente valores_iniciales={obtenerValores(38)}
          actualizarDetalle={actualizarDetalle}
          estado_nuevo={seleccionado} />
      </div>
    </div>
    <BotoneraFooterActions
      onClickCancelar={onClickCancelar}
      onClickAceptar={() => {
        onSubmit({ ...selected, dientes: dientes })
      }}
    />
  </div >
}

export default Odontograma
