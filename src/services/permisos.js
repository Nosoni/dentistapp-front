import { peticion } from ".";
import { server } from "../constantes/index";
const servicio = "permisos";

const permisoFiltrar = async (token, permiso) => {
  try {
    const url = `${server}/${servicio}/filtrar/${permiso}`;
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

const permisoListar = async (token) => {
  try {
    const url = `${server}/${servicio}/listar`;
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

export {
  permisoListar
}