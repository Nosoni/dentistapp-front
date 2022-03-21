import axios from "axios";
import { server } from "../constantes/index";
const servicio = 'reportes'

const reporte = async (token, filtro, tipo) => {
  try {
    const url = `${server}/${servicio}/${tipo}/filtrar`;
    const config = {
      method: "POST",
      url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: JSON.stringify(filtro),
      responseType: "blob"
    }
    return await axios(config)
  } catch (error) { }
}
export {
  reporte
}