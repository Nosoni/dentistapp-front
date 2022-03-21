import { peticion } from ".";
import { server } from "../constantes/index";
const servicio = "stock_actualizar";

const stockActualizarCrear = async (token, actualizar_stock) => {
  try {
    const url = `${server}/${servicio}/crear`;
    const config = {
      method: "POST",
      url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: JSON.stringify(actualizar_stock)
    }
    return peticion(config)
  } catch (error) { }
}

const stockActualizarFiltrar = async (token, filtro) => {
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

export {
  stockActualizarCrear, stockActualizarFiltrar
}