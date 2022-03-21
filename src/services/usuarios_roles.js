import { peticion } from ".";
import { server } from "../constantes/index";
const servicio = "usuarios_roles";

const obtenerRolesDelUsuario = async (token, usuario_id) => {
  try {
    const url = `${server}/${servicio}/obtenerRolesDelUsuario/${usuario_id}`;
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

export { obtenerRolesDelUsuario }