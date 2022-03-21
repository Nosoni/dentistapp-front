import React from 'react'
import withPageActions from '../../HOC/withPageActions'
import { Card, Tabs } from 'antd';
import { pacienteCrear, pacienteEditar } from '../../../services/pacientes';
import FichaMedica from './FichaMedica';
import Odontograma from './Odontograma';
import DatosBasicos from './DatosBasicos';
import Tratamientos from './Tratamientos';

const PacienteEditar = (props) => {
  const { validarPeticion, usuarioData: { token }, pageData: { selected } } = props
  const { TabPane } = Tabs;
  const existe = !!selected?.id
  let titulo = "Editar paciente"
  if (!existe) {
    titulo = "Crear paciente"
  }

  const onSubmit = async (paciente) => {
    if (existe)
      validarPeticion(pacienteEditar(token, paciente), () => { }, true)
    else
      validarPeticion(pacienteCrear(token, paciente), () => { }, true)
  }

  return (
    <div className='row justify-content-center'>
      <Card title={titulo} className='with-shadow col-md-12'>
        <Tabs defaultActiveKey={1}>
          <TabPane tab="Datos básicos" key={1}>
            <DatosBasicos onSubmit={onSubmit} {...props} />
          </TabPane>
          {
            existe &&
            <>
              <TabPane tab="Ficha médica" key={2}>
                <FichaMedica onSubmit={onSubmit} {...props} />
              </TabPane>
              <TabPane tab="Odontograma" key={3}>
                <Odontograma onSubmit={onSubmit} {...props} />
              </TabPane>
              <TabPane tab="Tratamientos" key={4}>
                <Tratamientos onSubmit={onSubmit} {...props} />
              </TabPane>
            </>
          }
        </Tabs>
      </Card>
    </div>
  )
}

export default withPageActions(PacienteEditar)(null)
