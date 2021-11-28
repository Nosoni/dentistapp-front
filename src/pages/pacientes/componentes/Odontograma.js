import React from 'react'
import Diente from './Diente'
import DienteLeche from './DienteLeche'

const Odontograma = ({ paciente_dientes }) => {
  return <div>
    <div className='row'>
      <div id="tr" className="col-6">
        <Diente codigo={18} />
        <Diente codigo={17} />
        <Diente codigo={16} />
        <Diente codigo={15} />
        <Diente codigo={14} />
        <Diente codigo={13} />
        <Diente codigo={12} />
        <Diente codigo={11} />
      </div>
      <div id="tl" className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <Diente codigo={21} />
        <Diente codigo={22} />
        <Diente codigo={23} />
        <Diente codigo={24} />
        <Diente codigo={25} />
        <Diente codigo={26} />
        <Diente codigo={27} />
        <Diente codigo={28} />
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
        <Diente codigo={48} />
        <Diente codigo={47} />
        <Diente codigo={46} />
        <Diente codigo={45} />
        <Diente codigo={44} />
        <Diente codigo={43} />
        <Diente codigo={42} />
        <Diente codigo={41} />
      </div>
      <div id="bl" className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <Diente codigo={31} />
        <Diente codigo={32} />
        <Diente codigo={33} />
        <Diente codigo={34} />
        <Diente codigo={35} />
        <Diente codigo={36} />
        <Diente codigo={37} />
        <Diente codigo={38} />
      </div>
    </div>
  </div>
}

export default Odontograma
