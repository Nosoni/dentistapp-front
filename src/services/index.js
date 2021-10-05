const axios = require("axios")

const peticion = async (configuracion) => {
  try {
    const respuesta = await axios(configuracion)
    return {
      error: false,
      mensaje: respuesta.data.mensaje,
      datos: respuesta.data.datos,
    }
  } catch (error) {
    if (error.response) {
      return {
        error: true,
        mensaje: error.response.data.mensaje,
        autenticado: error.response.data.authenticated
      }
    } else {
      return {
        error: true,
        mensaje: "No es posible conectar con el servidor.",
        autenticado: false
      }
    }
  }
}
export { peticion }
