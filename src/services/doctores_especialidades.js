import { peticion } from ".";
import { server } from "../constantes/index";
const servicio = "doctores_especialidades";

const obtenerEspecialidadesDoctor = async (token, doctor_id) => {
  try {
    const url = `${server}/${servicio}/obtenerEspecialidadesDoctor/${doctor_id}`;
    const config = {
      method: "GET",
      url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    }
    return await peticion(config)
  } catch (error) { }
};

export { obtenerEspecialidadesDoctor }