import { FormatPainterOutlined, FrownOutlined, MonitorOutlined, SmileOutlined, ToolOutlined } from '@ant-design/icons'
import api from '../configuraciones/index'
export const server = api.server

export const permisos = {
  VER_MENU_USUARIO: "menu_ver_usuario",
  VER_MENU_FUNCIONARIO: "menu_ver_funcionario",
  VER_MENU_ROL: "menu_ver_rol",
  VER_MENU_PACIENTE: "menu_ver_paciente",
  VER_MENU_DOCTOR: "menu_ver_doctor",
  VER_MENU_ESPECIALIDAD: "menu_ver_especialidad",
  VER_MENU_TRATAMIENTO_SERVICIO: "menu_ver_tratamiento_servicio",
  VER_MENU_INSUMO: "menu_ver_insumo",
  VER_MENU_CITA_MEDICA: "menu_ver_cita_medica",
  VER_MENU_FACTURACION: "menu_ver_facturacion",
  VER_MENU_PRESUPUESTO: "menu_ver_presupuesto"
}

export const historialIcons = [{
  id: 1,
  icons:
    <div className='timeline-head bg-color-blue'>
      <FormatPainterOutlined className='text-contrast-500' />
    </div>
}, {
  id: 2,
  icons:
    <div className='timeline-head bg-color-orange'>
      <ToolOutlined className='text-contrast-500' />
    </div>
}, {
  id: 3,
  icons:
    <div className='timeline-head bg-color-yellow'>
      <SmileOutlined className='text-contrast-500' />
    </div>
}, {
  id: 4,
  icons:
    <div className='timeline-head bg-color-red'>
      <FrownOutlined className='text-contrast-500' />
    </div>
}, {
  id: 5,
  icons:
    <div className='timeline-head bg-color-teal'>
      <MonitorOutlined className='text-contrast-500' />
    </div>
},]
