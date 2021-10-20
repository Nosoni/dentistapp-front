import { peticion } from ".";
import { server } from "../constantes/index";
const servicio = "fichas_medicas";

const fichaMedicaCrear = async (token, ficha_medica) => {
  try {
    const url = `${server}/${servicio}/crear`;
    const config = {
      method: "POST",
      url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: JSON.stringify(ficha_medica)
    }
    return peticion(config)
  } catch (error) { }
}

const fichaMedicaEditar = async (token, ficha_medica) => {
  try {
    const url = `${server}/${servicio}/editar`;
    const config = {
      method: "PUT",
      url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: JSON.stringify(ficha_medica)
    }
    return await peticion(config)
  } catch (error) { }
}

export { fichaMedicaCrear, fichaMedicaEditar }