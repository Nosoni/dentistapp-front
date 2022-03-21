import { peticion } from ".";
import { server } from "../constantes/index";
const servicio = "usuarios";

const usuarioCrear = async (token, usuario) => {
  try {
    const url = `${server}/${servicio}/crear`;
    const config = {
      method: "POST",
      url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: JSON.stringify(usuario)
    }
    return peticion(config)
  } catch (error) { }
}

const usuarioEditar = async (token, usuario) => {
  try {
    const url = `${server}/${servicio}/editar`;
    const config = {
      method: "PUT",
      url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: JSON.stringify(usuario)
    }
    return await peticion(config)
  } catch (error) { }
}

const usuarioEliminar = async (token, id) => {
  try {
    const url = `${server}/${servicio}/eliminar/${id}`;
    const config = {
      method: "PUT",
      url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    }
    return await peticion(config)
  } catch (error) { }
}

const usuarioFiltrar = async (token, usuario) => {
  try {
    const url = `${server}/${servicio}/filtrar/${usuario}`;
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

const usuarioListar = async (token) => {
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
  usuarioCrear, usuarioEditar, usuarioEliminar,
  usuarioFiltrar, usuarioListar
}