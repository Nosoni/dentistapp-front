import { peticion } from ".";
import { server } from "../constantes/index";
const servicio = "tratamientos_servicios";

const tratamientoServicioCrear = async (token, tratamiento_servicio) => {
  try {
    const url = `${server}/${servicio}/crear`;
    const config = {
      method: "POST",
      url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: JSON.stringify(tratamiento_servicio)
    }
    return peticion(config)
  } catch (error) { }
}

const tratamientoServicioEditar = async (token, tratamiento_servicio) => {
  try {
    const url = `${server}/${servicio}/editar`;
    const config = {
      method: "PUT",
      url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: JSON.stringify(tratamiento_servicio)
    }
    return await peticion(config)
  } catch (error) { }
}

const tratamientoServicioEliminar = async (token, id) => {
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

const tratamientoServicioFiltrar = async (token, filtro) => {
  try {
    const url = `${server}/${servicio}/filtrar/${filtro}`;
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

const tratamientoServicioListar = async (token) => {
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
  tratamientoServicioCrear, tratamientoServicioEditar,
  tratamientoServicioEliminar, tratamientoServicioFiltrar, tratamientoServicioListar
}