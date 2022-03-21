import { peticion } from ".";
import { server } from "../constantes/index";
const servicio = "doctores";

const doctorCrear = async (token, doctor) => {
  try {
    const url = `${server}/${servicio}/crear`;
    const config = {
      method: "POST",
      url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: JSON.stringify(doctor)
    }
    return peticion(config)
  } catch (error) { }
}

const doctorEditar = async (token, doctor) => {
  try {
    const url = `${server}/${servicio}/editar`;
    const config = {
      method: "PUT",
      url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: JSON.stringify(doctor)
    }
    return await peticion(config)
  } catch (error) { }
}

const doctorEliminar = async (token, id) => {
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

const doctorFiltrar = async (token, filtro) => {
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

const doctorListar = async (token) => {
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
  doctorCrear, doctorEditar, doctorEliminar,
  doctorFiltrar, doctorListar
}