import { server } from "../constantes/index";
const servicio = "usuarios";
const axios = require("axios")

const usuarioListar = async () => {
  const url = `${server}/${servicio}/listar`;
  const response = await axios.get(url)
  return response.data
};

const usuarioFiltrar = async (usuario) => {
  console.log(usuario)
  const url = `${server}/${servicio}/filtrar/${usuario}`;
  const response = await axios.get(url)
  return response.data
};

export { usuarioListar, usuarioFiltrar }