import { peticion } from ".";
import { server } from "../constantes/index";
const servicio = "roles_permisos";

const rolesPermisosFiltrar = async (token, rol_id) => {
  try {
    const url = `${server}/${servicio}/filtrar/${rol_id}`;
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

const permisosRolesFiltrar = async (token, rol_id) => {
  try {
    const url = `${server}/${servicio}/obtenerPermisosRol/${rol_id}`;
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

export { rolesPermisosFiltrar, permisosRolesFiltrar }