import { peticion } from ".";
import { server } from "../constantes/index";
const servicio = "pacientes_dientes_historial";

const getHistorialInicial = async (token, paciente_id) => {
  try {
    const url = `${server}/${servicio}/getHistorialInicial/${paciente_id}`;
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

const getHistorialFacturar = async (token, paciente_id) => {
  try {
    const url = `${server}/${servicio}/getHistorialFacturar/${paciente_id}`;
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

export { getHistorialInicial, getHistorialFacturar }