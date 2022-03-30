import { peticion } from ".";
import { server } from "../constantes/index";
const servicio = "clientes";

const clienteCrear = async (token, cliente) => {
  try {
    const url = `${server}/${servicio}/crear`;
    const config = {
      method: "POST",
      url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: JSON.stringify(cliente)
    }
    return peticion(config)
  } catch (error) { }
}

const clienteEditar = async (token, cliente) => {
  try {
    const url = `${server}/${servicio}/editar`;
    const config = {
      method: "PUT",
      url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: JSON.stringify(cliente)
    }
    return await peticion(config)
  } catch (error) { }
}

const clienteEliminar = async (token, id) => {
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

const clienteFiltrar = async (token, filtro) => {
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

const clienteListar = async (token) => {
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
  clienteCrear, clienteEditar, clienteEliminar,
  clienteFiltrar, clienteListar 
}