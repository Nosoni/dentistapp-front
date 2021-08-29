import { server } from "../constantes/index";
const servicio = "usuarios";
const axios = require("axios")

const usuarioListar = async (token) => {
  const url = `${server}/${servicio}/listar`;
  const config = {
    method: "GET",
    url,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  }
  const response = await axios(config)
  return response.data
};

const usuarioFiltrar = async (token, usuario) => {
  const url = `${server}/${servicio}/filtrar/${usuario}`;
  const config = {
    method: "GET",
    url,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  }
  const response = await axios(config)
  return response.data
};

export { usuarioListar, usuarioFiltrar }