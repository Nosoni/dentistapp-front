import { peticion } from ".";
import { server } from "../constantes/index";
const servicio = "impuestos";

const impuestoListar = async (token) => {
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
};

export { impuestoListar }