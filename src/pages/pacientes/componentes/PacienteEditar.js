import React from 'react'
import withPageActions from '../../HOC/withPageActions'
import { Card, Tabs } from 'antd';
import { pacienteCrear, pacienteEditar } from '../../../services/pacientes';
import FichaMedica from './FichaMedica';
import Odontograma from './Odontograma';
import DatosBasicos from './DatosBasicos';

const PacienteEditar = (props) => {
  const { validarPeticion, usuarioData: { token }, pageData: { selected } } = props
  const { TabPane } = Tabs;
  const existe = !!selected?.id
  let titulo = "Editar paciente"
  if (!existe) {
    titulo = "Crear paciente"
  }

  //validar que actualice ficha
  const onSubmit = async (paciente) => {
    console.log(paciente)
    return
    // if (existe)
    //   validarPeticion(pacienteEditar(token, paciente), () => { }, true)
    // else
    //   validarPeticion(pacienteCrear(token, paciente), () => { }, true)
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
              <TabPane tab="Historial" key={4}>
                <>
                  Historial
                </>
              </TabPane>
            </>
          }
        </Tabs>
      </Card>
    </div>
  )
}

export default withPageActions(PacienteEditar)(null)
