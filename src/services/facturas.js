import { peticion } from ".";
import { server } from "../constantes/index";
const servicio = "facturas";

const facturaCrear = async (token, factura) => {
  try {
    const url = `${server}/${servicio}/crear`;
    const config = {
      method: "POST",
      url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: JSON.stringify(factura)
    }
    return peticion(config)
  } catch (error) { }
}

const facturaEditar = async (token, factura) => {
  try {
    const url = `${server}/${servicio}/editar`;
    const config = {
      method: "PUT",
      url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: JSON.stringify(factura)
    }
    return await peticion(config)
  } catch (error) { }
}

const facturaFiltrar = async (token, filtro) => {
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

export {
  facturaCrear, facturaEditar, facturaFiltrar
}