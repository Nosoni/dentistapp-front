import { peticion } from ".";
import { server } from "../constantes/index";

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
  return await peticion(config)
};

export { autenticar }