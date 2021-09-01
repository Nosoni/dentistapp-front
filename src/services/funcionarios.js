import { server } from "../constantes/index";
const servicio = "funcionarios";
const axios = require("axios")

const funcionarioFiltrar = async (token, funcionario) => {
  const url = `${server}/${servicio}/filtrar/${funcionario}`;
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

const funcionarioListar = async (token) => {
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

export { funcionarioFiltrar, funcionarioListar }