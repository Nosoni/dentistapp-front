import { peticion } from ".";
import { server } from "../constantes/index";
const servicio = "estados_movimientos";

const estadoMovimientoFiltrar = async (token, filtro) => {
  try {
    const url = `${server}/${servicio}/filtrar`;
    const config = {
      method: "POST",
      url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: JSON.stringify(filtro)
    }
    return await peticion(config)
  } catch (error) { }
};

const estadoMovimientoListarTabla = async (token, tabla_id) => {
  try {
    const url = `${server}/${servicio}/listarTabla/${tabla_id}`;
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

export { estadoMovimientoFiltrar, estadoMovimientoListarTabla }