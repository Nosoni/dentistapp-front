import { server } from "../constantes/index";
const servicio = "usuarios";
const axios = require("axios")

const usuarioCrear = async (token, usuario) => {
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
  const response = await axios(config)
  console.log(response.data)
  return response.data
}

const usuarioEditar = async (token, usuario) => {
  console.log(usuario)
  const url = `${server}/${servicio}/editar`;
  const config = {
    method: "POST",
    url,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    data: JSON.stringify(usuario)
  }
  const response = await axios(config)
  console.log(response.data)
  return response.data
}

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

export { usuarioCrear, usuarioEditar, usuarioFiltrar, usuarioListar }