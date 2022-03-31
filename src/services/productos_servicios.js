import { peticion } from ".";
import { server } from "../constantes/index";
const servicio = "productos_servicios";

const productoServicioCrear = async (token, producto_servicio) => {
  try {
    const url = `${server}/${servicio}/crear`;
    const config = {
      method: "POST",
      url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: JSON.stringify(producto_servicio)
    }
    return peticion(config)
  } catch (error) { }
}

const productoServicioEditar = async (token, producto_servicio) => {
  try {
    const url = `${server}/${servicio}/editar`;
    const config = {
      method: "PUT",
      url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: JSON.stringify(producto_servicio)
    }
    return await peticion(config)
  } catch (error) { }
}

const productoServicioEliminar = async (token, id) => {
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

const productoServicioFiltrar = async (token, filtro) => {
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

const productoServicioListar = async (token) => {
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

const productoServicioGetStockBajo = async (token) => {
  try {
    const url = `${server}/${servicio}/stockBajo`;
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
  productoServicioCrear, productoServicioEditar, productoServicioEliminar,
  productoServicioFiltrar, productoServicioListar, productoServicioGetStockBajo
}