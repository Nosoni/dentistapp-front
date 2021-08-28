import { server } from "../constantes/index";
const axios = require("axios")

const autenticar = async (usuarioAutenticar) => {
  const url = `${server}/login`;
  const config = {
    method: "POST",
    url,
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(usuarioAutenticar)
  }
  const response = await axios(config)
  return response.data
};

export { autenticar }