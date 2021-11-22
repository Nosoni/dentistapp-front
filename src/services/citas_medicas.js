import { peticion } from ".";
import { server } from "../constantes/index";
const servicio = "citas_medicas";

const citaMedicaCrear = async (token, cita_medica) => {
  try {
    const url = `${server}/${servicio}/crear`;
    const config = {
      method: "POST",
      url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: JSON.stringify(cita_medica)
    }
    return peticion(config)
  } catch (error) { }
}

const citaMedicaEditar = async (token, cita_medica) => {
  try {
    const url = `${server}/${servicio}/editar`;
    const config = {
      method: "PUT",
      url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: JSON.stringify(cita_medica)
    }
    return await peticion(config)
  } catch (error) { }
}

const citaMedicaEliminar = async (token, id) => {
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

const citaMedicaFiltrar = async (token, filtro) => {
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

const citaMedicaListar = async (token) => {
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
  citaMedicaCrear, citaMedicaEditar,
  citaMedicaEliminar, citaMedicaFiltrar, citaMedicaListar
}