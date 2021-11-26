import React from 'react'
import Diente from './Diente'
import DienteLeche from './DienteLeche'

const Odontograma = () => {
  return <div>
    <div className='row'>
      <div id="tr" className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div>tr</div>
        <Diente />
        <Diente />
      </div>
      <div id="tl" className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div>tl</div>
        <Diente />
        <Diente />
      </div>
      <div id="tlr" className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right">
        <div>tlr</div>
        <DienteLeche style={{ left: "-25%" }} />
        <DienteLeche style={{ left: "-25%" }} />
      </div>
      <div id="tll" className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div>tll</div>
        <DienteLeche />
        <DienteLeche />
      </div>
    </div>
    <div className='row'>
      <div id="blr" className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right">
        <div>
          blr
        </div>
        <DienteLeche style={{ left: "-25%" }} />
        <DienteLeche style={{ left: "-25%" }} />
      </div>
      <div id="bll" className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div>bll</div>
        <DienteLeche />
        <DienteLeche />
      </div>
      <div id="br" className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div>br</div>
        <Diente />
      </div>
      <div id="bl" className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div>bl</div>
        <Diente />
      </div>
    </div>
  </div>
}

export default Odontograma
