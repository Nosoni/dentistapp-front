import { peticion } from ".";
import { server } from "../constantes/index";
const servicio = "condiciones_pago";

const condicionesPagoListar = async (token) => {
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

export { condicionesPagoListar }