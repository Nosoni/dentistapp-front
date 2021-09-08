import { peticion } from ".";
import { server } from "../constantes/index";
const servicio = "funcionarios";

const funcionarioFiltrar = async (token, funcionario) => {
  try {
    const url = `${server}/${servicio}/filtrar/${funcionario}`;
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

const funcionarioListar = async (token) => {
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

export { funcionarioFiltrar, funcionarioListar }