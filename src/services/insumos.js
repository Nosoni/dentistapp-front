import { peticion } from ".";
import { server } from "../constantes/index";
const servicio = "insumos";

const insumoCrear = async (token, insumo) => {
  try {
    const url = `${server}/${servicio}/crear`;
    const config = {
      method: "POST",
      url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: JSON.stringify(insumo)
    }
    return peticion(config)
  } catch (error) { }
}

const insumoEditar = async (token, insumo) => {
  try {
    const url = `${server}/${servicio}/editar`;
    const config = {
      method: "PUT",
      url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: JSON.stringify(insumo)
    }
    return await peticion(config)
  } catch (error) { }
}

const insumoEliminar = async (token, id) => {
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

const insumoFiltrar = async (token, filtro) => {
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

const insumoListar = async (token) => {
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
  insumoCrear, insumoEditar,
  insumoEliminar, insumoFiltrar, insumoListar
}