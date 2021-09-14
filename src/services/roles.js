import { peticion } from ".";
import { server } from "../constantes/index";
const servicio = "roles";

const rolCrear = async (token, rol) => {
  try {
    const url = `${server}/${servicio}/crear`;
    const config = {
      method: "POST",
      url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: JSON.stringify(rol)
    }
    return peticion(config)
  } catch (error) { }
}

const rolEditar = async (token, rol) => {
  try {
    const url = `${server}/${servicio}/editar`;
    const config = {
      method: "POST",
      url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: JSON.stringify(rol)
    }
    return await peticion(config)
  } catch (error) { }
}

const rolEliminar = async (token, id) => {
  try {
    const url = `${server}/${servicio}/eliminar/${id}`;
    const config = {
      method: "POST",
      url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    }
    return await peticion(config)
  } catch (error) { }
}

const rolFiltrar = async (token, rol) => {
  try {
    const url = `${server}/${servicio}/filtrar/${rol}`;
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

const rolListar = async (token) => {
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
  rolCrear, rolEditar, rolEliminar,
  rolFiltrar, rolListar
}