import { peticion } from ".";
import { server } from "../constantes/index";
const servicio = "presupuestos";

const presupuestoCrear = async (token, presupuesto) => {
  try {
    const url = `${server}/${servicio}/crear`;
    const config = {
      method: "POST",
      url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: JSON.stringify(presupuesto)
    }
    return peticion(config)
  } catch (error) { }
}

const presupuestoFiltrar = async (token, filtro) => {
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
  presupuestoCrear, presupuestoFiltrar
}