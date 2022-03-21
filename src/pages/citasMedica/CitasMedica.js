import React from 'react'
import { Card } from 'antd'
import withPageActions from '../HOC/withPageActions';
import CitaMedicaBuscador from './componentes/CitaMedicaBuscador';
import CitasMedicaView from './componentes/CitasMedicaView';

const pageData = {
  title: "Citas médicas",
  list: [],
  selected: {},
  deleted: {}
};

const CitasMedica = () => {
  return <Card className='col-md-12 col-sm-12 with-shadow'>
    <div className='row'>
      <div className='col-3'>
        <CitaMedicaBuscador />
      </div>
      <div className='col-9'>
        <CitasMedicaView />
      </div>
    </div>
  </Card>
}

export default withPageActions(CitasMedica)(pageData)
